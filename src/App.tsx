import { EventEmitter } from "./deps/events.ts";
import React, { useState } from "./deps/react.ts";
import { Link, Route, Router, Routes } from "./deps/react-router.ts";

import { AppContextProvider } from "./context/app.tsx";
import { StylesContextProvider } from "./context/styles.tsx";
// import { NavigationContextProvider } from "../context/navigation.tsx";
// import { ContentView } from "./components/ContentView.tsx";
// import { Sidebar } from "./components/layout/Sidebar.tsx";
import { MainLayout } from "./components/layout/MainLayout.tsx";
import { NavLink as NavLinkModel } from "./models/NavLink.ts";

export interface AppProps {
  basePath: string;
  swMessagesDispatcher?: EventEmitter;
}

export const App = ({ basePath, swMessagesDispatcher }: AppProps) => {
  // const basePath = Deno.env.get("REACT_BASE_PATH") ?? "";

  const [navLinks, setNavLinks] = useState<NavLinkModel[]>(
    [],
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [_isInitialized, setIsInitialized] = useState(
    false,
  );

  const handleToggleSidebar = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setIsSidebarVisible(!isSidebarVisible);

    return false;
  };

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
    setIsInitialized(true);

    return () => {
      // Cleanup app context
    };
  }, []);

  return (
    <AppContextProvider
      basePath={basePath}
      swMessagesDispatcher={swMessagesDispatcher}
    >
      <StylesContextProvider>
        <Router>
          <MainLayout
            id="mainLayout"
            navLinks={navLinks}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={handleToggleSidebar}
          />
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
