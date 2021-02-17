import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";

export default function Home(props) {
  const { pageContent, recentPosts } = props;

  return (
    <>
      <MainLayout>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.home.url}
        />

        {pageContent.heroBanner !== null && (
          <HeroBanner data={pageContent.heroBanner} />
        )}

        <ContentWrapper>
          <RichTextPageContent richTextBodyField={pageContent.body} />
          <RecentPostList posts={recentPosts} />
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.home.slug,
  );

  const recentPosts = await ContentfulApi.getRecentPostList();

  return {
    props: {
      pageContent,
      recentPosts,
    },
  };
}
