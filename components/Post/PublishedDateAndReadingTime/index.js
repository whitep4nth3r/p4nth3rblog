import Styles from "@styles/PublishedDateAndReadingTime.module.css";
import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "@utils/Date";

export default function PublishedDate(props) {
  const { date, readingTime } = props;

  return (
    <div className={Styles.container}>
      <time
        className={Styles.publishedDate}
        dateTime={formatPublishedDateForDateTime(date)}
      >
        {formatPublishedDateForDisplay(date)}
      </time>
      <span className={Styles.divider}>•</span>
      <span className={Styles.readingTime}>{readingTime} min read</span>
    </div>
  );
}
