import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import ThingsIUse from "@components/ThingsIUse";

export default function Uses(props) {
  const { pageContent, preview, categories, thingsIUse } = props;

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.uses.url}
        />

        {pageContent.heroBanner !== null && (
          <HeroBanner data={pageContent.heroBanner} />
        )}

        <ContentWrapper>
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
          </PageContentWrapper>

          <ThingsIUse things={thingsIUse} categories={categories} />
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.uses.slug,
    {
      preview: preview,
    },
  );

  //TODO - make this one API call
  const thingsIUse = await ContentfulApi.getThingsIUse();
  const categories = await ContentfulApi.getAllThingsIUseCategories();

  return {
    props: {
      preview,
      pageContent,
      categories,
      thingsIUse,
    },
  };
}
