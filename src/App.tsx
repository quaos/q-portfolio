import { EventEmitter } from "./deps/events.ts";
import React from "./deps/react.ts";
import { Link, Route, Router, Routes } from "./deps/react-router.ts";

import { AppContextProvider } from "./context/app.tsx";
import { StylesContextProvider } from "./context/styles.tsx";
// import { NavigationContextProvider } from "../context/navigation.tsx";
// import { ContentView } from "./ContentView.tsx";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
// import { Sidebar } from "./components/Sidebar.tsx";
import { HomePage } from "./pages/home.tsx";

export interface AppProps {
  basePath: string;
  swMessagesDispatcher?: EventEmitter;
}

export const App = ({ basePath, swMessagesDispatcher }: AppProps) => {
  // const basePath = Deno.env.get("REACT_BASE_PATH") ?? "";

  const [navLinks, setNavLinks] = React.useState(
    [],
  );
  const [initState, setInitState] = React.useState(
    false,
  );

  React.useEffect(() => {
    // TODO: Initialize app context with real data
    setNavLinks([
      {
        id: 1,
        title: "Home",
        url: "/",
        usingExactMatch: true,
        iconSet: "qp",
        iconName: "planet",
      },
    ]);
    setInitState(true);

    return () => {
      // Cleanup app context
    };
  }, [initState]);

  const [sidebarVisible, setSidebarVisible] = React.useState(true);
  const dispatchToggleSidebar = (evt: Event) => {
    evt.preventDefault();
    setSidebarVisible(!sidebarVisible);

    return false;
  };

  return (
    <AppContextProvider
      basePath={basePath}
      swMessagesDispatcher={swMessagesDispatcher}
    >
      <StylesContextProvider>
        <Router>
          <Header
            elementId="mainHeader"
            links={navLinks}
            sidebarVisible={sidebarVisible}
            dispatchToggleSidebar={dispatchToggleSidebar}
          />
          <div id="mainContainer" className="wrapper main-container">
            {/* <Sidebar elementId="mainSidebar" links={navLinks} visible={sidebarVisible} /> */}
            <Routes>
              <Route path="/" exact>
                <HomePage />
              </Route>
            </Routes>
          </div>
          <Footer elementId="mainFooter" />
        </Router>
      </StylesContextProvider>
    </AppContextProvider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
