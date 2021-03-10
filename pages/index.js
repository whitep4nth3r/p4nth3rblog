import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import TwitterApi from "@utils/TwitterApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import LatestTweet from "@components/LatestTweet";

export default function Home(props) {
  const { pageContent, recentPosts, preview, latestTweet } = props;

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.home.url}
        />

        {pageContent.heroBanner !== null && (
          <HeroBanner data={pageContent.heroBanner} />
        )}

        <ContentWrapper>
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
            <LatestTweet latestTweet={latestTweet} />
          </PageContentWrapper>
          <RecentPostList posts={recentPosts} />
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.home.slug,
    {
      preview: preview,
    },
  );

  const recentPosts = await ContentfulApi.getRecentPostList();
  const latestTweet = await TwitterApi.getLatestTweet();

  return {
    props: {
      preview,
      pageContent,
      recentPosts,
      latestTweet,
    },
    revalidate: 2,
  };
}
