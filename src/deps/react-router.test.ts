import { React } from "./react.ts";
import {
  Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "./react-router.ts";
import { assert, assertEquals } from "./std.ts";

Deno.test("Router exists", () => {
  assert(Router);
});

Deno.test("useHistory is a function", () => {
  assert(useHistory);
  assertEquals(typeof useHistory, "function");
});
