import styles from "./Pagination.module.css";

export default function Pagination(props) {
  const {
    totalPages,
    currentPage,
    prevDisabled,
    nextDisabled,
    goToPage,
    goToNextPage,
    goToPrevPage,
  } = props;

  function renderPageNumbers(totalPages) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <button onClick={() => goToPage(i)}>
            {currentPage === i && <span>SELECTED</span>}
            Page {i}
          </button>
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
