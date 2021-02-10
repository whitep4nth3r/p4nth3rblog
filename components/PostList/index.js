import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Config } from "../../utils/Config";
import ReactMarkdown from "react-markdown";
import styles from "./PostList.module.css";
import Link from "next/link";
import PublishedDate from "../Post/PublishedDate";
import Tags from "../Post/Tags";
import Pagination from "./Pagination";
import ContentfulApi from "../../utils/ContentfulApi";

function shouldDisablePrev(newCurrentPage) {
  return newCurrentPage === 1;
}

function shouldDisableNext(totalPages, newCurrentPage) {
  return newCurrentPage === totalPages;
}

export default function PostList(props) {
  const { blogPosts, totalBlogPosts } = props;

  const router = useRouter();

  const currentPageParam =
    router.query.page !== undefined ? parseInt(router.query.page, 10) : 1;

  const [blogPostsToDisplay, setBlogPostsToDisplay] = useState(blogPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const totalPages = Math.ceil(totalBlogPosts / Config.pagination.pageSize);

  useEffect(() => {
    setCurrentPage(currentPageParam);

    async function updateBlogPosts() {
      const newBlogPosts = await ContentfulApi.getPaginatedBlogPostSummaries(
        currentPageParam,
      );

      setBlogPostsToDisplay(newBlogPosts);
    }

    updateBlogPosts();
    setNextDisabled(shouldDisableNext(totalPages, currentPageParam));
    setPrevDisabled(shouldDisablePrev(currentPageParam));
  }, [
    setCurrentPage,
    currentPageParam,
    setBlogPostsToDisplay,
    setNextDisabled,
    setPrevDisabled,
  ]);

  return (
    <>
      <ol className={styles.postList}>
        {blogPostsToDisplay.map((post) => (
          <li key={post.sys.id}>
            <article className={styles.postList__post}>
              <PublishedDate date={post.date} />
              <Link href={`/blog/${post.slug}`}>
                <a className={styles.postList__titleLink}>
                  <h2 className={styles.postList__title}>{post.title}</h2>
                </a>
              </Link>
              {post.tags !== null && <Tags tags={post.tags} />}
              <div className={styles.postList__excerpt}>
                <ReactMarkdown>{post.excerpt}</ReactMarkdown>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
    </>
  );
}
