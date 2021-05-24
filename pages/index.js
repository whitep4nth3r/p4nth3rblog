import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import TwitterApi from "@utils/TwitterApi";
import ContentfulPageContent from "@contentful/PageContent";
import ContentfulBlogPost from "@contentful/BlogPost";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import LandingPageWrapper from "@components/LandingPageWrapper";
import ContentWrapper from "@components/ContentWrapper";
import ColorBg from "@components/ColorBg";
import PageContentWrapper from "@components/PageContentWrapper";
import LatestTweet from "@components/LatestTweet";
import SocialCards from "@components/SocialCards";

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
        </ContentWrapper>

        <ColorBg color="#ffb626" borderTopColor="#f11012">
          <LandingPageWrapper>
            <SocialCards />
          </LandingPageWrapper>
        </ColorBg>
        <ColorBg borderTopColor="#f11012" borderBottomColor="#f11012">
          <LandingPageWrapper>
            <RecentPostList posts={recentPosts} />
          </LandingPageWrapper>
        </ColorBg>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.home.slug,
    {
      preview: preview,
    },
  );

  const latestTweet = await TwitterApi.getLatestTweet();
  const recentPosts = await ContentfulBlogPost.getRecent();

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
