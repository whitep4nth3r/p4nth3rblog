import ContentfulApi, { defaultOptions } from "@contentful/Api";
import GraphQLFragments from "@contentful/GraphQLFragments";

export default class ContentfulPageContent extends ContentfulApi {
  /*
   * Get the content for one page
   * param: slug (string)
   */
  static async getBySlug(slug, options = defaultOptions) {
    const variables = { slug, preview: options.preview };

    const query = `query GetBySlug($slug: String!, $preview: Boolean!)
    {
      pageContentCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
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
                  ...VideoEmbedAsLink
                  ...CodeBlockAsLink
                }
              }
              ...AssetsAsLinkOnPageContent
            }
          }
        }
      }
    }

    ${GraphQLFragments.codeBlockAsLink()}
    ${GraphQLFragments.videoEmbedAsLink()}
    ${GraphQLFragments.assetsAsLinkOnPageContent()}
    `;

    const response = await this.callContentful(query, variables, options);
    const pageContent = response.data.pageContentCollection.items
      ? response.data.pageContentCollection.items
      : [];

    return pageContent.pop();
  }
}
