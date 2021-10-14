import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Topics from "@components/Topics";
import PublishedDateAndReadingTime from "@components/PublishedDateAndReadingTime";
import Author from "@components/Post/Author";
import ExternalUrl from "@components/Post/ExternalUrl";
import RichTextPageContent from "@components/RichTextPageContent";
import Styles from "@styles/Post.module.css";
import Star from "@components/Post/svg/Star";
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
        updatedDate={post.updatedDate}
      />
      <Topics topics={post.topicsCollection.items} />
      {post.isSponsored && (
        <p className={Styles.post__sponsored}>
          <Star />
          <span>Sponsored</span>
        </p>
      )}
      <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
      <RichTextPageContent richTextBodyField={post.body} renderH2Links={true} />
      {post.author !== null && <Author author={post.author} />}
    </article>
  );
}
