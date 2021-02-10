import { Config } from "./Config";

export default class ContentfulApi {
  /*
   * Get the content for one page
   * param: slug
   */
  static async getPageContentBySlug(slug) {
    const query = `
    {
      pageContentCollection(limit: 1, where: {slug: "${slug}"}) {
        items {
          sys {
            id
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

  static async getTotalBlogPostsNumber() {
    const query = `
      {
        blogPostCollection {
          total
        }
      }
    `;

    const response = await this.callContentful(query);
    const totalBlogPosts = response.data.blogPostCollection.total
      ? response.data.blogPostCollection.total
      : 0;

    return totalBlogPosts;
  }

  static async getBlogPostSlugs() {
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
    const blogPostSlugs = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    const returnSlugs = blogPostSlugs.map((post) => post.slug);

    return returnSlugs;
  }

  static async getBlogPostBySlug(slug) {
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
    const blogPost = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];
    return blogPost.pop();
  }

  static async getPaginatedBlogPostSummaries(page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}) {
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

    const paginatedBlogPostSummaries = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return paginatedBlogPostSummaries;
  }

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
