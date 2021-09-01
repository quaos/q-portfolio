import { EventEmitter } from "../deps/events.ts";
import { React, ReactFC } from "../deps/react.ts";

import { default as serviceWorkerContainer } from '../service-worker/container.ts';
import { ServiceWorkerMessage } from "../service-worker/messages.ts";

export interface ServiceWorkerContextProps {
  messagesDispatcher?: EventEmitter;
}

export const ServiceWorkerContext = React.createContext<ServiceWorkerContextProps | undefined>(undefined);

// export const ServiceWorkerContextProvider: ReactFC<ServiceWorkerContextProps> =
//   ({ scriptUrl = "/assets/js/service-worker.js", children }) => {
//     let [messagesDispatcher, setMessagesDispatcher] =
//       React.useState<EventEmitter | undefined>(undefined);
//     React.useEffect(() => {
//       console.log("Registering service worker at URL:", scriptUrl);
//       const dispatcherImpl = serviceWorkerContainer.register({
//         scriptUrl,
//       });
//       console.log("Got messages dispatcher:", dispatcherImpl);
//       setMessagesDispatcher(dispatcherImpl);
//     }, []);

//     return (
//       <ServiceWorkerContext.Provider value={{ messagesDispatcher }}>
//         {children}
//       </ServiceWorkerContext.Provider>
//     )
//   };

export function useServiceWorker(): ServiceWorkerContextProps {
  const props = React.useContext(ServiceWorkerContext);
  if (!props) {
    throw new Error("No ServiceWorkerContext provider available");
  }
  
  return props;
}
