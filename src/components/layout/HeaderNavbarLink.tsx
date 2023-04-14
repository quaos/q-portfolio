import React, { DynamicComponent } from "../../deps/react.ts";
// import { useMatch } from "../../deps/react-router.ts";

import { Icon, IconSize } from "../Icon.tsx";
import { NavLink } from "../NavLink.tsx";
import { NotificationsBox } from "../NotificationsBox.tsx";
// import { useServiceWorker } from "../context/service-worker.tsx";
import { useStyles } from "../../context/styles.tsx";
import { NavLink as NavLinkModel } from "../../models/NavLink.ts";
// import { MessageTypes, NotificationMessage } from "../service-worker/messages.ts";

export interface HeaderNavbarLinkProps {
  // active: boolean;
  Component?: DynamicComponent;
  id?: string;
  link: NavLinkModel;
}

export const HeaderNavbarLink = ({
  Component = "li",
  id,
  link,
}: HeaderNavbarLinkProps) => {
  const { styles } = useStyles();

  return (
    <NavLink
      key={link.id}
      className="header-navbar-link"
      Component={Component}
      id={id}
      exact={link.usingExactMatch}
      style={styles.HeaderNavbarLink}
      to={link.url}
    >
      <React.Fragment>
        {link.iconName && (
          <Icon
            size={IconSize.S}
            iconSet={link.iconSet}
            iconName={link.iconName}
          />
        )}
        &nbsp;<span
          className="nav-link-title"
          style={styles.headerNavLinkTitle}
        >
          {link.title}
        </span>
      </React.Fragment>
    </NavLink>
  );
};
