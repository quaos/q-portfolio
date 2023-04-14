import React, { DynamicComponent } from "../deps/react.ts";
import { useLocation, useMatch, useNavigate } from "../deps/react-router.ts";

import { useStyles } from "../context/styles.tsx";

export interface NavLinkProps {
  Component?: DynamicComponent;
  className?: string;
  exact: boolean;
  id?: string;
  style?: React.CSSProperties;
  to: string;
}

/**
 * Custom NavLink
 * @param props
 */
export const NavLink = ({
  children,
  className = "",
  Component = "div",
  exact,
  id,
  style,
  to,
}: React.PropsWithChildren<NavLinkProps>) => {
  const { styles } = useStyles();
  const navigateTo = useNavigate();
  const routeMatch = useMatch({ path: to, end: exact });
  const active = (routeMatch) && (!exact || routeMatch.pathname === to);

  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    console.log(`NavLink: Navigating to:`, to);
    navigateTo(to);
    evt.preventDefault();

    return false;
  };

  return (
    <Component
      id={id}
      className={`nav-link ${(active) ? "active" : ""} ${className}`}
      style={{ ...styles.NavLink, ...style }}
    >
      <a href={to} onClick={handleClick}>
        {children}
      </a>
    </Component>
  );
};
