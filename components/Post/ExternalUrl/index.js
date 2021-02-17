import ExternalUrlStyles from "./ExternalUrl.module.css";
import Link from "next/link";
import InfoSvg from "@components/InfoSvg";

export default function ExternalUrl(props) {
  const { url } = props;

  function formatUrlForDisplay(url) {
    return new URL(url).hostname;
  }

  return (
    <div className={ExternalUrlStyles.externalUrl}>
      <span className={ExternalUrlStyles.externalUrl__svgContainer}>
        <InfoSvg />
      </span>
      <p className={ExternalUrlStyles.externalUrl__text}>
        Originally published on{" "}
        <Link href={url}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={ExternalUrlStyles.externalUrl__link}
          >
            {formatUrlForDisplay(url)}
          </a>
        </Link>
      </p>
    </div>
  );
}
