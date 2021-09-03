import { React } from "../deps/react.ts";

import { ContentView } from "./ContentView.tsx";
import { useStyles } from "../context/styles.tsx";
import { PortfolioItem as PortfolioItemModel } from "../models/PortfolioItem.ts";
import { Image as ImageModel } from "../models/Image.ts";

interface PortfolioItemProps {
  data: PortfolioItemModel;
  highlighted: boolean;
  setAnchorRef: (element: HTMLAnchorElement) => void;
  onHover: (evt: any, item: PortfolioItemModel, hoverState: boolean) => void;
  Component?: string;
  className?: string;
  parentId?: string;
}

export const PortfolioItem = ({
  data,
  highlighted,
  setAnchorRef,
  onHover,
  Component = "div",
  className,
}: React.Props<PortfolioItemProps>) => {
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
      onMouseOver={(evt: any) => onHover(evt, data, true)}
      onMouseOut={(evt: any) => onHover(evt, data, false)}
    >
      <h3>
        <a name={`${data.id}_anchor`} ref={setAnchorRef}>
          {data.title}
        </a>
      </h3>
      <ContentView markdownContent={data.description} />
      {/* {descLines.map((line, idx) => (
        <p key={`line_${idx + 1}`}>{line}</p>
      ))} */}
    </Component>
  );
};
