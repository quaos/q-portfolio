import { React } from "../deps/react.ts";
import { useRouteMatch } from "../deps/react-router.ts";

import { Icon } from "./Icon.tsx";
import { NavLink } from "./NavLink.tsx";
import { NotificationsBox } from "./NotificationsBox.tsx";
// import { useServiceWorker } from "../context/service-worker.tsx";
import { useStyles } from "../context/styles.tsx";
import { NavLink as NavLinkModel } from "../models/NavLink.ts";
// import { MessageTypes, NotificationMessage } from "../service-worker/messages.ts";

export interface HeaderProps {
    links: NavLinkModel[];
    sidebarVisible: boolean;
    dispatchToggleSidebar: (evt: Event) => boolean;
    elementId?: string;
}

export const Header = ({
    links,
    sidebarVisible,
    dispatchToggleSidebar,
    elementId,
}: React.Props<HeaderProps>) => {
    const { styles } = useStyles();
    // const { messagesDispatcher: swMessagesDispatcher } = useServiceWorker();

    let [ notifications, setNotifications ] = React.useState<string[]>([]);
    // React.useEffect(() => {
    //     (swMessagesDispatcher) && swMessagesDispatcher.on(MessageTypes.Notification, (evt: any) => {
    //             const notif = evt.data as NotificationMessage;
    //             setNotifications(notifications.concat(`${notif.from}: ${notif.text}`));
    //     });
    // }, [swMessagesDispatcher ]);
    
    let [ notificationsBoxVisible, setNotificationsBoxVisible ] = React.useState<boolean>(false);
    const dispatchToggleNotificationsBox = (evt: Event) => {
        evt.preventDefault();
        setNotificationsBoxVisible(!notificationsBoxVisible);

        return false
    };

    return (
        <header id={elementId} className="main-header" style={styles.Header}>
            {/* <div id="webLogo" className="main-header-logo" style={styles.HeaderLogo}>
                <a href="https://www.qpstudio.cc/" style={styles.HeaderLogoLink}>
                    <img src="/assets/img/QP_Company_Logo-v1-orangebg-512x512.png"
                        alt="Logo Image"
                        className="logo-img"
                        style={styles.logoImage}/>
                </a>
            </div> */}
            <h1 id="webTitle" className="title" style={styles.HeaderTitle}>
                <img src="/assets/img/Q-sign.png"
                    alt="Logo Image"
                    className="logo-img"
                    style={styles.logoImage}/>
                Q's Portfolio
            </h1>
            <HeaderNavBar id="mainHeaderNavbar" links={links} className="main-header-navbar" />
            <a href="#" id="sidebarToggleBtn"
                onClick={dispatchToggleSidebar}
                className="btn btn-default sidebar-toggle-btn">
                {/* <Icon iconSet="fa" iconName={(sidebarVisible) ? "angle-left" : "angle-right"} /> */}
            </a>
            {/* <a href="#" id="notifToggleBtn" className="btn btn-default" onClick={dispatchToggleNotificationsBox}>
                <Icon iconSet="qp" iconName="messages" size="s" />
                <span className="bubbles">{notifications.length}</span>
            </a> */}
            {(notificationsBoxVisible) ? <NotificationsBox data={notifications} /> : null}
            <div id="endOfHeader" className="end" style={styles.endOfHeader}></div>
        </header>
    )
};

export interface HeaderNavbarProps {
    links: NavLinkModel[];
    Component?: string;
    elementId?: string;
}

export const HeaderNavBar = ({
    links,
    Component = "nav",
    elementId,
}: React.Props<HeaderNavbarProps>) => {
    const match = useRouteMatch();
    const linkIdPrefix = elementId || HeaderNavbarLink.name;

    return (
        <Component id={elementId} className="navbar">
            <ul className="nav nav-pills">
            {
                links.map((link: NavLinkModel) => (
                    <HeaderNavbarLink
                        key={`${link.id}`}
                        link={link}
                        elementId={`${linkIdPrefix}_${link.id}`} />
                ))
            }
            </ul>
        </Component>
    )
    
    // active={match.url === link.url} 
}

export interface HeaderNavbarLinkProps {
    link: NavLinkModel;
    // active: boolean;
    Component?: string;
    elementId?: string;
}

export const HeaderNavbarLink = ({
    link,
    Component = "li",
    elementId,
}: React.Props<HeaderNavbarLinkProps>) => {
    const { styles } =  useStyles();

    return (
        <NavLink Component={Component}
            id={elementId}
            key={link.id}
            to={link.url}
            exact={link.usingExactMatch}
            className="header-navbar-link">
            <React.Fragment>
                <Icon size="s" iconSet={link.iconSet} iconName={link.iconName} />
                &nbsp;<span className="nav-link-title" style={styles.headerNavLinkTitle}>{link.title}</span>
            </React.Fragment>
        </NavLink>
    )
}
