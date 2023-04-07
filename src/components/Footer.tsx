import { React } from "../deps/react.ts";

import { Icon } from "./Icon.tsx";
import { useStyles } from "../context/styles.tsx";

export interface FooterProps {
    elementId?: string;
}

export const Footer = ({ elementId }: FooterProps) => {
    const { styles } =  useStyles();

    return (
        <footer id={elementId} className="main-footer">
            <hr style={styles.hr}/>
            <p>Copyright &copy; 2021 Chakrit W. (Q). All rights reserved.</p>
        </footer>
    )
};
