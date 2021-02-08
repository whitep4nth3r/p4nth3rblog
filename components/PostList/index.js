import ReactMarkdown from "react-markdown";
import styles from "./PostList.module.css";
import Link from "next/link";
import PublishedDate from "../Post/PublishedDate";
import Tags from "../Post/Tags";

export default function PostList(props) {
  const { blogPosts } = props;

  return (
    <ol className={styles.postList}>
      {blogPosts.map((post) => (
        <li key={post.sys.id}>
          <article className={styles.postList__post}>
            <PublishedDate date={post.date} />
            <Link href={`/blog/${post.slug}`}>
              <a className={styles.postList__titleLink}>
                <h2 className={styles.postList__title}>{post.title}</h2>
              </a>
            </Link>
            <Tags tags={post.tags} />
            <div className={styles.postList__excerpt}>
              <ReactMarkdown>{post.excerpt}</ReactMarkdown>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
