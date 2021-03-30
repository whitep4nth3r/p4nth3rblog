import SocialLinks from "@components/SocialLinks";
import FooterStyles from "@styles/Footer.module.css";
import ButtonStyles from "@styles/Button.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Link from "next/link";
import { Config } from "@utils/Config";

export default function Footer() {
  const date = new Date();

  return (
    <footer className={FooterStyles.footer}>
      <div className={FooterStyles.footer__socialLinksContainer}>
        <SocialLinks fillColor="#ffffff" />
      </div>
      <div className={FooterStyles.footer__ctaContainer}>
        <a
          href="https://twitch.tv/whitep4nth3r"
          className={ButtonStyles.button}
          rel="nofollow noreferrer"
          target="_blank"
        >
          Watch me live on Twitch
        </a>
      </div>
      <p className={FooterStyles.footer__copyright}>
        © {Config.site.owner} {date.getFullYear()} All Rights Reserved.
      </p>
      <Link href={Config.pageMeta.privacyPolicy.slug}>
        <a
          className={`${TypographyStyles.inlineLink} ${FooterStyles.footer__privacyPolicyLink}`}
        >
          Privacy Policy
        </a>
      </Link>
    </footer>
  );
}
