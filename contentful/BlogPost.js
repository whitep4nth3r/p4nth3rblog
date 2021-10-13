import ContentfulApi, { defaultOptions } from "@contentful/Api";
import GraphQLFragments from "@contentful/GraphQLFragments";
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
    const variables = { limit: Config.pagination.recentPostsSize };

    const query = `query GetRecent($limit: Int!) {
      blogPostCollection(limit: $limit, order: date_DESC) {
        items {
          sys {
            id
          }
          date
          title
          slug
          excerpt
          readingTime
          ...TopicsCollectionOnBlogPost
        }
      }
    }
    
    ${GraphQLFragments.topicsCollectionOnBlogPost()}`;

    const response = await this.callContentful(query, variables);

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
    const variables = { slug, preview: options.preview };

    const query = `query GetPostBySlug($slug: String!, $preview: Boolean!) {
      blogPostCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
        total
        items {
          sys {
            id
          }
          date
          updatedDate
          title
          slug
          excerpt
          readingTime
          externalUrl
          ...TopicsCollectionOnBlogPost
          ...AuthorFull
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
                    ...FeaturedImage
                  }
                }
                block {
                  sys {
                    id
                  }
                  __typename
                  ...TweetEmbedAsLink
                  ...VideoEmbedAsLink
                  ...CodeBlockAsLink
                  ...BlogPostFullAsLink
                }
              }
              ...AssetsAsLinkOnBlogPost
            }
          }
        }
      }
    }
    
    ${GraphQLFragments.authorFull()}
    ${GraphQLFragments.topicsCollectionOnBlogPost()}
    ${GraphQLFragments.featuredImage()}
    ${GraphQLFragments.videoEmbedAsLink()}
    ${GraphQLFragments.codeBlockAsLink()}
    ${GraphQLFragments.tweetEmbedAsLink()}
    ${GraphQLFragments.blogPostFull()}
    ${GraphQLFragments.assetsAsLinkOnBlogPost()}
    `;

    const response = await this.callContentful(query, variables, options);
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

    const variables = { limit: queryLimit, skip };

    const query = `query GetPaginatedSlugs($limit: Int!, $skip: Int!) {
      blogPostCollection(limit: $limit, skip: $skip, order: date_DESC) {
        total
        items {
          slug
        }
      }
    }`;

    const response = await this.callContentful(query, variables);

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

    const variables = { skip, limit: queryLimit };

    const query = `query GetPaginatedSlugs($limit: Int!, $skip: Int!) {
        blogPostCollection(limit: $limit, skip: $skip, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            updatedDate
            title
            slug
            excerpt
            externalUrl
            ...TopicsCollectionOnBlogPost
            ...AuthorFull
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
                    ...BlogPostFullAsLink
                  }
                }
                ...AssetsAsLinkOnBlogPost
              }
            }
          }
        }
      }
      
      ${GraphQLFragments.topicsCollectionOnBlogPost()}
      ${GraphQLFragments.authorFull()}
      ${GraphQLFragments.featuredImage()}
      ${GraphQLFragments.videoEmbedAsLink()}
      ${GraphQLFragments.codeBlockAsLink()}
      ${GraphQLFragments.assetsAsLinkOnBlogPost()}
      ${GraphQLFragments.blogPostFull()}
      `;

    const response = await this.callContentful(query, variables);

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
   * param: topicSlug (string)
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

  /*
   * Get blog posts by topic
   * param: page (number)
   * param: topicSlug (string)
   */
  static async getPaginatedByTopic(page, topicSlug) {
    const queryLimit = 5;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const variables = { slug: topicSlug, limit: queryLimit, skip };

    const query = `query GetPaginatedByTopic($slug: String!, $limit: Int!, $skip: Int!) {
      topicCollection(where: { slug: $slug },  limit: 1) {
        items {
          linkedFrom {
            blogPostCollection(limit: $limit, skip: $skip) {
              total
              items {
                sys {
                  id
                }
                slug
                title
                date
                updatedDate
                excerpt
                readingTime
                ...AuthorBasic
                ...TopicsCollectionOnBlogPost
                ...FeaturedImage
              }
            }
          }
        }
      }
    }
    
    ${GraphQLFragments.featuredImage()}
    ${GraphQLFragments.authorBasic()}
    ${GraphQLFragments.topicsCollectionOnBlogPost()}
    `;

    const response = await this.callContentful(query, variables);

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

    const variables = { skip, limit: Config.pagination.pageSize };

    const query = `query GetPaginatedSummaries($skip: Int!, $limit: Int!) {
        blogPostCollection(limit: $limit, skip: $skip, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            updatedDate
            title
            slug
            excerpt
            readingTime
            ...TopicsCollectionOnBlogPost
            ...FeaturedImage
            ...AuthorBasic
          }
        }
      }
      
      ${GraphQLFragments.topicsCollectionOnBlogPost()}
      ${GraphQLFragments.featuredImage()}
      ${GraphQLFragments.authorBasic()}
      `;

    const response = await this.callContentful(query, variables);

    const paginatedPostSummaries = response.data.blogPostCollection
      ? response.data.blogPostCollection
      : { total: 0, items: [] };

    return paginatedPostSummaries;
  }
}
