import styles from "./Footer.module.css";
import { Config } from "../../utils/Config";

export default function Footer() {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <p className={styles.footer__copyright}>
        © {Config.site.owner} {date.getFullYear()}
      </p>
    </footer>
  );
}
