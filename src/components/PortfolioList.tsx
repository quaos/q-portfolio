import { React } from "../deps/react.ts";
import { Link, useHistory, useRouteMatch } from "../deps/react-router.ts";

import { PortfolioGroup } from "./PortfolioGroup.tsx";
import { usePortfolio } from "../context/portfolio.tsx";
import { useStyles } from "../context/styles.tsx";
import { PortfolioGroup as PortfolioGroupModel } from "../models/PortfolioGroup.ts";

interface PortfolioListProps {
    groups: PortfolioGroupModel[];
    id?: string;
    className?: string;
}

export const PortfolioList = ({
    groups,
    id,
    className,
}: React.Props<PortfolioListProps>) => {
    const prevMatch = useRouteMatch();
    const { styles } = useStyles();
    
    return (
        <div id={id} className={`accordion portfolio-list ${className}`} style={styles.portfolioList}>
            {groups.map((group: PortfolioGroupModel) => <PortfolioGroup key={group.id} data={group} /> )}
        </div>
    )
};
