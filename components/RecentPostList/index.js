import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "./RecentPostList.module.css";
import ButtonStyles from "../../styles/Button.module.css";
import PublishedDate from "../Post/PublishedDate";
import Tags from "../Post/Tags";
import TypographyStyles from "../../styles/Typography.module.css";
import ContentListStyles from "../../styles/ContentList.module.css";
import { Config } from "../../utils/Config";

export default function RecentPostList(props) {
  const { posts } = props;
  return (
    <>
      <h2 className={styles.recentPostList__header}>Recent articles</h2>
      <ol className={ContentListStyles.contentList}>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <article className={ContentListStyles.contentList__post}>
              <PublishedDate date={post.date} />
              <Link href={`/blog/${post.slug}`}>
                <a className={ContentListStyles.contentList__titleLink}>
                  <h2 className={ContentListStyles.contentList__title}>
                    {post.title}
                  </h2>
                </a>
              </Link>
              {post.tags !== null && <Tags tags={post.tags} />}
              <div className={ContentListStyles.contentList__excerpt}>
                <ReactMarkdown
                  renderers={{
                    link: (props) => (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={TypographyStyles.inlineLink}
                      />
                    ),
                  }}
                >
                  {post.excerpt}
                </ReactMarkdown>
              </div>
            </article>
          </li>
        ))}
      </ol>
      <Link href={Config.pageMeta.blogIndex.slug}>
        <a className={ButtonStyles.button}>Read more</a>
      </Link>
    </>
  );
}
