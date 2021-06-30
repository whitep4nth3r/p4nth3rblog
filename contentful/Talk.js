import ContentfulApi from "@contentful/Api";
import { Config } from "../utils/Config";

export default class ContentfulTalk extends ContentfulApi {
  /*
   * Get the total number of talks
   */
  static async getTotal() {
    const query = `
        {
          talkCollection {
            total
          }
        }
      `;

    const response = await this.callContentful(query);
    const totalTalks = response.data.talkCollection.total
      ? response.data.talkCollection.total
      : 0;

    return totalTalks;
  }

  /*
   * Get talk post slugs by page
   * param: page (number)
   */
  static async getPaginatedSlugs(page) {
    const queryLimit = 100;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const query = `{
        talkCollection(limit: ${queryLimit}, skip: ${skip}, order: date_DESC) {
          total
          items {
            slug
            }
          }
        }`;

    const response = await this.callContentful(query);

    const { total } = response.data.talkCollection;
    const slugs = response.data.talkCollection.items
      ? response.data.talkCollection.items.map((item) => item.slug)
      : [];

    return { slugs, total };
  }

  /*
   * Get all talk slugs
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
   * Get talk by slug
   * param: slug (string)
   */

  static async getBySlug(slug, options = defaultOptions) {
    const query = `{
      talkCollection(limit: 1, where: {slug: "${slug}"}) {
        total
        items {
          sys {
            id
          }
          title
          date
          watchTime
          slug
          excerpt
          transcript {
            json
          }
          speakerDeckLink {
            link
            title
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
          recording {
            embedUrl
            title
          }
          topicsCollection {
            items {
              sys {
                id
              }
              slug
              name
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query, options);
    const talk = response.data.talkCollection.items
      ? response.data.talkCollection.items
      : [];
    return talk.pop();
  }

  /*
   * Get talks by page
   * param: page (number)
   */
  static async getPaginated(page) {
    const queryLimit = 9;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const query = `{
        talkCollection(limit: ${queryLimit}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            title
            date
            watchTime
            slug
            excerpt
            transcript {
              json
            }
            speakerDeckLink {
              link
              title
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
            recording {
              embedUrl
              title
            }
            topicsCollection {
              items {
                sys {
                  id
                }
                slug
                name
              }
            }
          }
        }
      }`;

    const response = await this.callContentful(query);

    const { total } = response.data.blogPostCollection;
    const talks = response.data.talkCollection.items
      ? response.data.talkCollection.items
      : [];

    return { talks, total };
  }

  /*
   * Get all talks
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
   * Get talks summaries for talk index page
   * param: page (number)
   */
  static async getPaginatedSummaries(page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        talkCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            title
            date
            watchTime
            slug
            excerpt
            speakerDeckLink {
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
            topicsCollection {
              items {
                sys {
                  id
                }
                slug
                name
              }
            }
          }
        }
      }`;

    const response = await this.callContentful(query);

    const paginatedSummaries = response.data.talkCollection
      ? response.data.talkCollection
      : { total: 0, items: [] };

    return paginatedSummaries;
  }

  /*
   * Get talks by topic
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
   * Get talks by topic
   * param: page (number)
   * param: topicSlug (string)
   */
  static async getPaginatedByTopic(page, topicSlug) {
    const queryLimit = 5;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const query = `{
      topicCollection(where: { slug: "${topicSlug}" },  limit: 1) {
        items {
          linkedFrom {
            talkCollection(limit: ${queryLimit}, skip: ${skip}) {
              total
              items {
                sys {
                  id
                }
                slug
                title
                date
                excerpt
                watchTime
                topicsCollection {
                  items {
                    sys {
                      id  
                    }
                    name
                    slug
                  }
                }
                speakerDeckLink {
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
              }
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query);

    const results = response.data.topicCollection.items[0].linkedFrom
      .talkCollection
      ? response.data.topicCollection.items[0].linkedFrom.talkCollection
      : { total: 0, items: [] };

    return results;
  }
}
