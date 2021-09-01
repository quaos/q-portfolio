import { React } from "../deps/react.ts";
import { useHistory, useRouteMatch } from "../deps/react-router.ts";

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
    let { styles } = useStyles();
    let navHistory = useHistory();
    let prevMatch = useRouteMatch();

    const descLines: string[] = React.useMemo(() => (
      data.description?.split("\n") ?? []
    ), [data.description]);

    return (
      <Component className={`portfolio-item ${highlighted ? "highlighted" : ""} ${className}`}
        onMouseOver={(evt: any) => onHover(evt, data, true)}
        onMouseOut={(evt: any) => onHover(evt, data, false)} >
        <h3>
          <a name={`${data.id}_anchor`} ref={setAnchorRef}>
            {data.title}
          </a>
        </h3>
        {descLines.map((line, idx) => <p key={`line_${idx+1}`}>{line}</p> )}
      </Component>
    )
};
