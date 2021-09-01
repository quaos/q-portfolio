import { opn } from "./src/deps/opn.ts";

import { runServer } from "./src/server.ts";

const commands: Map<string, (opts?: any) => Promise<number>> = new Map([
    ["serve", (opts?: any) => {
      const host = opts?.host || "localhost";
      const port = opts?.port || 3000;
      return runServer({ host, port })
        .then(() =>
          (opts?.browse) ? opn(`http://${host}:${port}/`).then(() => 0) : Promise.resolve(0)
        )
        .then(() => new Promise((resolve, reject) => {}));
    }],
]);

let rc;
let command;
let cmdOpts = {
  browse: false,
};
for (let arg of Deno.args) {
  if (arg === "--browse") {
    cmdOpts.browse = true;
  } else if (!command) {
    command = commands.get(arg);
  }
}

if (!command) {
    console.error(
        "usage: deno --allow-read --allow-net --unstable main.ts -- [--browse] (build|serve)",
    );
    rc = -1;
    Deno.exit(rc);
}

try {
    rc = await command(cmdOpts);
} catch (err) {
    console.error(err);
    rc = -1;
}
Deno.exit(rc);
  