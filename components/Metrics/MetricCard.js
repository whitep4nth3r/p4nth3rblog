import Styles from "@styles/MetricStyles.module.css";
import ExternalLinkSvg from "./ExternalLinkSvg";

export default function MetricCard({ header, link, metric }) {
  return (
    <div className={Styles.metricsCard}>
      <a
        aria-label={header}
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className={Styles.metricsCard__headerLink}
      >
        <h2 className={Styles.metricsCard__headerText}>{header}</h2>
        <ExternalLinkSvg />
      </a>
      <p className={Styles.metricsCard__metric}>{metric || "-"}</p>
    </div>
  );
}
