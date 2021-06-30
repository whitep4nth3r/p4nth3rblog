import Link from "next/link";
import RecentPostListStyles from "@styles/RecentPostList.module.css";
import ReactMarkdown from "react-markdown";
import PublishedDateAndReadingTime from "@components/PublishedDateAndReadingTime";
import Topics from "@components/Topics";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";

export default function RecentPost({ post }) {
  return (
    <article className={RecentPostListStyles.contentList__post}>
      <PublishedDateAndReadingTime
        date={post.date}
        readingTime={post.readingTime}
      />
      <Link href={`/blog/${post.slug}`}>
        <a className={RecentPostListStyles.contentList__link}>
          <h2 className={RecentPostListStyles.contentList__title}>
            {post.title}
          </h2>
        </a>
      </Link>
      <Topics topics={post.topicsCollection.items} />
      <div className={RecentPostListStyles.contentList__excerpt}>
        <ReactMarkdown
          children={post.excerpt}
          renderers={ReactMarkdownRenderers(post.excerpt)}
        />
      </div>
      <Link href={`/blog/${post.slug}`}>
        <a
          className={RecentPostListStyles.contentList__readMoreLink}
          aria-label={`Read ${post.title}`}
        >
          Read more
        </a>
      </Link>
    </article>
  );
}
