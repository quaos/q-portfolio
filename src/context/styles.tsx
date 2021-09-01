import { React } from "../deps/react.ts";

export interface StylesMap {
  [className: string]: React.CSSProperties;
}

export interface StylesContextProps {
  styles: StylesMap;
}

export const StylesContext = React.createContext<StylesContextProps | undefined>(
  undefined,
);

export interface StylesContextProviderProps {
}

// Styles defined here are mainly for overriding default/framework styles for some components
const appStyles: StylesMap = {
  hr: {
    backgroundColor: "transparent",
    opacity: "100%",
    minHeight: "2em",
    margin: "auto",
  }
};

// TODO: Revise this later
export const StylesContextProvider = ({ children }: React.PropsWithChildren<StylesContextProviderProps>) => {
  return (
    <StylesContext.Provider value={{ styles: appStyles }}>
      {children}
    </StylesContext.Provider>
  );
};

export function useStyles(): StylesContextProps {
  const context = React.useContext(StylesContext);
  if (context === undefined) {
    throw new Error("No StylesContext Provider available");
  }

  return context;
}
