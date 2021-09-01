import { React } from "../deps/react.ts";

import { NavLink } from "../../../common/src/models/NavLink.ts";

export interface NavigationContextProps {
    navLinks: NavLink[];
    currentLink: NavLink;
    dispatchNavigateTo: (target: NavLink, evt: any) => void;
}

export const NavigationContext = React.createContext<NavigationContextProps | undefined>(
    undefined,
);

export interface NavigationContextProviderProps {
    children: React.ReactNode;
    navLinks: NavLink[];
}

export const NavigationContextProvider: React.FC = ({ children, navLinks }: NavigationContextProviderProps) => {
    const [currentLink, setCurrentLink] = React.useState<NavLink | undefined>(undefined);

    const dispatchNavigateTo = (target: NavLink, evt: any) => {
        console.log("Navigating to:", target);
        setCurrentLink(target);
    }

    return (
        <NavigationContext.Provider value={{ navLinks, currentLink, dispatchNavigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
};

export function useNavigation(): NavigationContextProps {
    const context = React.useContext(NavigationContext);
    if (context === undefined) {
        throw new Error("No NavigationContext Provider available");
    }

    return context;
}
