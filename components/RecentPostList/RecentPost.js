import Link from "next/link";
import RecentPostListStyles from "@styles/RecentPostList.module.css";
import ReactMarkdown from "react-markdown";
import PublishedDateAndReadingTime from "@components/PublishedDateAndReadingTime";
import Topics from "@components/Topics";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";

export default function RecentPost({ item, isTalk }) {
  const baseSlug = isTalk ? "talks" : "blog";
  return (
    <article className={RecentPostListStyles.contentList__post}>
      <PublishedDateAndReadingTime
        date={item.date}
        readingTime={item.readingTime || item.watchTime}
        isTalk={isTalk}
      />
      <Link href={`/${baseSlug}/${item.slug}`}>
        <a className={RecentPostListStyles.contentList__link}>
          <h2 className={RecentPostListStyles.contentList__title}>
            {item.title}
          </h2>
        </a>
      </Link>
      <Topics topics={item.topicsCollection.items} />
      <div className={RecentPostListStyles.contentList__excerpt}>
        <ReactMarkdown
          children={item.excerpt}
          renderers={ReactMarkdownRenderers(item.excerpt)}
        />
      </div>
      <Link href={`/${baseSlug}/${item.slug}`}>
        <a
          className={RecentPostListStyles.contentList__readMoreLink}
          aria-label={`Read ${item.title}`}
        >
          Read more
        </a>
      </Link>
    </article>
  );
}
