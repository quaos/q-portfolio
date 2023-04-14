import React from "../deps/react.ts";

import { Icon } from "./Icon.tsx";

export interface ExternalLinkProps {
  href?: string;
  target?: string;
}

export const ExternalLink = ({
  href,
  target = "_blank",
  children,
}: React.PropsWithChildren<ExternalLinkProps>) => {
  return (
    <a href={href} target={target}>
      {children} <Icon iconSet="fa" iconName="external-link-alt" />
    </a>
  );
};
