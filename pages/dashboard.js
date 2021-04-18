import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import LandingPageWrapper from "@components/LandingPageWrapper";
import ContentWrapper from "@components/ContentWrapper";
import ColorBg from "@components/ColorBg";

import Metrics from "@components/Metrics/";

export default function Dashboard(props) {
  // const {  } = props;

  return (
    <>
      <MainLayout>
        <PageMeta
          title="Dashboard"
          description="My personal stats dashboard, built with Next.js API routes deployed as serverless functions."
          url={Config.pageMeta.dashboard.url}
        />
        <ColorBg borderTopColor="#f11012" borderBottomColor="#f11012">
          <ContentWrapper>
            <Metrics />
          </ContentWrapper>
        </ColorBg>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
