import { Config } from "@utils/Config";

export default class TwitterApi {
  static async getUserPublicMetrics() {
    const fetchUrl = `https://api.twitter.com/2/users/by?usernames=${Config.pageMeta.openGraph.twitterUser}&user.fields=public_metrics`;

    const fetchOptions = {
      endpoint: fetchUrl,
      method: "GET",
      headers: {
        "User-Agent": "v2UserLookupJS",
        Authorization: "Bearer " + process.env.TWITTER_BEARER_TOKEN,
      },
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    } catch (error) {
      throw new Error("Could not fetch Twitter data!");
    }
  }
}
