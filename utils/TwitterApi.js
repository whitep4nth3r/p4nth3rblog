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

  static async getLatestTweet() {
    const metrics = await TwitterApi.getPublicMetrics();
    const profile = await TwitterApi.getProfilePicture();

    try {
      const tweets = await fetch(
        `https://api.twitter.com/2/users/${metrics.id}/tweets`,
        TwitterApi.getFetchOptions(),
      ).then((response) => response.json());

      const latestRichTweet = await fetch(
        `https://api.twitter.com/2/tweets/${tweets.data[0].id}?expansions=attachments.media_keys&media.fields=url,preview_image_url,height,width`,
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
