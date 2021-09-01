import { ReactDOM } from "./react-dom.ts";
import { assert, assertEquals } from "./std.ts";

Deno.test("ReactDOM deps has render function", () => {
  assert("render" in ReactDOM);
  assertEquals(typeof ReactDOM.render, "function");
});
