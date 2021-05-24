export default class TwitterApi {
  static getFetchOptions() {
    return {
      method: "GET",
      headers: {
        "User-Agent": "v2UserLookupJS",
        Authorization: "Bearer " + process.env.TWITTER_BEARER_TOKEN,
      },
    };
  }

  static async getProfilePicture() {
    const fetchUrl = `https://api.twitter.com/2/users/by?usernames=whitep4nth3r&user.fields=profile_image_url`;

    try {
      const data = await fetch(
        fetchUrl,
        TwitterApi.getFetchOptions(),
      ).then((response) => response.json());
      return data.data[0];
    } catch (error) {
      throw new Error("Could not fetch Twitter profile picture!");
    }
  }

  static async getPublicMetrics() {
    const fetchUrl = `https://api.twitter.com/2/users/by?usernames=whitep4nth3r&user.fields=public_metrics`;

    try {
      const data = await fetch(
        fetchUrl,
        TwitterApi.getFetchOptions(),
      ).then((response) => response.json());
      return data.data[0];
    } catch (error) {
      throw new Error("Could not fetch Twitter metrics!");
    }
  }

  // REFACTOR AND CONSOLIDATE!

  static async getTweetById(tweetId) {
    const profile = await TwitterApi.getProfilePicture();
    const metrics = await TwitterApi.getPublicMetrics();

    const latestTweet = await fetch(
      `https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys,referenced_tweets.id&tweet.fields=created_at,entities,public_metrics&media.fields=url,preview_image_url,height,width,duration_ms`,
      TwitterApi.getFetchOptions(),
    ).then((response) => response.json());

    console.log(latestTweet);

    return {
      tweet: latestTweet,
      metrics,
      profileImgUrl: profile.profile_image_url,
    };
  }

  static async getLatestTweet() {
    const profile = await TwitterApi.getProfilePicture();
    const metrics = await TwitterApi.getPublicMetrics();

    try {
      const tweets = await fetch(
        `https://api.twitter.com/2/users/${metrics.id}/tweets`,
        TwitterApi.getFetchOptions(),
      ).then((response) => response.json());

      const latestRichTweet = await fetch(
        `https://api.twitter.com/2/tweets/${tweets.data[0].id}?expansions=attachments.media_keys,referenced_tweets.id&tweet.fields=created_at,entities,public_metrics&media.fields=url,preview_image_url,height,width,duration_ms`,
        TwitterApi.getFetchOptions(),
      ).then((response) => response.json());

      return {
        tweet: latestRichTweet,
        metrics,
        profileImgUrl: profile.profile_image_url,
      };
    } catch (error) {
      throw new Error("Could not fetch latest tweet!");
    }
  }
}
