import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Topics from "@components/Topics";
import PublishedDateAndReadingTime from "@components/Post/PublishedDateAndReadingTime";
import Author from "@components/Post/Author";
import ExternalUrl from "@components/Post/ExternalUrl";
import RichTextPageContent from "@components/RichTextPageContent";
import { buildStructuredDataForBlogPost } from "@utils/Tools";

export default function Post(props) {
  const { post } = props;

  return (
    <article className={RichTextPageContentStyles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildStructuredDataForBlogPost(post),
        }}
      />
      {post.externalUrl && <ExternalUrl url={post.externalUrl} />}
      <PublishedDateAndReadingTime
        date={post.date}
        readingTime={post.readingTime}
      />
      <Topics topics={post.topicsCollection.items} />
      <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
      <RichTextPageContent richTextBodyField={post.body} renderH2Links={true} />
      {post.author !== null && <Author author={post.author} />}
    </article>
  );
}
