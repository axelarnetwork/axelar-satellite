import type { NextPage } from "next";

import { Layout, VideoBackground } from "../components/layout";
import { PageSEO } from "../components/seo";
import { PageHeader, SwapBox } from "../components/swap";
import { siteMetadata } from "../data";

const Home: NextPage = () => {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        keywords="axelar satellite, cross chain bridge, axelar"
      />

      <Layout>
        <VideoBackground />
        <div className="h-full grid grid-cols-1 pt-[30vh] md:grid-cols-2 justify-items-stretch">
          <PageHeader />
          <div className="flex items-start justify-start">
            <SwapBox />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
