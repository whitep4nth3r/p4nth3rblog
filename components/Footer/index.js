import SocialLinks from "@components/SocialLinks";
import FooterStyles from "@styles/Footer.module.css";
import ButtonStyles from "@styles/Button.module.css";
import { Config } from "@utils/Config";

export default function Footer() {
  const date = new Date();

  return (
    <footer className={FooterStyles.footer}>
      <SocialLinks fillColor="#ffffff" />
      <div className={FooterStyles.footer__ctaContainer}>
        <a
          href="https://twitch.tv/whitep4nth3r"
          className={ButtonStyles.button}
          rel="noopener noreferrer"
          target="_blank"
        >
          Watch me live on Twitch
        </a>
      </div>
      <p className={FooterStyles.footer__copyright}>
        © {Config.site.owner} {date.getFullYear()} All Rights Reserved.
      </p>
    </footer>
  );
}
