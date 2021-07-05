import SocialLinksStyles from "@styles/SocialLinks.module.css";
import Discord from "./svg/discord";
import Twitch from "./svg/twitch";
import Twitter from "./svg/twitter";
import GitHub from "./svg/github";
import Youtube from "./svg/youtube";
import Dev from "./svg/dev";
import Feed from "./svg/feed";
import Polywork from "./svg/polywork";
import { Config } from "@utils/Config";

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
  {
    name: "YouTube",
    url: "https://www.youtube.com/whitep4nth3r",
    ariaLabel: "Subscribe to whitep4nth3r on YouTube",
    svg: <Youtube />,
  },
  {
    name: "Dev",
    url: "https://dev.to/whitep4nth3r",
    ariaLabel: "My DEV Community Profile",
    svg: <Dev />,
  },
  {
    name: "Polywokr",
    url: "https://www.polywork.com/whitep4nth3r",
    ariaLabel: "My Polywork Profile",
    svg: <Polywork />,
  },
  {
    name: "RSS Feed",
    url: "feed.xml",
    ariaLabel: `View the RSS feed of ${Config.site.domain}`,
    svg: <Feed />,
  },
];

export default function SocialLinks(props) {
  const { fillColor } = props;

  return (
    <div className={SocialLinksStyles.socialLinks}>
      <ul className={SocialLinksStyles.socialLinks__list}>
        {socialLinksList.map((link) => (
          <li
            className={SocialLinksStyles.socialLinks__listItem}
            key={link.name}
          >
            <a
              className={SocialLinksStyles.socialLinks__listItemLink}
              style={{ color: fillColor }}
              href={link.url}
              aria-label={link.ariaLabel}
              target="_blank"
              rel="nofollow noreferrer"
            >
              {link.svg}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
