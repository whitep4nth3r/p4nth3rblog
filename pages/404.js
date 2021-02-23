import { Config } from "@utils/Config";
import ContentfulApi from "@utils/ContentfulApi";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import HeroBanner from "@components/HeroBanner";

export default function Panther404(props) {
  const { pageContent } = props;

  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.notFound.url}
      />
      {pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}
    </MainLayout>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.notFound.slug,
  );

  return {
    props: {
      pageContent,
    },
  };
}
