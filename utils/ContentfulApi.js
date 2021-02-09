import { Config } from "./Config";

export default class ContentfulApi {
  static postCache;
  static pagesContentCache;
  static totalPostsCache;

  static async getPagesContent() {
    if (this.pagesContentCache) {
      return this.pagesContentCache;
    }

    const query = `
    {
      pageContentCollection(limit: 10) {
        total
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

    this.pagesContentCache = pageContent;
    return pageContent;
  }

  static async getPageContentBySlug(slug) {
    if (!this.pagesContentCache) {
      await this.getPagesContent();
    }

    return this.pagesContentCache.filter((page) => page.slug === slug).pop();
  }

  static async getTotalBlogPostsNumber() {
    if (this.totalPostsCache) {
      return this.totalPostsCache;
    }

    const query = `
      {
        blogPostCollection(limit: ${Config.pagination.pageSize}) {
          total
        }
      }
    `;

    const response = await this.callContentful(query);
    const totalBlogPosts = response.data.blogPostCollection.total
      ? response.data.blogPostCollection.total
      : 0;

    this.totalPostsCache = totalBlogPosts;
    return totalBlogPosts;
  }

  static async getBlogPosts(skip = 0) {
    if (this.postCache) {
      return this.postCache;
    }

    const query = `
    {
      blogPostCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}) {
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
    const blogPosts = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];
    this.postCache = blogPosts;
    return blogPosts;
  }

  static async getBlogPostSlugs() {
    const blogPosts = await this.getBlogPosts();
    return blogPosts.map((post) => post.slug);
  }

  static async getBlogPostBySlug(slug) {
    if (!this.postCache) {
      await this.getBlogPosts();
    }

    return this.postCache.filter((post) => post.slug === slug).pop();
  }

  static async callContentful(query) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const fetchOptions = {
      spaceID: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      endpoint: fetchUrl,
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
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
