import React, { useState } from "../../deps/react.ts";
// import { useMatch } from "../../deps/react-router.ts";

import { NotificationsBox } from "../NotificationsBox.tsx";
// import { useServiceWorker } from "../context/service-worker.tsx";
import { useStyles } from "../../context/styles.tsx";
import { NavLink as NavLinkModel } from "../../models/NavLink.ts";
import { HeaderNavbar } from "./HeaderNavbar.tsx";
// import { MessageTypes, NotificationMessage } from "../service-worker/messages.ts";

export interface HeaderProps {
  id?: string;
  isSidebarVisible: boolean;
  links: NavLinkModel[];
  toggleSidebar: (evt: React.SyntheticEvent) => boolean;
}

export const Header = ({
  id = "mainHeader",
  isSidebarVisible,
  links,
  toggleSidebar,
}: HeaderProps) => {
  const { styles } = useStyles();
  // const { messagesDispatcher: swMessagesDispatcher } = useServiceWorker();

  const [notifications, setNotifications] = useState<string[]>([]);
  // useEffect(() => {
  //     (swMessagesDispatcher) && swMessagesDispatcher.on(MessageTypes.Notification, (evt: any) => {
  //             const notif = evt.data as NotificationMessage;
  //             setNotifications(notifications.concat(`${notif.from}: ${notif.text}`));
  //     });
  // }, [swMessagesDispatcher ]);

  const [isNotificationsBoxVisible, setIsNotificationsBoxVisible] = useState(
    false,
  );
  const dispatchToggleNotificationsBox = (evt: Event) => {
    evt.preventDefault();
    setIsNotificationsBoxVisible(!isNotificationsBoxVisible);

    return false;
  };

  return (
    <header id={id} className="main-header" style={styles.Header}>
      {
        /* <div id="webLogo" className="main-header-logo" style={styles.HeaderLogo}>
                <a href="https://www.qpstudio.cc/" style={styles.HeaderLogoLink}>
                    <img src="/assets/img/QP_Company_Logo-v1-orangebg-512x512.png"
                        alt="Logo Image"
                        className="logo-img"
                        style={styles.logoImage}/>
                </a>
            </div> */
      }
      <h1 id="webTitle" className="title" style={styles.HeaderTitle}>
        <img
          src="/assets/img/Q-sign.png"
          alt="Logo Image"
          className="logo-img"
          style={styles.logoImage}
        />
        Q's Portfolio
      </h1>
      <HeaderNavbar
        id="mainHeaderNavbar"
        links={links}
        className="main-header-navbar"
      />
      <a
        href="#"
        id="sidebarToggleBtn"
        onClick={toggleSidebar}
        className="btn btn-default sidebar-toggle-btn"
      >
        {/* <Icon iconSet="fa" iconName={isSidebarVisible ? "angle-left" : "angle-right"} /> */}
      </a>
      {
        /* <a href="#" id="notifToggleBtn" className="btn btn-default" onClick={dispatchToggleNotificationsBox}>
                <Icon iconSet="qp" iconName="messages" size="s" />
                <span className="bubbles">{notifications.length}</span>
            </a> */
      }
      {(isNotificationsBoxVisible)
        ? <NotificationsBox data={notifications} />
        : null}
      <div id="endOfHeader" className="end" style={styles.endOfHeader}></div>
    </header>
  );
};
