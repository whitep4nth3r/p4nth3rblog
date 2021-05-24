import ReactMarkdown from "react-markdown";
import Link from "next/link";
import PublishedDateAndReadingTime from "@components/Post/PublishedDateAndReadingTime";
import Topics from "@components/Topics";
import Pagination from "@components/PostList/Pagination";
import ContentListStyles from "@styles/ContentList.module.css";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";
import { Config } from "@utils/Config";
import { buildStructuredDataForBlogPost } from "@utils/Tools";

export default function PostList(props) {
  const { posts, currentPage, totalPages } = props;
  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
    <>
      <ol className={ContentListStyles.contentList}>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <article className={ContentListStyles.contentList__post}>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: buildStructuredDataForBlogPost(post, {
                    isPostList: true,
                  }),
                }}
              />
              <PublishedDateAndReadingTime
                date={post.date}
                readingTime={post.readingTime}
              />
              <Link href={`${Config.pageMeta.blogIndex.slug}/${post.slug}`}>
                <a className={ContentListStyles.contentList__titleLink}>
                  <h2 className={ContentListStyles.contentList__title}>
                    {post.title}
                  </h2>
                </a>
              </Link>
              <Topics topics={post.topicsCollection.items} />
              <div className={ContentListStyles.contentList__excerpt}>
                <ReactMarkdown
                  children={post.excerpt}
                  renderers={ReactMarkdownRenderers(post.excerpt)}
                />
              </div>
              <Link href={`/blog/${post.slug}`}>
                <a
                  className={ContentListStyles.contentList__readMoreLink}
                  aria-label={`Read ${post.title}`}
                >
                  Read more →
                </a>
              </Link>
            </article>
          </li>
        ))}
      </ol>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
    </>
  );
}
