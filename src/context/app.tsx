import { EventEmitter } from "../deps/events.ts";
import { React } from "../deps/react.ts";
// import { GraphQLClient } from "../deps/fetch_graphql.ts";

// import { ServiceWorkerContext } from "./service-worker.tsx";

export interface AppContextProps {
  loading: boolean;
  basePath: string;
  baseUrl: URL;
  backendApiUrl: string;
  mobileMode: boolean;
  // graphqlClient: GraphQLClient;
}

export const AppContext = React.createContext<AppContextProps | undefined>();

export interface AppContextProviderProps {
  basePath: string;
  backendApiUrl?: string;
  swMessagesDispatcher?: EventEmitter;
}

export const AppContextProvider =
  ({ basePath, backendApiUrl, swMessagesDispatcher, children }: React.PropsWithChildren<AppContextProviderProps>) => {
    const [loading, setLoading] = React.useState(true);
    // let [mobileMode, setMobileMode] = React.useState(false);
    const mobileMode = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent))
      || (window.navigator.maxTouchPoints > 0);
    const baseUrl = new URL(basePath, window.location.href);

    // const graphqlClient = new GraphQLClient({ url: graphqlUrl });
    // console.log("Created Fetch GraphQL client:", graphqlClient);

    React.useEffect(() => {
      console.log("Start loading...");
      console.log("App base path:", basePath);

      // setMobileMode(
      //   (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent))
      //   || (window.navigator.maxTouchPoints > 0)
      // );

      const timerId = setTimeout(() => {
        setLoading(false);
        console.log("Finished loading");
      }, 100);

      return () => {
        //cleanup
        clearTimeout(timerId);
      };
    }, []);

    return (
      <AppContext.Provider value={{ loading, basePath, baseUrl, backendApiUrl, mobileMode }}>
        {/*<ServiceWorkerContext.Provider value={{ messagesDispatcher: swMessagesDispatcher }}>*/}
          {children}
        {/*</ServiceWorkerContext.Provider>*/}
      </AppContext.Provider>
    );
  };

export function useAppContext(): AppContextProps {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("No AppContext Provider available");
  }

  return context;
}
