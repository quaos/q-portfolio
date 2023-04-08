import React from "../deps/react.ts";
import { Link, useHistory, useRouteMatch } from "../deps/react-router.ts";

import { Icon } from "./Icon.tsx";
import { NavLink } from "./NavLink.tsx";
import { useStyles } from "../context/styles.tsx";
import { NavLink as NavLinkModel } from "../models/NavLink.ts";

export interface SidebarProps {
  links: NavLinkModel[];
  visible: boolean;
  Component?: string;
  elementId?: string;
}

export const Sidebar = ({
  links,
  visible,
  Component = "nav",
  elementId,
}: React.Props<SidebarProps>) => {
  const { styles } = useStyles();
  const match = useRouteMatch();
  const linkIdPrefix = elementId || SidebarLink.name;

  return (
    <Component
      id={elementId}
      className={`sidebar main-sidebar${(visible) ? "" : " collapse"}`}
    >
      <a name="mainSidebarAnchor" className="sidebar-anchor"></a>
      <ul className="nav list-unstyled">
        {links.map((link: NavLinkModel) => (
          <SidebarLink
            key={`${link.id}`}
            link={link}
            elementId={`${linkIdPrefix}_${link.id}`}
          />
        ))}
      </ul>
    </Component>
  );

  // active={match.url === link.url}
};

export interface SidebarLinkProps {
  link: NavLinkModel;
  // active: boolean;
  Component?: string;
  elementId?: string;
}

export const SidebarLink = ({
  link,
  Component = "li",
  elementId,
}: React.Props<SidebarLinkProps>) => {
  return (
    <NavLink
      Component={Component}
      elementId={elementId}
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
