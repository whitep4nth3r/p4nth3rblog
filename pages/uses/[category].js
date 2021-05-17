import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@contentful/Api";
import ContentfulThingsIUse from "@contentful/ThingsIUse";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import ThingsIUse from "@components/ThingsIUse";
import { capitalizeFirstChar } from "@utils/Tools";

export default function UsesCategory(props) {
  const { pageContent, preview, thingsIUse, categories, filter } = props;

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={`${pageContent.title} for ${capitalizeFirstChar(filter)}`}
          description={pageContent.description}
          url={`${Config.pageMeta.uses.url}/${filter}`}
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
  const thingsIUseCategories = await ContentfulThingsIUse.getCategories();

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
  const thingsIUse = await ContentfulThingsIUse.getAll(params.category);
  const categories = await ContentfulThingsIUse.getCategories();

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
