import Script from "next/script";
import Styles from "@styles/CoreWebVitals.module.css";
import TypographyStyles from "@styles/Typography.module.css";

export default function CoreWebVitals() {
  return (
    <div className={Styles.cwv}>
      <Script src="https://unpkg.com/web-vitals-element@1.3.1/dist/web-vitals-element.min.js" />
      <h4 className={Styles.cwv__header}>Web vitals of this page</h4>
      <p className={Styles.cwv__text}>
        These Web Vitals metrics are shown using the web-vitals-elements
        component from{" "}
        <a
          href="https://stefanjudis.com/"
          target="_blank"
          rel="nofollow noopener"
          className={TypographyStyles.inlineLink}
        >
          @stefanjudis
        </a>
        . Drop it in your site and see the numbers.
      </p>
      <div className={Styles.cwv__container}>
        <web-vitals show-unsupported show-metric-name></web-vitals>
      </div>
    </div>
  );
}
