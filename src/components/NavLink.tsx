import { React } from "../deps/react.ts";
import { useHistory, useRouteMatch } from "../deps/react-router.ts";

import { useStyles } from "../context/styles.tsx";

export interface NavLinkProps {
    to: string;
    exact: boolean;
    Component?: string;
    elementId?: string;
}

/**
 * Custom NavLink
 * @param props
 */
export const NavLink = ({
    to,
    exact,
    Component = "div",
    elementId,
    className,
    children,
}: React.PropsWithChildren<NavLinkProps>) => {
    const { styles } =  useStyles();
    const history = useHistory();
    const routeMatch = useRouteMatch({ path: to, strict: exact });
    const active = (routeMatch) && (!exact || routeMatch.exact);

    const onClick = (evt: any) => {
        console.log(`NavLink: Navigating to:`, to);
        history.push(to);
        evt.preventDefault();

        return false
    }

    return (
        <Component id={elementId}
            className={`nav-link ${(active) ? "active" : ""} ${className}`}
            style={styles.NavLink}>
            <a href={to} onClick={onClick}>
                {children}
            </a>
        </Component>
    )
};
