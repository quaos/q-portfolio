import { createRoot } from "./react-dom.ts";
import { assertEquals } from "./std.ts";

Deno.test("ReactDOM deps has createRoot function", () => {
  assertEquals(typeof createRoot, "function");
});
