import styles from "./SocialLinks.module.css";
import Discord from "./svgs/discord";
import Twitch from "./svgs/twitch";
import Twitter from "./svgs/twitter";
import GitHub from "./svgs/github";

function getSvg(name) {
  switch (name) {
    case "discord":
      return <Discord />;
    case "github":
      return <GitHub />;
    case "twitch":
      return <Twitch />;
    case "twitter":
      return <Twitter />;
    default:
      return "";
  }
}

export default function SocialLinks(props) {
  const { socialLinks } = props;
  return (
    <div className={styles.socialLinks}>
      <ul className={styles.socialLinks__list}>
        {socialLinks.map((link) => (
          <li className={styles.socialLinks__listItem} key={link.sys.id}>
            <a
              className={styles.socialLinks__listItemLink}
              href={link.link}
              aria-label={link.ariaLabel}
              target="_blank"
              rel="noopener nofollow"
            >
              {getSvg(link.name)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
