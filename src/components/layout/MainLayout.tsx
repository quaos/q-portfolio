import { EventEmitter } from "../../deps/events.ts";
import React, { useState } from "../../deps/react.ts";
import { Link, Route, Router, Routes } from "../../deps/react-router.ts";

import { useStyles } from "../../context/styles.tsx";
// import { NavigationContextProvider } from "../context/navigation.tsx";
// import { ContentView } from "./ContentView.tsx";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";
// import { Sidebar } from "./components/Sidebar.tsx";
import { NavLink as NavLinkModel } from "../../models/NavLink.ts";
import { HomePage } from "../pages/home.tsx";

export interface MainLayoutProps {
  id?: string;
  isSidebarVisible: boolean;
  navLinks: NavLinkModel[];
  toggleSidebar: (evt: React.SyntheticEvent) => boolean;
}

export const MainLayout = (
  { id = "mainLayout", isSidebarVisible, navLinks, toggleSidebar }:
    MainLayoutProps,
) => {
  const { styles } = useStyles();

  return (
    <section id={id} className="main-layout" style={styles.MainLayout}>
      <Header
        id="mainHeader"
        links={navLinks}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <div
        id="mainContainer"
        className="wrapper main-container"
        style={styles.MainContainer}
      >
        {/* <Sidebar elementId="mainSidebar" links={navLinks} visible={sidebarVisible} /> */}
        <Routes>
          <Route index path="/*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer id="mainFooter" />
    </section>
  );
};
