import { React } from "../deps/react.ts";

import { useAppContext } from "./app.tsx";
import { PortfolioGroup as PortfolioGroupModel } from "../models/PortfolioGroup.ts";

export interface PortfolioContextProps {
    loading: boolean;
    portfolioGroups: PortfolioGroupModel[];
}

export const PortfolioContext = React.createContext<PortfolioContextProps | undefined>();

export interface PortfolioContextProviderProps {
}

export const PortfolioContextProvider = ({ children }: React.PropsWithChildren<PortfolioContextProviderProps>) => {
    const { baseUrl } = useAppContext();

    const [loading, setLoading] = React.useState(true);
    const [portfolioGroups, setPortfolioGroups] = React.useState<PortfolioGroupModel[]>([]);

    React.useEffect(async () => {
        try {
            const url = new URL("/data/portfolio.json", baseUrl);
            const resp = await fetch(url.toString());
            const _groups: PortfolioGroupModel[] = await resp.json();
            setLoading(false);
            setPortfolioGroups(_groups);
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <PortfolioContext.Provider value={{ loading, portfolioGroups }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export function usePortfolio(): PortfolioContextProps {
    const context = React.useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error("No PortfolioContext Provider available");
    }

    return context;
}
