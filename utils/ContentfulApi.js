import { Config } from "./Config";

export default class ContentfulApi {
  /*
   * Get the content for one page
   * param: slug (string)
   */
  static async getPageContentBySlug(slug) {
    const query = `
    {
      pageContentCollection(limit: 1, where: {slug: "${slug}"}) {
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
              url
              title
              description
              width
              height
            }
          }
          title
          description
          slug
          body {
            json
            links {
              assets {
                block {
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
          }
        }
      }
    }`;

    const response = await this.callContentful(query);
    const pageContent = response.data.pageContentCollection.items
      ? response.data.pageContentCollection.items
      : [];

    return pageContent.pop();
  }

  /*
   * Get the total number of blog posts
   */
  static async getTotalPostsNumber() {
    const query = `
      {
        blogPostCollection {
          total
        }
      }
    `;

    const response = await this.callContentful(query);
    const totalPosts = response.data.blogPostCollection.total
      ? response.data.blogPostCollection.total
      : 0;

    return totalPosts;
  }

  /*
   * Get all blog post slugs
   * TODO - paginate these?
   */
  static async getPostSlugs() {
    const query = `
      {
        blogPostCollection {
          total
          items {
            slug
          }
        }
    }`;

    const response = await this.callContentful(query);
    const postSlugs = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return postSlugs.map((post) => post.slug);
  }

  /*
   * Get blog post by slug
   * param: slug (string)
   */
  static async getPostBySlug(slug) {
    const query = `{
      blogPostCollection(limit: 1, where: {slug: "${slug}"}) {
        total
        items {
          sys {
            id
          }
          date
          title
          slug
          excerpt
          tags
          externalUrl
          body {
            json
            links {
              entries {
                block {
                  sys {
                    id
                  }
                  __typename
                  ... on VideoEmbed {
                    title
                    embedUrl
                  }
                  ... on CodeBlock {
                    description
                    language
                    code
                  }
                }
              }
              assets {
                block {
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
          }
        }
      }
    }`;

    const response = await this.callContentful(query);
    const post = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];
    return post.pop();
  }

  /*
   * Get post summaries for blog index page
   * param: page (number)
   */
  static async getPaginatedPostSummaries(page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: date_DESC) {
          items {
            sys {
              id
            }
            date
            title
            slug
            excerpt
            tags
          }
        }
      }`;

    const response = await this.callContentful(query);

    const paginatedPostSummaries = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return paginatedPostSummaries;
  }

  /*
   * Get most recent post summaries for home page (not paginated)
   */
  static async getRecentPostList() {
    const query = `{
      blogPostCollection(limit: ${Config.pagination.recentPostsSize}, order: date_DESC) {
        items {
          sys {
            id
          }
          date
          title
          slug
          excerpt
          tags
        }
      }
    }`;

    const response = await this.callContentful(query);

    const recentPosts = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return recentPosts;
  }

  /*
   * Call the Contentful GraphQL Api
   * param: query (string)
   */
  static async callContentful(query) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;

    const fetchOptions = {
      spaceID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      endpoint: fetchUrl,
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ query }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    } catch (error) {
      throw new Error("Could not fetch blog posts!");
    }
  }
}
