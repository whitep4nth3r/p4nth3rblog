import parse from "html-react-parser";
import LatestTweetStyles from "@styles/LatestTweet.module.css";
import Image from "next/image";
import Twitter from "@components/LatestTweet/svg/Twitter";
import LinkIcon from "@components/LatestTweet/svg/LinkIcon";
import Heart from "@components/LatestTweet/svg/Heart";
import Retweet from "@components/LatestTweet/svg/Retweet";
import Reply from "@components/LatestTweet/svg/Reply";

function formatUrlForShortDisplay(url) {
  return new URL(url).hostname;
}

/**
 * DONE:
 * - mentions
 * - show photo media
 * - do not show reply tweets
 * - show rich url previews with images
 * - use mentions entities rather than regex for users
 * - likes and retweets and stuff
 *
 * IN PROGERSS:
 * - video media
 *
 *
 * TODO:
 * - i.e. youtube link
 * - Link component to my Twitter profile
 * - check gifs
 * - check mark (isaud_)
 * - other entities?
 */

export function processTweet(data) {
  let _text = data.text;
  const { entities } = data;

  // remove the url string which is replaced by a rich
  // preview in processUrls
  if (entities.urls) {
    entities.urls.forEach((urlEntity) => {
      _text = _text.replace(urlEntity.url, "");
    });
  }

  // replace @mentions with anchor links
  // warning - probably use the start and end of the mention
  // to properly replace the text with the link
  if (entities.mentions) {
    entities.mentions.forEach((mention) => {
      _text = _text.replace(
        `@${mention.username}`,
        `<a href="https://twitter.com/${mention.username}" target="_blank">@${mention.username}</a>`,
      );
    });
  }

  return parse(_text);
}

function processMedia(includes) {
  // check for media type = photo
  console.log(includes.media);
  const media = includes.media
    .map((media) => {
      switch (media.type) {
        case "video":
          return <div>THIS IS A VIDEO</div>;
        case "photo":
          return (
            <Image
              alt="test"
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

function processUrls(urls) {
  const processed = urls
    .map((url) => {
      // at the moment, we check for url[images] as currently
      // a single image is also a url...
      if (url.images) {
        return (
          <a
            href={url.expanded_url}
            target="_blank"
            className={LatestTweetStyles.urlPreview}
          >
            <div className={LatestTweetStyles.urlPreview__imgContainer}>
              <Image alt={url.title} src={url.images[0].url} layout="fill" />
            </div>
            <div className={LatestTweetStyles.urlPreview__inner}>
              <p className={LatestTweetStyles.urlPreview__title}>{url.title}</p>
              <p className={LatestTweetStyles.urlPreview__description}>
                {url.description}
              </p>
              <div className={LatestTweetStyles.urlPreview__shortUrlDisplay}>
                <span
                  className={LatestTweetStyles.urlPreview__linkIconContainer}
                >
                  <LinkIcon />
                </span>
                <p
                  className={LatestTweetStyles.urlPreview__shortUrlDisplay__url}
                >
                  {formatUrlForShortDisplay(url.expanded_url)}
                </p>
              </div>
            </div>
          </a>
        );
      } else {
        return null;
      }
    })
    .pop();

  return processed;
}

function processTweetMetrics(metrics) {
  return (
    <div className={LatestTweetStyles.metrics}>
      <div className={LatestTweetStyles.metrics__block}>
        <span className={LatestTweetStyles.metrics__iconContainer}>
          <Reply />
        </span>
        <p className={LatestTweetStyles.metrics__metric}>
          {metrics.reply_count}
        </p>
      </div>
      <div className={LatestTweetStyles.metrics__block}>
        <span className={LatestTweetStyles.metrics__iconContainer}>
          <Retweet />
        </span>
        <p className={LatestTweetStyles.metrics__metric}>
          {metrics.retweet_count + metrics.quote_count}
        </p>
      </div>
      <div className={LatestTweetStyles.metrics__block}>
        <span className={LatestTweetStyles.metrics__iconContainer}>
          <Heart />
        </span>
        <p className={LatestTweetStyles.metrics__metric}>
          {metrics.like_count}
        </p>
      </div>
    </div>
  );
}

export default function LatestTweet({ latestTweet }) {
  const { tweet, metrics, profileImgUrl } = latestTweet;

  // Do not show latest tweet if it is a reply tweet
  if (tweet.data.referenced_tweets) {
    return null;
  }

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
      {tweet.includes && processMedia(tweet.includes)}
      {tweet.data.entities.urls && processUrls(tweet.data.entities.urls)}
      {processTweetMetrics(tweet.data.public_metrics)}
    </div>
  );
}
