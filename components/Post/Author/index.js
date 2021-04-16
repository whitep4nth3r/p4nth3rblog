import Image from "next/image";
import AuthorStyles from "@styles/Author.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Github from "./svg/Github";
import Twitch from "./svg/Twitch";
import Twitter from "./svg/Twitter";
import Youtube from "./svg/Youtube";

function renderYoutubeUrl(youtubeUrl) {
  return (
    <a
      className={`${TypographyStyles.inlineLink} ${AuthorStyles.author__link}`}
      href={youtubeUrl}
      target="_blank"
      rel="nofollow noreferrer"
      aria-label="Subscribe on YouTube"
    >
      <Youtube />
    </a>
  );
}

function renderTwitter(username) {
  return (
    <a
      className={`${TypographyStyles.inlineLink} ${AuthorStyles.author__link}`}
      href={`https://twitter.com/${username}`}
      target="_blank"
      rel="nofollow noreferrer"
      aria-label="Follow on Twitter"
    >
      <Twitter />
    </a>
  );
}

function renderTwitch(username) {
  return (
    <a
      className={`${TypographyStyles.inlineLink} ${AuthorStyles.author__link}`}
      href={`https://twitch.tv/${username}`}
      target="_blank"
      rel="nofollow noreferrer"
      aria-label="Follow on Twitch"
    >
      <Twitch />
    </a>
  );
}

function renderGitHub(username) {
  return (
    <a
      className={`${TypographyStyles.inlineLink} ${AuthorStyles.author__link}`}
      href={`https://github.com/${username}`}
      target="_blank"
      rel="nofollow noreferrer"
      aria-label="View code on GitHub"
    >
      <Github />
    </a>
  );
}

export default function Author(props) {
  const { author } = props;

  return (
    <div className={AuthorStyles.author}>
      <div className={AuthorStyles.author__imgContainer}>
        <Image
          className={AuthorStyles.author__img}
          src={`${author.image.url}?w=350`}
          alt={author.image.description}
          height={author.image.height}
          width={author.image.width}
        />
      </div>
      <div>
        <div className={AuthorStyles.author__detailsContainer}>
          <h2 className={AuthorStyles.author__name}>{author.name}</h2>
          <p className={AuthorStyles.author__description}>
            {author.description}
          </p>
        </div>

        <div className={AuthorStyles.author__links}>
          {author.twitterUsername && renderTwitter(author.twitterUsername)}
          {author.twitchUsername && renderTwitch(author.twitchUsername)}
          {author.gitHubUsername && renderGitHub(author.gitHubUsername)}
          {author.youtubeUrl && renderYoutubeUrl(author.youtubeUrl)}
        </div>
      </div>
    </div>
  );
}
