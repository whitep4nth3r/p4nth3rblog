import styles from "../RichTextPageContent/RichTextPageContent.module.css";
import Tags from "./Tags";
import PublishedDate from "./PublishedDate";
import ExternalUrl from "./ExternalUrl";
import RichTextPageContent from "../RichTextPageContent";

export default function Post(props) {
  const { post } = props;

  return (
    <article className={styles.page}>
      {post.externalUrl && <ExternalUrl url={post.externalUrl} />}
      <PublishedDate date={post.date} />
      {post.tags !== null && <Tags tags={post.tags} />}
      <h1 className={styles.page__h1}>{post.title}</h1>
      <RichTextPageContent richTextBodyField={post.body} />
    </article>
  );
}
