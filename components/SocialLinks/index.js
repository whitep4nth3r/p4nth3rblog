import styles from "./SocialLinks.module.css";
import Discord from "./svgs/discord";
import Twitch from "./svgs/twitch";
import Twitter from "./svgs/twitter";
import GitHub from "./svgs/github";

const socialLinksList = [
  {
    name: "Discord",
    url: "https://discord.gg/GQbXUVCneJ",
    ariaLabel: "Join The Claw community on Discord",
    svg: <Discord />,
  },
  {
    name: "GitHub",
    url: "https://github.com/whitep4nth3r",
    ariaLabel: "Browse code on GitHub",
    svg: <GitHub />,
  },
  {
    name: "Twitch",
    url: "https://twitch.tv/whitep4nth3r",
    ariaLabel: "Join whitep4nth3r on Twitch",
    svg: <Twitch />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/whitep4nth3r",
    ariaLabel: "Follow whitep4nth3r on Twitter",
    svg: <Twitter />,
  },
];

export default function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      <ul className={styles.socialLinks__list}>
        {socialLinksList.map((link) => (
          <li className={styles.socialLinks__listItem} key={link.name}>
            <a
              className={styles.socialLinks__listItemLink}
              href={link.link}
              aria-label={link.ariaLabel}
              target="_blank"
              rel="noopener nofollow"
            >
              {link.svg}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
