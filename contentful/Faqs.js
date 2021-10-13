import ContentfulApi from "@contentful/Api";
import GraphQLFragments from "@contentful/GraphQLFragments";

export default class ContentfulFaqs extends ContentfulApi {
  /*
   * Get all faqs
   */
  static async getAll() {
    let page = 1;
    let shouldQueryMoreFaqs = true;
    const returnFaqs = [];

    while (shouldQueryMoreFaqs) {
      const response = await this.getPaginated(page);

      if (response.faqs.length > 0) {
        returnFaqs.push(...response.faqs);
      }

      shouldQueryMoreFaqs = returnFaqs.length < response.total;
      page++;
    }

    return returnFaqs;
  }

  /*
   * Get faqs by page
   * param: page (number)
   */
  static async getPaginated(page) {
    const queryLimit = 10;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const variables = { skip, limit: queryLimit };

    const query = `query GetPaginated($limit: Int!, $skip: Int!) {
      faqCollection(limit: $limit, skip: $skip, order: order_ASC) {
          total
          items {
            sys {
              id
            }
            order
            question
            answer {
              json
              links {
                entries {
                  inline {
                    sys {
                      id
                    }
                    __typename
                    ... on BlogPost {
                      title
                      slug
                      excerpt
                      ...FeaturedImage
                    }
                  }
                  block {
                    sys {
                      id
                    }
                    __typename
                    ...VideoEmbedAsLink
                    ...CodeBlockAsLink
                  }
                }
                ...AssetsAsLinkOnFaq
              }
            }
          }
        }
      }
      
      ${GraphQLFragments.codeBlockAsLink()}
      ${GraphQLFragments.videoEmbedAsLink()}
      ${GraphQLFragments.featuredImage()}
      ${GraphQLFragments.assetsAsLinkOnFaq()}
      `;

    const response = await this.callContentful(query, variables);

    const { total } = response.data.faqCollection;
    const faqs = response.data.faqCollection.items
      ? response.data.faqCollection.items
      : [];

    return { faqs, total };
  }
}
