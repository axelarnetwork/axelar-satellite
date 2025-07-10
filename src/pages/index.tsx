import type { NextPage } from "next";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import { UNDER_MAINTENANCE } from "~/config/constants";
import { Layout, UnderMaintenance } from "~/components/layout";
import { PageSEO } from "~/components/seo";
import { SquidBanner } from "~/components/swap/parts/SquidBanner";

import { siteMetadata } from "~/data";
import { useNormalizeChains, useNormalizeUrlPaths } from "~/hooks";
import { useInitialChainList } from "~/hooks/init";
import { drawBackground } from "~/hooks/particle";

const VideoBackground = dynamic(
  () => import("~/components/layout/VideoBackground")
);

const Home: NextPage = () => {
  useEffect(() => drawBackground(), []);
  useInitialChainList();
  useNormalizeUrlPaths();
  useNormalizeChains();

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        keywords="axelar satellite, cross chain bridge, axelar"
      />
      <canvas id="canvas" className="absolute w-screen h-screen -z-5 " />
      <Layout>
        <VideoBackground />

        {UNDER_MAINTENANCE ? (
          <UnderMaintenance />
        ) : (
          <>
            <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-1 justify-items-center lg:justify-items-stretch">
              <div className="flex flex-col items-center justify-center">
                <SquidBanner />
                {/* SwapBox is now hidden to show only the deprecation notice */}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
