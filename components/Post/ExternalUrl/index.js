import styles from "./ExternalUrl.module.css";
import Link from "next/link";
import InfoSvg from "./InfoSvg";

export default function ExternalUrl(props) {
  const { url } = props;

  function formatUrlForDisplay(url) {
    return new URL(url).hostname;
  }

  return (
    <div className={styles.externalUrl}>
      <span className={styles.externalUrl__svgContainer}>
        <InfoSvg />
      </span>
      <p className={styles.externalUrl__text}>
        Originally published on{" "}
        <Link href={url}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalUrl__link}
          >
            {formatUrlForDisplay(url)}
          </a>
        </Link>
      </p>
    </div>
  );
}
