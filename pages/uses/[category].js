import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import ThingsIUse from "@components/ThingsIUse";

export default function UsesCategory(props) {
  const { pageContent, preview, thingsIUse, categories, filter } = props;

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

          <ThingsIUse
            things={thingsIUse}
            categories={categories}
            filter={filter}
          />
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticPaths() {
  const thingsIUseCategories = await ContentfulApi.getAllThingsIUseCategories();

  const paths = thingsIUseCategories.map((category) => {
    return { params: { category } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.uses.slug,
    {
      preview: preview,
    },
  );

  //TODO - make this one API call
  const thingsIUse = await ContentfulApi.getThingsIUse(params.category);
  const categories = await ContentfulApi.getAllThingsIUseCategories();

  return {
    props: {
      preview,
      pageContent,
      thingsIUse,
      categories,
      filter: params.category,
    },
  };
}
