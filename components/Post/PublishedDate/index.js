import styles from "./PublishedDate.module.css";
import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "../../../utils/Date";

export default function PublishedDate(props) {
  const { date } = props;

  return (
    <time
      className={styles.publishedDate}
      dateTime={formatPublishedDateForDateTime(date)}
    >
      {formatPublishedDateForDisplay(date)}
    </time>
  );
}
