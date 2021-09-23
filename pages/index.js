import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulEvents from "@contentful/Events";
import ContentfulLatestVideo from "@contentful/LatestVideo";
import ContentfulPageContent from "@contentful/PageContent";
import ContentfulBlogPost from "@contentful/BlogPost";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import ColorBg from "@components/ColorBg";
import LandingPageWrapper from "@components/LandingPageWrapper";
import SocialCards from "@components/SocialCards";
import TwitchSchedule from "@components/TwitchSchedule";
import VideoEmbed from "@components/VideoEmbed";
import EventsList from "@components/EventsList";
import fetcher from "@utils/Fetcher";
import styles from "@styles/HomePage.module.css";

export default function Home({
  pageContent,
  recentPosts,
  preview,
  twitchData,
  latestVideo,
  nextEvent,
}) {
  return (
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

      <LandingPageWrapper>
        <div className={styles.homeGrid}>
          <div className={styles.homeGrid__left}>
            <RichTextPageContent richTextBodyField={pageContent.body} />
          </div>
          <div className={styles.homeGrid__right}>
            <VideoEmbed
              embedUrl={latestVideo.youTubeEmbed.embedUrl}
              title={latestVideo.youTubeEmbed.title}
            />
            <EventsList events={nextEvent} />
          </div>
        </div>
      </LandingPageWrapper>

      <ColorBg borderTopColor="#f11012">
        <LandingPageWrapper>
          <RecentPostList
            posts={recentPosts}
            title="I build stuff, learn things, and write about it."
          />
        </LandingPageWrapper>
      </ColorBg>

      <ColorBg color="#ffb626" borderTopColor="#f11012">
        <LandingPageWrapper>
          <SocialCards />
        </LandingPageWrapper>
      </ColorBg>
    </MainLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.home.slug,
    {
      preview: preview,
    },
  );

  const latestVideo = await ContentfulLatestVideo.get();
  const nextEvent = await ContentfulEvents.getNext();
  const recentPosts = await ContentfulBlogPost.getRecent();
  const twitchData = await fetcher(`${process.env.DOMAIN}/api/twitch`);

  return {
    props: {
      preview,
      pageContent,
      recentPosts,
      twitchData,
      latestVideo,
      nextEvent,
    },
    revalidate: 1,
  };
}
