import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "../deps/react.ts";

import { NavLink } from "../models/NavLink.ts";

export interface NavigationContextProps {
  navLinks: NavLink[];
  currentLink?: NavLink;
  goto: (target: NavLink, evt: React.SyntheticEvent) => void;
}

export const NavigationContext = createContext<
  NavigationContextProps | undefined
>(undefined);

export interface NavigationContextProviderProps {
  navLinks: NavLink[];
}

export const NavigationContextProvider = (
  { children, navLinks }: React.PropsWithChildren<
    NavigationContextProviderProps
  >,
) => {
  const [currentLink, setCurrentLink] = useState<NavLink | undefined>(
    undefined,
  );

  const handleGoto = useCallback(
    (target: NavLink, evt: React.SyntheticEvent) => {
      console.log("Navigating to:", target);
      setCurrentLink(target);
    },
    [],
  );

  return (
    <NavigationContext.Provider
      value={{ navLinks, currentLink, goto: handleGoto }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigation(): NavigationContextProps {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("No NavigationContext Provider available");
  }

  return context;
}
