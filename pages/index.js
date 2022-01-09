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
import cn from "classnames";

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
        <div
          className={cn(styles.homeGrid, {
            [styles.homeGrid__emptyEvents]: nextEvent === null,
          })}
        >
          <div className={styles.homeGrid__richText}>
            <h2 className={styles.homeGrid__heading}>About</h2>
            <RichTextPageContent richTextBodyField={pageContent.body} />
          </div>
          <div className={styles.homeGrid__video}>
            <h2 className={styles.homeGrid__heading}>Latest video</h2>
            <VideoEmbed
              embedUrl={latestVideo.youTubeEmbed.embedUrl}
              title={latestVideo.youTubeEmbed.title}
            />
          </div>
          {nextEvent !== null && (
            <div className={styles.homeGrid__event}>
              <h2 className={styles.homeGrid__heading}>Next event</h2>
              <EventsList events={nextEvent} />
            </div>
          )}
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

  console.log("NEXT_PUBLIC_GTAG");
  console.log(process.env.NEXT_PUBLIC_GTAG);

  console.log("GITHUB_ACCESS_TOKEN");
  console.log(process.env.GITHUB_ACCESS_TOKEN);

  console.log("TWITTER_API_KEY");
  console.log(process.env.TWITTER_API_KEY);
  console.log("TWITTER_SECRET_KEY");
  console.log(process.env.TWITTER_SECRET_KEY);
  console.log("TWITTER_BEARER_TOKEN");
  console.log(process.env.TWITTER_BEARER_TOKEN);

  console.log("GOOGLE_PRIVATE_KEY");
  console.log(process.env.GOOGLE_PRIVATE_KEY);
  console.log("GOOGLE_CLIENT_EMAIL");
  console.log(process.env.GOOGLE_CLIENT_EMAIL);
  console.log("GOOGLE_CLIENT_ID");
  console.log(process.env.GOOGLE_CLIENT_ID);

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
