import * as abc from "./deps/abc.ts";

export interface RunServerOptions {
  host?: string;
  port?: number;
}

export async function runServer(opts?: RunServerOptions): Promise<number> {
  try {
    const sourceDir = "./public";
    const host = opts?.host || "localhost";
    const port = opts?.port || 8080;

    abc.MIME.DB[".css"] = "text/css";

    console.log(
      `Starting static web server at: http://${host}:${port}/\nSource path: ${sourceDir}`,
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
      .start({ port });
    return 0;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
