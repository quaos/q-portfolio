import React, { DynamicComponent } from "../../deps/react.ts";
import { Link, useMatch, useNavigate } from "../../deps/react-router.ts";

import { Icon } from "../Icon.tsx";
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
  return (
    <NavLink
      Component={Component}
      id={id}
      key={link.id}
      to={link.url}
      exact={link.usingExactMatch}
      className="sidebar-link"
    >
      <Icon
        key="link-icon"
        className="nav-link-icon"
        size="s"
        iconSet={link.iconSet}
        iconName={link.iconName}
      />
      &nbsp;<span key="link-title" className="nav-link-title">
        {link.title}
      </span>
    </NavLink>
  );
};
