import { Config } from "@utils/Config";
import Link from "next/link";
import PageMeta from "@components/PageMeta";
import ContentfulTalk from "@contentful/Talk";
import ContentfulTopics from "@contentful/Topics";
import ContentfulBlogPost from "@contentful/BlogPost";
import MainLayout from "@layouts/main";
import ItemsByTopic from "@components/ItemsByTopic";
import Topics from "@components/Topics";
import LandingPageWrapper from "@components/LandingPageWrapper";
import TypographyStyles from "@styles/Typography.module.css";
import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import RecentPostListStyles from "@styles/RecentPostList.module.css";
import ButtonStyles from "@styles/Button.module.css";
import { sortItemsByDate } from "@utils/Date";

export default function Topic(props) {
  const { topic, sortedItemsByTopic, allTopics } = props;

  return (
    <>
      <MainLayout>
        <PageMeta
          title={`Articles about ${topic.name}`}
          description={`Articles about ${topic.name} from whitep4nth3r.com.`}
          url={`${Config.pageMeta.topics.url}/${topic.slug}`}
        />

        <LandingPageWrapper>
          <h1 className={TypographyStyles.heading__h1}>
            Articles about {topic.name}
          </h1>
          <p className={TypographyStyles.heading__h3}>Browse article topics</p>
          <Topics topics={allTopics} selected={topic} scroll={false} />
          <hr className={RichTextPageContentStyles.page__hr} />
          <ItemsByTopic items={sortedItemsByTopic} />
          <div className={RecentPostListStyles.contentList__readMoreContainer}>
            <Link href={Config.pageMeta.blogIndex.slug}>
              <a className={ButtonStyles.button}>View recent articles →</a>
            </Link>
          </div>
        </LandingPageWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticPaths() {
  const topics = await ContentfulTopics.getAll();

  const paths = topics.map((topic) => {
    return { params: { topic: topic.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogPostsByTopic = await ContentfulBlogPost.getAllByTopic(params.topic);
  const talksByTopic = await ContentfulTalk.getAllByTopic(params.topic);
  const itemsByTopic = blogPostsByTopic.concat(talksByTopic);

  const sortedItemsByTopic = itemsByTopic.sort(sortItemsByDate);

  const topic = await ContentfulTopics.getTopicFromSlug(params.topic);
  const allTopics = await ContentfulTopics.getAll();

  return {
    props: {
      sortedItemsByTopic,
      topic,
      allTopics,
    },
  };
}
