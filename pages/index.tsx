import type { NextPage } from "next";

import { Layout, VideoBackground } from "../components/layout";
import { PageSEO } from "../components/seo";
import { PageHeader, SwapBox } from "../components/swap";
import { siteMetadata } from "../data";
import { useInitialChainList } from "../hooks";
import { useSwapStore } from "../store";

const Home: NextPage = () => {
  const { allAssets, allChains } = useSwapStore();
  const storeReady = allAssets.length > 0 && allChains.length > 0;

  useInitialChainList();

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        keywords="axelar satellite, cross chain bridge, axelar"
      />

      <Layout>
        <VideoBackground />
        <div className="h-full grid grid-cols-1 pt-[25vh] lg:grid-cols-1 justify-items-center lg:justify-items-stretch gap-10">
          {/* <PageHeader /> */}
          <div className="flex items-start justify-center">
            {storeReady && <SwapBox />}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
