import ContentfulApi from "@contentful/Api";

export default class ContentfulLatestVideo extends ContentfulApi {
  static async get() {
    const query = `{
      latestVideoCollection(limit: 1) {
        items {
          sys {
            id
          }
          youTubeEmbed {
            embedUrl
            title
          }
        }
      }
    }`;

    const response = await this.callContentful(query);

    const latestVideo = response.data.latestVideoCollection.items
      ? response.data.latestVideoCollection.items[0]
      : null;

    return latestVideo;
  }
}
