import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulTopics from "@contentful/Topics";
import ContentfulBlogPost from "@contentful/BlogPost";
import MainLayout from "@layouts/main";
import Topics from "@components/Topics";
import LandingPageWrapper from "@components/LandingPageWrapper";
import TypographyStyles from "@styles/Typography.module.css";
import ColorBg from "@components/ColorBg";
import RecentPostList from "@components/RecentPostList";

export default function TopicsIndex({ allTopics, recentPosts }) {
  const selectedTopicSlugsForOg = [
    "netlify",
    "graphql",
    "javascript",
    "a11y",
    "nodejs",
    "css",
    "webdev",
  ];
  const selectedTopicsForOg = allTopics.filter((topic) =>
    selectedTopicSlugsForOg.includes(topic.slug),
  );

  return (
    <MainLayout>
      <PageMeta
        title={`Browse articles about web development from whitep4nth3r.com`}
        description={`Explore categorised content from whitep4nth3r.com on GraphQL, JavaScript, Accessibility, CSS and more.`}
        url={`${Config.pageMeta.topics.url}`}
        topics={selectedTopicsForOg}
      />

      <LandingPageWrapper>
        <h1 className={TypographyStyles.heading__h1}>
          Click on a topic to browse articles
        </h1>
        <Topics topics={allTopics} selected={{}} scroll={false} />
      </LandingPageWrapper>
      <ColorBg borderTopColor="#f11012">
        <LandingPageWrapper>
          <RecentPostList posts={recentPosts} title="Recent articles" />
        </LandingPageWrapper>
      </ColorBg>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const allTopics = await ContentfulTopics.getAll();
  const recentPosts = await ContentfulBlogPost.getRecent();

  return {
    props: {
      allTopics,
      recentPosts,
    },
  };
}
