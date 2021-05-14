import Link from "next/link";
import ReactMarkdown from "react-markdown";
import RecentPostListStyles from "@styles/RecentPostList.module.css";
import ButtonStyles from "@styles/Button.module.css";
import PublishedDateAndReadingTime from "@components/Post/PublishedDateAndReadingTime";
import Topics from "@components/Topics";
import { Config } from "@utils/Config";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";

export default function RecentPostList(props) {
  const { posts } = props;
  return (
    <>
      <h2 className={RecentPostListStyles.recentPostList__header}>
        I build stuff, learn things, and write about it.
      </h2>
      <ol className={RecentPostListStyles.contentList}>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <article className={RecentPostListStyles.contentList__post}>
              <PublishedDateAndReadingTime
                date={post.date}
                readingTime={post.readingTime}
              />
              <Link href={`/blog/${post.slug}`}>
                <a className={RecentPostListStyles.contentList__link}>
                  <h2 className={RecentPostListStyles.contentList__title}>
                    {post.title}
                  </h2>
                </a>
              </Link>
              <Topics topics={post.topicsCollection.items} />
              <div className={RecentPostListStyles.contentList__excerpt}>
                <ReactMarkdown
                  children={post.excerpt}
                  renderers={ReactMarkdownRenderers(post.excerpt)}
                />
              </div>
              <Link href={`/blog/${post.slug}`}>
                <a
                  className={RecentPostListStyles.contentList__readMoreLink}
                  aria-label={`Read ${post.title}`}
                >
                  Read more
                </a>
              </Link>
            </article>
          </li>
        ))}
      </ol>
      <div className={RecentPostListStyles.contentList__readMoreContainer}>
        <Link href={Config.pageMeta.blogIndex.slug}>
          <a className={ButtonStyles.button}>View more articles →</a>
        </Link>
      </div>
    </>
  );
}
