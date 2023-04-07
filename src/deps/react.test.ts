import { React } from "./react.ts";
import { assert, assertEquals } from "./std.ts";

Deno.test("React deps has use* hooks", () => {
  // console.log("React=", React);
  // console.log("React.FC=", React.FC);
  assert("useContext" in React);
  assert("useEffect" in React);
  assert("useRef" in React);
  assert("useState" in React);
  assertEquals(typeof React.useState, "function");
});

// Deno.test("React deps has FC type", () => {
//   console.log("React:",React);
//   assert("FunctionComponent" in React);
//   assertEquals(typeof React.FunctionComponent, "function");
// });
