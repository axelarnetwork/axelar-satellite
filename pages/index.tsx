import type { NextPage } from "next";
import { useEffect } from "react";

import {
  Layout,
  UnderMaintenance,
  VideoBackground,
} from "../components/layout";
import { PageSEO } from "../components/seo";
import { SwapBox } from "../components/swap";
import { FirstTimeWarning } from "../components/swap/parts/FirstTimeWarning";
import { ENVIRONMENT, UNDER_MAINTENANCE } from "../config/constants";
import { siteMetadata } from "../data";
import { useInitialChainList } from "../hooks";
import { drawBackground } from "../hooks/particle";
import { useSwapStore } from "../store";

const Home: NextPage = () => {
  const { allAssets, allChains } = useSwapStore();
  const storeReady = allAssets.length > 0 && allChains.length > 0;

  useEffect(() => drawBackground(), []);
  useInitialChainList();

  function renderContent() {
    if (UNDER_MAINTENANCE) return <UnderMaintenance />;

    return (
      <>
        <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-1 justify-items-center lg:justify-items-stretch">
          {ENVIRONMENT === "mainnet" && <FirstTimeWarning />}
          <div
            className="flex items-start justify-center"
            style={{ paddingTop: "calc(50px + 10vh)" }}
          >
            {storeReady && <SwapBox />}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        keywords="axelar satellite, cross chain bridge, axelar"
      />
      <canvas id="canvas" className="absolute w-screen h-screen -z-5 "></canvas>
      <Layout>
        <VideoBackground />

        {renderContent()}
      </Layout>
    </>
  );
};

export default Home;
