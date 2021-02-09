import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import styles from "./PostList.module.css";
import Link from "next/link";
import PublishedDate from "../Post/PublishedDate";
import Tags from "../Post/Tags";
import Pagination from "./Pagination";
import { Config } from "../../utils/Config";
import ContentfulApi from "../../utils/ContentfulApi";

function shouldDisablePrev(newCurrentPage) {
  return newCurrentPage === 1;
}

function shouldDisableNext(totalPages, newCurrentPage) {
  return newCurrentPage === totalPages;
}

async function getNewBlogPosts(newCurrentPage) {
  const skipMultiplier = newCurrentPage === 1 ? 0 : newCurrentPage - 1;
  const skip =
    skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

  return await ContentfulApi.getBlogPosts(skip);
}

export default function PostList(props) {
  const router = useRouter();

  const currentPageParam =
    router.query.page !== undefined ? parseInt(router.query.page, 10) : 1;

  const { blogPosts, totalBlogPosts } = props;
  const [blogPostsToDisplay, setBlogPostsToDisplay] = useState(blogPosts);

  const [currentPage, setCurrentPage] = useState(1);

  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const totalPages = Math.ceil(totalBlogPosts / Config.pagination.pageSize);

  useEffect(() => {
    setCurrentPage(currentPageParam);

    async function updateBlogPosts() {
      const newBlogPosts = await getNewBlogPosts(currentPageParam);
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

  async function goToNextPage() {
    const newCurrentPage =
      currentPage + 1 > totalPages ? totalPages : currentPage + 1;

    if (newCurrentPage <= totalPages) {
      setCurrentPage(newCurrentPage);
      router.push({
        pathname: Config.pageMeta.blogIndex.slug,
        query: { page: newCurrentPage },
      });
    }

    setNextDisabled(shouldDisableNext(totalPages, newCurrentPage));
    setPrevDisabled(shouldDisablePrev(totalPages));

    const newBlogPosts = await getNewBlogPosts(newCurrentPage);
    setBlogPostsToDisplay(newBlogPosts);
  }

  async function goToPrevPage() {
    const newCurrentPage = currentPage - 1 === 0 ? 1 : currentPage - 1;

    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
      router.push({
        pathname: Config.pageMeta.blogIndex.slug,
        query: { page: newCurrentPage },
      });
    }

    setNextDisabled(shouldDisableNext(totalPages, newCurrentPage));
    setPrevDisabled(shouldDisablePrev(newCurrentPage));

    const newBlogPosts = await getNewBlogPosts(newCurrentPage);
    setBlogPostsToDisplay(newBlogPosts);
  }

  return (
    <>
      <h1>TOTAL POSTS {totalBlogPosts}</h1>
      <h1>numberOfPages {totalPages}</h1>
      <h1>current page {currentPage}</h1>

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
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        setCurrentPage={setCurrentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
    </>
  );
}
