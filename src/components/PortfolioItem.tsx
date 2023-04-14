import React, { DynamicComponent } from "../deps/react.ts";

import { ContentView } from "./ContentView.tsx";
import { useStyles } from "../context/styles.tsx";
import { PortfolioItem as PortfolioItemModel } from "../models/PortfolioItem.ts";
import { Image as ImageModel } from "../models/Image.ts";

export interface PortfolioItemProps {
  className?: string;
  Component?: DynamicComponent;
  data: PortfolioItemModel;
  highlighted: boolean;
  setAnchorRef: (element: HTMLAnchorElement) => void;
  onHover: (
    evt: React.MouseEvent,
    item: PortfolioItemModel,
    hoverState: boolean,
  ) => void;
  parentId?: string;
}

export const PortfolioItem = ({
  className = "",
  Component = "div",
  data,
  highlighted,
  setAnchorRef,
  onHover,
}: PortfolioItemProps) => {
  const { styles } = useStyles();
  const visible = data.visible ?? true;

  // const descLines: string[] = React.useMemo(
  //   () => data.description?.split("\n") ?? [],
  //   [data.description]
  // );

  if (!visible) {
    return null;
  }

  return (
    <Component
      className={`portfolio-item ${
        highlighted ? "highlighted" : ""
      } ${className}`}
      style={styles.portfolioItem}
      onMouseOver={(evt: React.MouseEvent) => onHover(evt, data, true)}
      onMouseOut={(evt: React.MouseEvent) => onHover(evt, data, false)}
    >
      <h3>
        <a id={`${data.id}_anchor`} ref={setAnchorRef}>
          {data.title}
        </a>
      </h3>
      <ContentView markdownContent={data.description} />
      {
        /* {descLines.map((line, idx) => (
        <p key={`line_${idx + 1}`}>{line}</p>
      ))} */
      }
    </Component>
  );
};
