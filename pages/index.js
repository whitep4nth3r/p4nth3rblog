import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
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
import SocialCards from "@components/SocialCards";
import TwitchSchedule from "@components/TwitchSchedule";
import fetcher from "@utils/Fetcher";

export default function Home({
  pageContent,
  recentPosts,
  preview,
  // twitchData,
}) {
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
          {/* <TwitchSchedule schedule={twitchData.schedule} /> */}
        </ColorBg>
        <ContentWrapper>
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
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

  const recentPosts = await ContentfulBlogPost.getRecent();

  // const twitchData = await fetcher(`${process.env.DOMAIN}/api/twitch`);

  return {
    props: {
      preview,
      pageContent,
      recentPosts,
      // twitchData,
    },
    revalidate: 10,
  };
}
