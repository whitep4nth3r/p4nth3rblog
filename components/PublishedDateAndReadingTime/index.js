import Styles from "@styles/PublishedDateAndReadingTime.module.css";
import { formatDateForDateTime, formatDateForDisplay } from "@utils/Date";

export default function PublishedDate(props) {
  const { date, readingTime, isTalk } = props;
  const timeSuffix = isTalk ? "watch time" : "read";

  return (
    <div className={Styles.container}>
      <time
        className={Styles.publishedDate}
        dateTime={formatDateForDateTime(date)}
      >
        {formatDateForDisplay(date)}
      </time>
      <span className={Styles.divider}>•</span>
      <span className={Styles.readingTime}>
        {readingTime}min {timeSuffix}
      </span>
    </div>
  );
}
