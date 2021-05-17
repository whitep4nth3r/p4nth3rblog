import ContentfulApi from "@contentful/Api";

export default class ContentfulTopics extends ContentfulApi {
  /**
   * Get all topics
   */
  static async getAll() {
    const query = `
    {
      topicCollection {
        items {
          sys {
            id
          }
          slug
          name
        }
      }
    }
    `;

    const response = await this.callContentful(query);

    const topics = response.data.topicCollection.items
      ? response.data.topicCollection.items
      : [];

    return topics;
  }

  /**
   * Get full topic object from provided slug
   * param: slug (string)
   */
  static async getTopicFromSlug(slug) {
    const query = `
      {
        topicCollection(where: {slug: "${slug}"}, limit: 1) {
          items {
            name
            slug 
            sys {
              id
            }
          }
        }
      }
    `;

    const response = await this.callContentful(query);

    return response.data.topicCollection.items
      ? response.data.topicCollection.items[0]
      : "";
  }
}
