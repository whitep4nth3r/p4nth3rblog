import RichTextPageContentStyles from "@components/RichTextPageContent/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Tags from "@components/Tags";
import PublishedDate from "@components/PublishedDate";
import ExternalUrl from "@components/ExternalUrl";
import RichTextPageContent from "@components/RichTextPageContent";

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
