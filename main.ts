import { open } from "./src/deps/opn.ts";

import { runServer } from "./src/server.ts";

const HOST_SWITCH_PREFIX = "--host=";
const PORT_SWITCH_PREFIX = "--port=";

interface CommandOptions {
  host?: string
  port: number
  browse: boolean
}

interface Command {
  name: string;
  run(opts: CommandOptions): Promise<number>;
}

const processExitingProm = new Promise<number>(resolve => {
  const signalListener = (signal: Deno.Signal) => {
    console.log("Received signal:", signal)
    resolve(0);
  }
  (["SIGINT", "SIGTERM"] as Deno.Signal[]).forEach((signal) => {
    Deno.addSignalListener(signal, () => signalListener(signal))
  })
});

const commandsMap: Record<string, Command> = [
  {
    name: "serve",
    async run(opts: CommandOptions): Promise<number> {
      const host = opts.host || "localhost";
      const port = opts.port || 3000;

      const { process: serverProcess, server: httpServer } = await runServer({ host, port });
      
      if (opts.browse) {
        const url = `http://${host}:${port}/`;
        console.log(`Opening browser to: ${url}`);
        await open(url)
      }

      await Promise.race([serverProcess, processExitingProm]);
      if (httpServer != null && !httpServer.closed) {
        httpServer.close();
      }

      return 0;
    }
  }
].reduce((map, cmd) => ({
  ...map,
  [cmd.name]: cmd,
}), {});
const commandNames = Object.keys(commandsMap);

let rc: number;
let command: Command | undefined;
const cmdOpts: CommandOptions = {
  host: undefined,
  port: 3000,
  browse: false,
};
for (const arg of Deno.args) {
  if (arg === "--browse") {
    cmdOpts.browse = true;
  } else if (arg.startsWith(HOST_SWITCH_PREFIX)) {
    cmdOpts.host = arg.substring(HOST_SWITCH_PREFIX.length);
  } else if (arg.startsWith(PORT_SWITCH_PREFIX)) {
    cmdOpts.port = Number(arg.substring(PORT_SWITCH_PREFIX.length));
  } else if (command == null) {
    command = commandsMap[arg];
  }
}

if (!command) {
  console.error(
    `usage: deno --allow-read --allow-net --unstable main.ts [--browse] (${commandNames.join("|")})`,
  );
  rc = -1;
  Deno.exit(rc);
}

try {
  rc = await command.run(cmdOpts);
} catch (err) {
  console.error(err);
  rc = -1;
}
console.log(`Exit (${rc})`);
Deno.exit(rc);
