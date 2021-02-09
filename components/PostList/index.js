import { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./PostList.module.css";
import Link from "next/link";
import PublishedDate from "../Post/PublishedDate";
import Tags from "../Post/Tags";
import Pagination from "./Pagination";
import { Config } from "../../utils/Config";

function shouldDisablePrev(newCurrentPage) {
  return newCurrentPage === 1;
}

function shouldDisableNext(totalPages, newCurrentPage) {
  return newCurrentPage === totalPages;
}

export default function PostList(props) {
  const { blogPosts, totalBlogPosts } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const totalPages = Math.ceil(totalBlogPosts / Config.pagination.pageSize);

  function goToNextPage() {
    const newCurrentPage = currentPage + 1;

    if (newCurrentPage <= totalPages) {
      setCurrentPage(newCurrentPage);
    }

    setNextDisabled(shouldDisableNext(totalPages, newCurrentPage));
    setPrevDisabled(shouldDisablePrev(totalPages));
  }

  function goToPrevPage() {
    const newCurrentPage = currentPage - 1;

    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }

    setNextDisabled(shouldDisableNext(totalPages, newCurrentPage));
    setPrevDisabled(shouldDisablePrev(newCurrentPage));
  }

  function goToPage(page) {
    setCurrentPage(page);
  }

  return (
    <>
      <h1>TOTAL POSTS {totalBlogPosts}</h1>
      <h1>numberOfPages {totalPages}</h1>
      <h1>current page {currentPage}</h1>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        setCurrentPage={setCurrentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
        goToPage={goToPage}
      />

      <ol className={styles.postList}>
        {blogPosts.map((post) => (
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
    </>
  );
}
