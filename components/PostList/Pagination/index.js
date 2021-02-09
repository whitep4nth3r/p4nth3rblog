import styles from "./Pagination.module.css";
import Link from "next/link";

export default function Pagination(props) {
  const {
    totalPages,
    currentPage,

    prevDisabled,
    nextDisabled,
    goToNextPage,
    goToPrevPage,
  } = props;

  function renderPageNumbers(totalPages) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <Link href={`/blog?page=${i}`}>
            <a>
              Page {i} {currentPage === i && <span>SELECTED</span>}
            </a>
          </Link>
        </li>,
      );
    }

    return pageNumbers;
  }

  return (
    <nav className={styles.pagination}>
      <button onClick={goToPrevPage} disabled={prevDisabled}>
        PREV
      </button>
      <button onClick={goToNextPage} disabled={nextDisabled}>
        NEXT
      </button>
      <ul>{renderPageNumbers(totalPages)}</ul>
    </nav>
  );
}
