import Styles from "@styles/SocialCards.module.css";

import TheClaw from "./svgs/claw";
import Twitch from "./svgs/twitch";
import Twitter from "./svgs/twitter";

const socialCardList = [
  {
    name: "Twitter",
    title: "Twitter",
    description:
      "I tweet about the stuff I build, the things I learn, and what I love. Come and laugh at my silly tech jokes?",
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
    name: "Discord",
    title: "The Claw Discord",
    description:
      "Join a group of tech streamers and friends who believe in creating an inclusive place to talk tech and have fun.",
    url: "https://discord.gg/GQbXUVCneJ",
    ctaLabel: "Join the Discord",
    svg: <TheClaw />,
  },
];

export default function SocialCards() {
  return (
    <div className={Styles.socialCards}>
      <h3 className={Styles.socialCards__header}>
        I'm always somewhere on the web.
      </h3>

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
