import type { NextPage } from "next";

import {
  Layout,
  UnderMaintenance,
  VideoBackground,
} from "../components/layout";
import { PageSEO } from "../components/seo";
import { PageHeader, SwapBox } from "../components/swap";
import { UNDER_MAINTENANCE } from "../config/constants";
import { siteMetadata } from "../data";
import { useInitialChainList } from "../hooks";
import { useSwapStore } from "../store";

const Home: NextPage = () => {
  const { allAssets, allChains } = useSwapStore();
  const storeReady = allAssets.length > 0 && allChains.length > 0;

  useInitialChainList();

  function renderContent() {
    if (UNDER_MAINTENANCE) return <UnderMaintenance />;

    return (
      <div className="h-full grid grid-cols-1 pt-[25vh] lg:grid-cols-1 justify-items-center lg:justify-items-stretch gap-10">
        <div className="flex items-start justify-center">
          {storeReady && <SwapBox />}
        </div>
      </div>
    );
  }

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        keywords="axelar satellite, cross chain bridge, axelar"
      />

      <Layout>
        <VideoBackground />
        {renderContent()}
      </Layout>
    </>
  );
};

export default Home;
