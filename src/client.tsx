// import { EventEmitter } from "./deps/events.ts";
import { React } from "./deps/react.ts";
import { createRoot } from "./deps/react-dom.ts";
import * as _bs from "./deps/bootstrap-global.ts";

import { App } from "./App.tsx";
// import serviceWorkerContainer from "./service-worker/container.ts";

// interface SWRegisterProps {
//   messagesDispatcher?: EventEmitter;
// }

// const swProm = new Promise<SWRegisterProps>((resolve, reject) => {
//   window.addEventListener('load', (evt) => {
//     console.log("window.load event:", evt);
//     const messagesDispatcher = serviceWorkerContainer.register({ scriptUrl: "/assets/js/service-worker.js" });
//     console.log("Got SW messages dispatcher:", messagesDispatcher);
//     resolve({ messagesDispatcher })
//   });
// });

globalThis.addEventListener("DOMContentLoaded", (evt) => {
  console.log("window.DOMContentLoaded event:", evt);
  const baseNode: HTMLElement | undefined = document.getElementsByTagName("base")[0];
  const basePath = baseNode?.getAttribute("href") ?? "/";

  // swProm.then(({ messagesDispatcher }) => {
  const reactRoot = createRoot(document.getElementById("root"))
  reactRoot.render(
    <App basePath={basePath} />,
    // <App swMessagesDispatcher={messagesDispatcher} />,
  );
  // });
});

export {};
