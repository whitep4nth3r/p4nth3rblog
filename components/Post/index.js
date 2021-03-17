import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Tags from "@components/Post/Tags";
import PublishedDate from "@components/Post/PublishedDate";
import Author from "@components/Post/Author";
import ExternalUrl from "@components/Post/ExternalUrl";
import RichTextPageContent from "@components/RichTextPageContent";
import CodeBlock from "@components/RichTextPageContent/CodeBlock";
import { Config } from "@utils/Config";

function buildStructuredData(post) {
  const imagesArray = post.body.links?.assets?.block?.map((asset) => asset.url);

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${Config.pageMeta.blogIndex.url}/${post.slug}`,
    },
    headline: post.title,
    image: imagesArray,
    dateCreated: post.date,
    description: post.excerpt,
    keywords: post.tags.join(","),
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.description,
      image: post.author.image.url,
    },
  };

  return JSON.stringify(structuredData);
}

export default function Post(props) {
  const { post } = props;

  return (
    <article className={RichTextPageContentStyles.page}>
      {/* <CodeBlock language="markup" code={buildStructuredData(post)} /> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildStructuredData(post) }}
      />

      {post.externalUrl && <ExternalUrl url={post.externalUrl} />}
      <PublishedDate date={post.date} />
      {post.tags !== null && <Tags tags={post.tags} />}
      <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
      <RichTextPageContent richTextBodyField={post.body} renderH2Links={true} />
      {post.author !== null && <Author author={post.author} />}
    </article>
  );
}
