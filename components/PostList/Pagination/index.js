import styles from "./Pagination.module.css";
import Link from "next/link";

export default function Pagination(props) {
  const {
    totalPages,
    currentPage,

    prevDisabled,
    nextDisabled,
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
      {prevDisabled && <button disabled={prevDisabled}>PREV</button>}
      {!prevDisabled && (
        <Link href={`/blog?page=${currentPage - 1}`} disabled={prevDisabled}>
          <a>PREV LINK</a>
        </Link>
      )}

      <ul>{renderPageNumbers(totalPages)}</ul>

      {nextDisabled && <button disabled={nextDisabled}>NEXT</button>}
      {!nextDisabled && (
        <Link href={`/blog?page=${currentPage + 1}`}>
          <a>NEXT LINK</a>
        </Link>
      )}
    </nav>
  );
}
