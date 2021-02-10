import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "./RecentPostList.module.css";
import ButtonStyles from "../Button/Button.module.css";
import PublishedDate from "../Post/PublishedDate";
import Tags from "../Post/Tags";
import { Config } from "../../utils/Config";

export default function RecentPostList(props) {
  const { posts } = props;
  return (
    <>
      <h2 className={styles.recentPostList__header}>Recent articles</h2>
      <ol className={styles.recentPostList}>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <article className={styles.recentPostList__post}>
              <PublishedDate date={post.date} />
              <Link href={`/blog/${post.slug}`}>
                <a className={styles.recentPostList__titleLink}>
                  <h2 className={styles.recentPostList__title}>{post.title}</h2>
                </a>
              </Link>
              {post.tags !== null && <Tags tags={post.tags} />}
              <div className={styles.recentPostList__excerpt}>
                <ReactMarkdown>{post.excerpt}</ReactMarkdown>
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
