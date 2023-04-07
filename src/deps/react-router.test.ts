import {
  Router,
  useNavigate,
} from "./react-router.ts";
import { assert, assertEquals } from "./std.ts";

Deno.test("Router exists", () => {
  assert(Router);
});

Deno.test("useNavigate is a function", () => {
  assert(useNavigate);
  assertEquals(typeof useNavigate, "function");
});
