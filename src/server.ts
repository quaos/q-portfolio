import * as abc from "./deps/abc.ts";
import { HttpServer } from "./deps/std.ts";

export interface RunServerOptions {
  host?: string;
  port?: number;
}

export interface RunServerResult {
  process: Promise<void>
  server?: HttpServer
}

export async function runServer(opts?: RunServerOptions): Promise<RunServerResult> {
  try {
    const sourceDir = "./public";
    const hostname = opts?.host || "localhost";
    const port = opts?.port || 8080;

    abc.MIME.DB[".css"] = "text/css";

    console.log(
      `Starting static web server at: http://${hostname}:${port}/\nSource path: ${sourceDir}`,
    );
    const abcApp = new abc.Application();
    abcApp
      .use((next) =>
        async (ctx) => {
          console.log(`${ctx.request.method} ${ctx.request.url}`);
          await next(ctx);
        }
      )
      .use((next) =>
        async (ctx) => {
          ctx.response.headers.set("Service-Worker-Allowed", "/");
          await next(ctx);
        }
      )
      .static("/", sourceDir)
      // Screens use React Routing
      .file("/", `${sourceDir}/index.html`)
      .file("/news", `${sourceDir}/index.html`)
      .file("/news/:id", `${sourceDir}/index.html`)
      .file("/store", `${sourceDir}/index.html`)
      .file("/store/:id", `${sourceDir}/index.html`)
      .file("/about", `${sourceDir}/index.html`)
      .start({ hostname, port });

    // HACK: Revise this later
    return await new Promise(resolve => {
      const waitStartIntervalId = setInterval(() => {
        if (abcApp.θprocess != null) {
          console.log("Server is started.");
          clearInterval(waitStartIntervalId);
          resolve({ process: abcApp.θprocess })
        }
      }, 1000)
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
