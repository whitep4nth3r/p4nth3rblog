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
      <nav className={FooterStyles.footer__nav} aria-label="secondary">
        <ul className={FooterStyles.footer__linkList}>
          <li className={FooterStyles.footer__linkListItem}>
            <Link href="/topics/webdev">
              <a className={FooterStyles.footer__linkListItemLink}>
                Explore content
              </a>
            </Link>
          </li>
          <li className={FooterStyles.footer__linkListItem}>
            <Link href="/uses">
              <a className={FooterStyles.footer__linkListItemLink}>
                Things I use
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={FooterStyles.footer__socialLinksContainer}>
        <SocialLinks fillColor="#ffffff" />
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
