import styles from "../RichTextPageContent/RichTextPageContent.module.css";
import Tags from "./Tags";
import PublishedDate from "./PublishedDate";
import RichTextPageContent from "../RichTextPageContent";

export default function Post(props) {
  const { blogPost } = props;

  return (
    <article className={styles.page}>
      {/* TODO - this bit */}
      <p>{blogPost.externalUrl}</p>
      <PublishedDate date={blogPost.date} />
      {blogPost.tags !== null && <Tags tags={blogPost.tags} />}
      <h1 className={styles.page__h1}>{blogPost.title}</h1>
      <RichTextPageContent richTextBodyField={blogPost.body} />
    </article>
  );
}