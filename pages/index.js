import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import TwitterApi from "@utils/TwitterApi";
import ContentfulPageContent from "@contentful/PageContent";
import ContentfulBlogPost from "@contentful/BlogPost";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import ColorBg from "@components/ColorBg";
import LandingPageWrapper from "@components/LandingPageWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import LatestTweet from "@components/LatestTweet";
import SocialCards from "@components/SocialCards";
import TwitchSchedule from "@components/TwitchSchedule";
import fetcher from "@utils/Fetcher";

export default function Home(props) {
  const { pageContent, recentPosts, preview, twitchData, latestTweet } = props;

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

        <ColorBg borderBottomColor="#f11012" marginBottom="2rem">
          <TwitchSchedule schedule={twitchData.schedule} />
        </ColorBg>
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
        <ColorBg borderTopColor="#f11012">
          <LandingPageWrapper>
            <RecentPostList
              posts={recentPosts}
              title="I build stuff, learn things, and write about it."
            />
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

  // const latestTweet = await TwitterApi.getLatestTweet();
  const recentPosts = await ContentfulBlogPost.getRecent();
  const twitchData = await fetcher(`${process.env.DOMAIN}/api/twitch`);

  const thisTweet = await TwitterApi.getTweetById("1363946822960562176");

  return {
    props: {
      preview,
      pageContent,
      recentPosts,
      latestTweet: thisTweet,
      twitchData,
    },
    revalidate: 1,
  };
}
