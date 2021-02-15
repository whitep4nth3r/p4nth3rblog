import RichTextPageContentStyles from "../RichTextPageContent/RichTextPageContent.module.css";
import TypographyStyles from "../../styles/Typography.module.css";
import Tags from "./Tags";
import PublishedDate from "./PublishedDate";
import ExternalUrl from "./ExternalUrl";
import RichTextPageContent from "../RichTextPageContent";

export default function Post(props) {
  const { post } = props;

  return (
    <article className={RichTextPageContentStyles.page}>
      {post.externalUrl && <ExternalUrl url={post.externalUrl} />}
      <PublishedDate date={post.date} />
      {post.tags !== null && <Tags tags={post.tags} />}
      <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
      <RichTextPageContent richTextBodyField={post.body} isBlogPost={true} />
    </article>
  );
}
