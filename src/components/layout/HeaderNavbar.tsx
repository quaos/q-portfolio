import React, { DynamicComponent } from "../../deps/react.ts";
// import { useMatch } from "../../deps/react-router.ts";

// import { useServiceWorker } from "../context/service-worker.tsx";
import { useStyles } from "../../context/styles.tsx";
import { NavLink as NavLinkModel } from "../../models/NavLink.ts";
import { HeaderNavbarLink } from "./HeaderNavbarLink.tsx";
// import { MessageTypes, NotificationMessage } from "../service-worker/messages.ts";

export interface HeaderNavbarProps {
  className?: string;
  Component?: DynamicComponent;
  id?: string;
  links: NavLinkModel[];
}

export const HeaderNavbar = ({
  className = "",
  Component = "nav",
  id,
  links,
}: HeaderNavbarProps) => {
  const { styles } = useStyles();
  // const match = useMatch();
  const linkIdPrefix = id || HeaderNavbarLink.name;

  return (
    <Component
      id={id}
      className={`navbar ${className}`}
      style={styles.HeaderNavbar}
    >
      <ul className="nav nav-pills">
        {links.map((link: NavLinkModel) => (
          <HeaderNavbarLink
            key={`${link.id}`}
            link={link}
            id={`${linkIdPrefix}_${link.id}`}
          />
        ))}
      </ul>
    </Component>
  );

  // active={match.url === link.url}
};
