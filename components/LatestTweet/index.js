import parse from "html-react-parser";
import LatestTweetStyles from "@styles/LatestTweet.module.css";
import Image from "next/image";
import Twitter from "@components/LatestTweet/svg/Twitter";

/**
 * DONE:
 * - linking to tagged users
 * - show photo media
 *
 * TODO:
 * - Link component to my Twitter profile
 * - show rich url previews with images
 * - check mark (isaud_)
 * - video type preview image url
 * - other entities?
 * - links and retweets and stuff
 */

export function processTweet(data) {
  // turning @tags into anchor links

  let _text = data.text;
  // Luke says  you can also store the express as an object and then
  //.test before doing a match - it is more performant? i think?

  // Check for and remove urls in tweet text
  const urlMatches = _text.match(/https:\/\/t.co\/[a-zA-Z0-9]+/g);

  if (urlMatches) {
    urlMatches.forEach((match) => {
      _text = _text.replace(match, "");
    });
  }

  const usernameMatches = _text.match(/@(\w){1,15}/g);

  if (usernameMatches) {
    usernameMatches.forEach((name) => {
      _text = _text.replace(
        name,
        `<a href="https://twitter.com/${name.replace(
          "@",
          "",
        )}" target="_blank">${name}</a>`,
      );
    });
  }

  return parse(_text);
}

function processMedia(includes) {
  // check for media type = photo

  const media = includes.media
    .map((media) => {
      switch (media.type) {
        case "photo":
          return (
            <Image
              src={media.url}
              height={media.height}
              width={media.width}
              layout="responsive"
              className={LatestTweetStyles.mediaImg}
            />
          );
        default:
          return null;
      }
    })
    .pop();

  return media;
}

export default function LatestTweet({ latestTweet }) {
  const { tweet, metrics, profileImgUrl } = latestTweet;

  return (
    <div className={LatestTweetStyles.container}>
      <div className={LatestTweetStyles.top}>
        <div className={LatestTweetStyles.imgContainer}>
          <Image
            height={48}
            width={48}
            src={profileImgUrl}
            layout="responsive"
            className={LatestTweetStyles.img}
          />
        </div>
        <div className={LatestTweetStyles.nameContainer}>
          <h3 className={LatestTweetStyles.twitterName}>{metrics.name}</h3>
          <h4 className={LatestTweetStyles.twitterUsername}>
            @{metrics.username}
          </h4>
        </div>
        <Twitter className={LatestTweetStyles.logo} />
      </div>
      <p className={LatestTweetStyles.tweetText}>{processTweet(tweet.data)}</p>
      {processMedia(tweet.includes)}
    </div>
  );
}
