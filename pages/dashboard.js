import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import LandingPageWrapper from "@components/LandingPageWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import ContentWrapper from "@components/ContentWrapper";
import ColorBg from "@components/ColorBg";

import Metrics from "@components/Metrics/";

export default function Dashboard(props) {
  const { pageContent, preview } = props;

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.dashboard.url}
        />

        {pageContent.body && (
          <ContentWrapper>
            <PageContentWrapper>
              <RichTextPageContent richTextBodyField={pageContent.body} />
            </PageContentWrapper>
          </ContentWrapper>
        )}

        <ColorBg borderTopColor="#f11012" borderBottomColor="#f11012">
          <ContentWrapper>
            <Metrics />
          </ContentWrapper>
        </ColorBg>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.dashboard.slug,
    {
      preview: preview,
    },
  );

  return {
    props: {
      preview,
      pageContent,
    },
  };
}
