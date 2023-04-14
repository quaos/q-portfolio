import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "../deps/react.ts";
import { useAppContext } from "./app.tsx";
import { PortfolioGroup as PortfolioGroupModel } from "../models/PortfolioGroup.ts";
import { useQuery, UseQueryState } from "../hooks/useQuery.ts";

export interface PortfolioContextProps
  extends Omit<UseQueryState<PortfolioGroupModel[]>, "result"> {
  portfolioGroups: PortfolioGroupModel[];
}

export const PortfolioContext = createContext<
  PortfolioContextProps | undefined
>(undefined);

// deno-lint-ignore no-empty-interface
export interface PortfolioContextProviderProps {}

export const PortfolioContextProvider = (
  { children }: React.PropsWithChildren<PortfolioContextProviderProps>,
) => {
  const { baseUrl } = useAppContext();
  const url = useMemo(() => new URL("/data/portfolio.json", baseUrl), [
    baseUrl,
  ]);

  const { result: portfolioGroups, ...otherState } = useQuery<
    PortfolioGroupModel[]
  >({
    url,
  });

  return (
    <PortfolioContext.Provider
      value={{ ...otherState, portfolioGroups: portfolioGroups ?? [] }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextProps {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("No PortfolioContext Provider available");
  }

  return context;
}
