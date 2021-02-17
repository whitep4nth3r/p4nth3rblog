import FooterStyles from "./Footer.module.css";
import { Config } from "@utils/Config";

export default function Footer() {
  const date = new Date();

  return (
    <footer className={FooterStyles.footer}>
      <p className={FooterStyles.footer__copyright}>
        © {Config.site.owner} {date.getFullYear()}
      </p>
    </footer>
  );
}
