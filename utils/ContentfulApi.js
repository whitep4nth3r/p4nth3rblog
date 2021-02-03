export default class ContentfulApi {
  static blogPostCache;

  static async getBlogPosts() {
    if (this.blogPostCache) {
      return this.blogPostCache;
    }

    const query = `
    {
      blogPostCollection(limit: 10) {
        items {
          sys {
            id
          }
          date
          title
          slug
          excerpt
          tags
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
    this.blogPostCache = blogPosts;
    return blogPosts;
  }

  static async getBlogPostSlugs() {
    const blogPosts = await this.getBlogPosts();
    return blogPosts.map((post) => post.slug);
  }

  static async getBlogPostBySlug(slug) {
    if (!this.blogPostCache) {
      await this.getBlogPosts();
    }

    return this.blogPostCache.filter((post) => post.slug === slug).pop();
  }

  static async getSocialLinks() {
    const query = `
      {
        socialLinkCollection {
          items {
            sys {
              id
            }
            name
            ariaLabel
            link
          }
        }
      }`;

    const response = await this.callContentful(query);
    return response.data.socialLinkCollection.items
      ? response.data.socialLinkCollection.items
      : [];
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
