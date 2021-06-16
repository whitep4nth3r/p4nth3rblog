import ContentfulPageContent from "@contentful/PageContent";
import ContentfulBlogPost from "@contentful/BlogPost";
import { Config } from "@utils/Config";
import Link from "next/link";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import PewPewPanther from "@components/PewPewPanther";
import ContentWrapper from "@components/ContentWrapper";
import ColorBg from "@components/ColorBg";
import LandingPageWrapper from "@components/LandingPageWrapper";
import RecentPostList from "@components/RecentPostList";
import NotFoundStyles from "@styles/NotFound.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import ButtonStyles from "@styles/Button.module.css";

export default function Panther404({ recentPosts, pageContent }) {
  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.notFound.url}
      />

      <ContentWrapper>
        <div className={NotFoundStyles.container}>
          <div className={NotFoundStyles.pantherContainer}>
            <PewPewPanther />
          </div>
          <h1 className={TypographyStyles.heading__h1}>
            Pew pew! That's a 404.
          </h1>
          <Link href="/">
            <a className={`${ButtonStyles.button} ${NotFoundStyles.button}`}>
              Take me home!
            </a>
          </Link>
        </div>
      </ContentWrapper>
      <ColorBg borderTopColor="#f11012" borderBottomColor="#f11012">
        <LandingPageWrapper>
          <RecentPostList
            posts={recentPosts}
            title="How about some recent articles?"
          />
        </LandingPageWrapper>
      </ColorBg>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.notFound.slug,
  );

  const recentPosts = await ContentfulBlogPost.getRecent();

  return {
    props: {
      pageContent,
      recentPosts,
    },
  };
}
