import ContentfulApi, { defaultOptions } from "@contentful/Api";
import GraphQLFragments from "@contentful/GraphQLFragments";

export default class ContentfulPageContent extends ContentfulApi {
  /*
   * Get the content for one page
   * param: slug (string)
   */
  static async getBySlug(slug, options = defaultOptions) {
    const query = `
    {
      pageContentCollection(limit: 1, where: {slug: "${slug}"}, preview: ${
      options.preview
    }) {
        items {
          sys {
            id
          }
          heroBanner {
            headline
            subHeading
            internalLink
            externalLink
            ctaText
            image {
              ${GraphQLFragments.imageAsset()}
            }
          }
          title
          description
          slug
          body {
            json
            links {
              entries {
                block {
                  sys {
                    id
                  }
                  __typename
                  ${GraphQLFragments.videoEmbed()}
                  ${GraphQLFragments.codeBlock()}
                }
              }
              ${GraphQLFragments.linkedAssets()}
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query, options);
    const pageContent = response.data.pageContentCollection.items
      ? response.data.pageContentCollection.items
      : [];

    return pageContent.pop();
  }
}
