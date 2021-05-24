import Styles from "@styles/MetricStyles.module.css";
import ExternalLinkSvg from "./svg/ExternalLinkSvg";
import GitHub from "./svg/github";
import Twitch from "./svg/twitch";
import Twitter from "./svg/twitter";
import YouTube from "./svg/youtube";

function getIconFromType(type) {
  switch (type) {
    case "youtube":
      return <YouTube />;
    case "twitter":
      return <Twitter />;
    case "twitch":
      return <Twitch />;
    case "github":
      return <GitHub />;
    default:
      return null;
  }
}

export default function MetricCard({
  headerSmall,
  headerLarge,
  link,
  metric,
  hasUpdated,
  type,
  ariaLabel,
}) {
  const cardClass = hasUpdated
    ? `${Styles.metricsCard} ${Styles.metricsCard__updated}`
    : Styles.metricsCard;

  return (
    <div className={cardClass}>
      <a
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className={Styles.metricsCard__headerLink}
      >
        <h2 className={Styles.metricsCard__headerText}>
          <span className={Styles.metricsCard__headerText__small}>
            {headerSmall}
          </span>
          <span className={Styles.metricsCard__headerText__large}>
            {headerLarge}
          </span>
        </h2>
        {getIconFromType(type)}
      </a>
      <p className={Styles.metricsCard__metric}>{metric || "-"}</p>
    </div>
  );
}
