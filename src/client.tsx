// import { EventEmitter } from "./deps/events.ts";
import { React } from "./deps/react.ts";
import { ReactDOM } from "./deps/react-dom.ts";

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

window.addEventListener("DOMContentLoaded", (evt) => {
  console.log("window.DOMContentLoaded event:", evt);
  // @ts-ignore
  const baseNode: HTMLElement | undefined = document.getElementsByTagName("base")[0];
  const basePath = baseNode?.getAttribute("href") ?? "/";

  // swProm.then(({ messagesDispatcher }) => {
    ReactDOM.render(
      <App basePath={basePath} />,
      // <App swMessagesDispatcher={messagesDispatcher} />,
      // @ts-ignore
      document.getElementById("root"),
    );
  // });
});


export {};
