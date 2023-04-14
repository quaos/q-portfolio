import React, { DynamicComponent } from "../../deps/react.ts";

import { Icon, IconSize } from "../Icon.tsx";
import { NavLink } from "../NavLink.tsx";
import { useStyles } from "../../context/styles.tsx";
import { NavLink as NavLinkModel } from "../../models/NavLink.ts";

export interface SidebarLinkProps {
  Component?: DynamicComponent;
  id?: string;
  link: NavLinkModel;
  // active: boolean;
}

export const SidebarLink = ({
  Component = "li",
  id,
  link,
}: React.Props<SidebarLinkProps>) => {
  const { styles } = useStyles();

  return (
    <NavLink
      key={link.id}
      className="sidebar-link"
      Component={Component}
      id={id}
      isExact={link.usingExactMatch}
      isExternal={link.isExternal}
      style={styles.SidebarLink}
      to={link.url}
    >
      <Icon
        key="link-icon"
        className="nav-link-icon"
        size={IconSize.S}
        iconSet={link.iconSet}
        iconSubSet={link.iconSubSet}
        iconName={link.iconName}
      />
      &nbsp;<span key="link-title" className="nav-link-title">
        {link.title}
      </span>
    </NavLink>
  );
};
