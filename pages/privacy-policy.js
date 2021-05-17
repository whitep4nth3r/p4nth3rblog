import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulPageContent from "@contentful/PageContent";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";

export default function privacyPolicy(props) {
  const { pageContent, preview } = props;

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.privacyPolicy.url}
        />

        {pageContent.heroBanner !== null && (
          <HeroBanner data={pageContent.heroBanner} />
        )}

        <ContentWrapper>
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
          </PageContentWrapper>
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.privacyPolicy.slug,
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
