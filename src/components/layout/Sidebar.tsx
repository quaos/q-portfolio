import React, { DynamicComponent } from "../../deps/react.ts";

import { useStyles } from "../../context/styles.tsx";
import { NavLink as NavLinkModel } from "../../models/NavLink.ts";
import { SidebarLink } from "./SidebarLink.tsx";

export interface SidebarProps {
  Component?: DynamicComponent;
  id?: string;
  links: NavLinkModel[];
  visible: boolean;
}

export const Sidebar = ({
  Component = "nav",
  id,
  links,
  visible,
}: SidebarProps) => {
  const { styles } = useStyles();
  // const match = useMatch();
  const linkIdPrefix = id || SidebarLink.name;

  return (
    <Component
      id={id}
      className={`sidebar main-sidebar${(visible) ? "" : " collapse"}`}
      style={styles.Sidebar}
    >
      <a id="mainSidebarAnchor" className="sidebar-anchor"></a>
      <ul className="nav list-unstyled">
        {links.map((link) => (
          <SidebarLink
            key={`${link.id}`}
            id={`${linkIdPrefix}_${link.id}`}
            link={link}
          />
        ))}
      </ul>
    </Component>
  );

  // active={match.url === link.url}
};
