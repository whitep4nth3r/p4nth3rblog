import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import LandingPageWrapper from "@components/LandingPageWrapper";
import ContentWrapper from "@components/ContentWrapper";
import ColorBg from "@components/ColorBg";
import PageContentWrapper from "@components/PageContentWrapper";
import SocialCards from "@components/SocialCards";

export default function Home(props) {
  const { pageContent, recentPosts, preview } = props;

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
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.home.slug,
    {
      preview: preview,
    },
  );

  const recentPosts = await ContentfulApi.getRecentPostList();

  return {
    props: {
      preview,
      pageContent,
      recentPosts,
    },
  };
}
