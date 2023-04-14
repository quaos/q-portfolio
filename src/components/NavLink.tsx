import React, { DynamicComponent } from "../deps/react.ts";
import { useLocation, useMatch, useNavigate } from "../deps/react-router.ts";

import { useStyles } from "../context/styles.tsx";

export interface NavLinkProps {
  Component?: DynamicComponent;
  className?: string;
  id?: string;
  isExact?: boolean;
  isExternal?: boolean;
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
  id,
  isExact,
  isExternal,
  style,
  to,
}: React.PropsWithChildren<NavLinkProps>) => {
  const { styles } = useStyles();
  const navigateTo = useNavigate();
  const routeMatch = useMatch({ path: to, end: isExact });
  const active = (routeMatch) && (!isExact || routeMatch.pathname === to);

  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    console.log(`NavLink: Navigating to:`, to, { isExternal });

    if (!isExternal) {
      navigateTo(to);
      evt.preventDefault();
      return false;
    }

    return true;
  };

  return (
    <Component
      id={id}
      className={`nav-link ${(active) ? "active" : ""} ${className}`}
      style={{ ...styles.NavLink, ...style }}
    >
      <a
        href={to}
        onClick={handleClick}
        target={isExternal ? "_blank" : undefined}
      >
        {children}
      </a>
    </Component>
  );
};
