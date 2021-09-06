// Build script for Heroku - Deno buildpack

const buildStatus = await Deno.run({
  cmd: [
    Deno.execPath(),
    "bundle",
    "--config tsconfig.json",
    "src/client.tsx",
    "public/assets/js/client.bundle.js",
  ],
  stdout: "inherit",
  stderr: "inherit",
}).status();

console.log(`Build Exit Code: ${buildStatus.code}`);
