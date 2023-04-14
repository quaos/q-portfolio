import React from "../../deps/react.ts";

// import { Icon } from "../Icon.tsx";
import { useStyles } from "../../context/styles.tsx";

export interface FooterProps {
  id?: string;
}

export const Footer = ({ id = "mainFooter" }: FooterProps) => {
  const { styles } = useStyles();

  return (
    <footer id={id} className="main-footer">
      <hr style={styles.hr} />
      <p>Copyright &copy; 2023 Chakrit W. (Q). All rights reserved.</p>
    </footer>
  );
};
