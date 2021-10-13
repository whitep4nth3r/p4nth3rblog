import ContentfulApi from "@contentful/Api";
import GraphQLFragments from "@contentful/GraphQLFragments";

export default class ContentfulThingsIUse extends ContentfulApi {
  /*
   * Get all thingsIUse entries
   * This query is not paginated, because even with a limit of 2000,
   * the GQL complexity is only 4000
   */
  static async getAll(category = "") {
    const filter =
      category !== ""
        ? `, where: {categories_contains_some: "${category}"}`
        : "";

    const query = `{
      thingIUseCollection(order: name_ASC${filter}) {
        total
        items {
          sys {
            id
          }
          name
          categories
          description
          link
          isAffiliateLink
          customLinkText
          image {
            sys {
              id
            }
            url
            title
            width
            height
            description
          }
        }
      }
    }`;

    const response = await this.callContentful(query);

    const thingIUseCollection = response.data.thingIUseCollection.items
      ? response.data.thingIUseCollection.items
      : [];

    return thingIUseCollection;
  }

  static async getCategories() {
    const query = `{
      thingIUseCollection {
        total
        items {
          categories
        }
      }
    }`;

    const response = await this.callContentful(query);

    const thingIUseCollection = response.data.thingIUseCollection.items
      ? response.data.thingIUseCollection.items
      : [];

    const categories = new Set();

    thingIUseCollection.map((thing) => {
      return thing.categories.forEach((cat) => categories.add(cat));
    });

    return Array.from(categories);
  }
}
