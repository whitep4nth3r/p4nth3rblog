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
          tags
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
}
