import ContentfulApi, { defaultOptions } from "@contentful/Api";
import { Config } from "../utils/Config";

export default class ContentfulBlogPost extends ContentfulApi {
  /*
   * Get the total number of blog posts
   */
  static async getTotal() {
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
   * Get most recent post summaries for home page (not paginated)
   */
  static async getRecent() {
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
          topicsCollection {
            items {
              sys {
                id  
              }
              name
              slug
            }
          }
          readingTime
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
   * Get blog post by slug
   * param: slug (string)
   */

  static async getBySlug(slug, options = defaultOptions) {
    const query = `{
      blogPostCollection(limit: 1, where: {slug: "${slug}"}, preview: ${options.preview}) {
        total
        items {
          sys {
            id
          }
          date
          title
          slug
          excerpt
          topicsCollection {
            items {
              sys {
                id  
              }
              name
              slug
            }
          }
          externalUrl
          readingTime
          author {
            name
            description
            twitchUsername
            twitterUsername
            gitHubUsername
            websiteUrl
            youtubeUrl
            image {
              url
              title
              width
              height
              description
            }
          }
          body {
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
                    featuredImage {
                      url
                      title
                      width
                      height
                      description
                    }
                  }
                }
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

    const response = await this.callContentful(query, options);
    const post = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];
    return post.pop();
  }

  /*
   * Get blog post slugs by page
   * param: page (number)
   */
  static async getPaginatedSlugs(page) {
    const queryLimit = 100;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${queryLimit}, skip: ${skip}, order: date_DESC) {
          total
          items {
            slug
            }
          }
        }`;

    const response = await this.callContentful(query);

    const { total } = response.data.blogPostCollection;
    const slugs = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items.map((item) => item.slug)
      : [];

    return { slugs, total };
  }

  /*
   * Get all blog post slugs
   */
  static async getAllSlugs() {
    let page = 1;
    let shouldQueryMoreSlugs = true;
    const returnSlugs = [];

    while (shouldQueryMoreSlugs) {
      const response = await this.getPaginatedSlugs(page);

      if (response.slugs.length > 0) {
        returnSlugs.push(...response.slugs);
      }

      shouldQueryMoreSlugs = returnSlugs.length < response.total;
      page++;
    }

    return returnSlugs;
  }

  /*
   * Get blog posts by page
   * param: page (number)
   */
  static async getPaginated(page) {
    const queryLimit = 9;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${queryLimit}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            title
            slug
            excerpt
            topicsCollection {
              items {
                sys {
                  id  
                }
                name
                slug
              }
            }
            externalUrl
            author {
              name
              description
              twitchUsername
              twitterUsername
              gitHubUsername
              websiteUrl
              youtubeUrl
              image {
                url
                title
                width
                height
                description
              }
            }
            body {
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
                      featuredImage {
                        url
                        title
                        width
                        height
                        description
                      }
                    }
                  }
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

    const { total } = response.data.blogPostCollection;
    const posts = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return { posts, total };
  }

  /*
   * Get all blog posts
   */
  static async getAll() {
    let page = 1;
    let shouldQueryMorePosts = true;
    const returnPosts = [];

    while (shouldQueryMorePosts) {
      const response = await this.getPaginated(page);

      if (response.posts.length > 0) {
        returnPosts.push(...response.posts);
      }

      shouldQueryMorePosts = returnPosts.length < response.total;
      page++;
    }

    return returnPosts;
  }

  /*
   * Get blog posts by topic
   * param: page (number)
   */
  static async getAllByTopic(topicSlug) {
    let page = 1;
    let shouldQueryMorePosts = true;
    const returnPosts = [];

    while (shouldQueryMorePosts) {
      const response = await this.getPaginatedByTopic(page, topicSlug);

      if (response.items.length > 0) {
        returnPosts.push(...response.items);
      }

      shouldQueryMorePosts = returnPosts.length < response.total;
      page++;
    }

    return returnPosts;
  }

  /**
   * TODO: limit blog post collection and paginate that result?
   * Can we order blogPosts by date_DESC?
   */
  static async getPaginatedByTopic(page, topicSlug) {
    const queryLimit = 1;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
      topicCollection(where: { slug: "${topicSlug}" }, skip: ${skip}, limit: ${queryLimit}) {
        items {
          linkedFrom {
            blogPostCollection {
              total
              items {
                sys {
                  id
                }
                slug
                title
                date
                excerpt
                author {
                  name
                  description
                  image {
                    url
                  }
                }
                topicsCollection {
                  items {
                    sys {
                      id  
                    }
                    name
                    slug
                  }
                }
                featuredImage {
                  sys {
                    id
                  }
                  height
                  width
                  description
                  url
                }
              }
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query);

    const results = response.data.topicCollection.items[0].linkedFrom
      .blogPostCollection
      ? response.data.topicCollection.items[0].linkedFrom.blogPostCollection
      : { total: 0, items: [] };

    return results;
  }

  /*
   * Get post summaries for blog index page
   * param: page (number)
   */
  static async getPaginatedSummaries(page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            title
            slug
            excerpt
            topicsCollection {
              items {
                sys {
                  id  
                }
                name
                slug
              }
            }
            readingTime
            featuredImage {
              url
              description
              height
              width
            }
            author {
              name
              description
              image {
                url
              }
            }
          }
        }
      }`;

    const response = await this.callContentful(query);

    const paginatedPostSummaries = response.data.blogPostCollection
      ? response.data.blogPostCollection
      : { total: 0, items: [] };

    return paginatedPostSummaries;
  }
}
