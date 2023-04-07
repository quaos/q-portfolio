import { React } from "../deps/react.ts";
// import { Button } from "../deps/bootstrap.ts";
// console.log("Button:", Button);

import { PortfolioContextProvider, usePortfolio } from "../context/portfolio.tsx";
import { ContentView } from "../components/ContentView.tsx";
import { PortfolioList } from "../components/PortfolioList.tsx";
// import { Icon } from "../components/Icon.tsx";
import { PortfolioGroup as PortfolioGroupModel } from "../models/PortfolioGroup.ts";

export interface HomePageProps {}

export const HomePage = ({ }: HomePageProps) => {
  return (
    <ContentView elementId="mainPortfolio" className="row">
      <div id="myPersonalInfo">
      </div>
      <PortfolioContextProvider>
        <PortfolioSection />
      </PortfolioContextProvider>
    </ContentView>
  )
};

interface PortfolioSectionProps {}

const PortfolioSection = ({ }: PortfolioSectionProps) => {
  const {loading, portfolioGroups } = usePortfolio();

  if (loading) {
    return (
        <div className="loading"></div>
    );
  }

  return (
    <PortfolioList id="mainPortfolio" groups={portfolioGroups} />
  )

    /* <div id="portAccordion" className="accordion portfolio-list">
      <div className="accordion-item">
        <h2 className="accordion-header" id="portGroup10Head">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse10" aria-expanded="true" aria-controls="collapse4">
            Side Projects &amp; Opensources
          </button>
        </h2>
        <div id="collapse10" className="accordion-collapse collapse portfolio-item show" aria-labelledby="portGroup10Head" data-bs-parent="#portAccordion">
          <div className="accordion-body">
            <ul className="tags">
              <li>javascript</li>
              <li>typescript</li>
              <li>nodejs</li>
              <li>reactjs</li>
              <li>deno</li>
              <li>postgresql</li>
              <li>mongodb</li>
            </ul>
          </div>
        </div>
      </div>
    </div> */
};
