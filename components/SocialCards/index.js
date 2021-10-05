import Styles from "@styles/SocialCards.module.css";

import YouTube from "./svgs/youtube";
import Twitch from "./svgs/twitch";
import Twitter from "./svgs/twitter";

const socialCardList = [
  {
    name: "Twitter",
    title: "Twitter",
    description:
      "I tweet about the stuff I build, the things I learn, the tech I love, and great events to tune into. Stay up to date!",
    url: "https://twitter.com/whitep4nth3r",
    ctaLabel: "Follow on Twitter",
    svg: <Twitter />,
  },
  {
    name: "Twitch",
    title: "Twitch",
    description:
      "Join the chat whilst I stream building stuff and learning things three times a week. Come hang out!",
    url: "https://twitch.tv/whitep4nth3r",
    ctaLabel: "Follow on Twitch",
    svg: <Twitch />,
  },
  {
    name: "YouTube",
    title: "YouTube",
    description:
      "Get your fix of front end web developer tips, highlights of live streams, and more.",
    url: "https://youtube.com/whitep4nth3r",
    ctaLabel: "Subscribe on YouTube",
    svg: <YouTube />,
  },
];

export default function SocialCards() {
  return (
    <div className={Styles.socialCards}>
      <ul className={Styles.socialCards__list}>
        {socialCardList.map((card) => (
          <li className={Styles.socialCards__listItem} key={card.name}>
            <div className={Styles.socialCards__svgHolder}>{card.svg}</div>

            <h3 className={Styles.socialCards__title}>{card.title}</h3>
            <p className={Styles.socialCards__description}>
              {card.description}
            </p>
            <a
              className={Styles.socialCards__listItemLink}
              href={card.url}
              aria-label={card.ctaLabel}
              target="_blank"
              rel="nofollow noreferrer"
            >
              {card.ctaLabel} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
