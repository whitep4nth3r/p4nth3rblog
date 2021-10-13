import ContentfulApi from "@contentful/Api";
import GraphQLFragments from "@contentful/GraphQLFragments";
import GitHub from "@utils/GitHub";

export default class ContentfulProjects extends ContentfulApi {
  /*
   * Get all project entries
   */
  static async getAll() {
    const query = `{
      projectCollection(order: [order_ASC]) {
        total
        items {
          sys {
            id
          }
          name
          description
          link
          linkText
          order
          gitHubRepoName
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
    }`;

    const response = await this.callContentful(query);

    const projectCollection = response.data.projectCollection.items
      ? response.data.projectCollection.items
      : [];

    const mergeProjectsWithGitHubData = async (_) => {
      const promises = projectCollection.map(async (project) => {
        return {
          ...project,
          gitHubStats: await GitHub.getRepoForksAndStars(
            project.gitHubRepoName,
          ),
        };
      });

      return await Promise.all(promises);
    };

    const fullData = await mergeProjectsWithGitHubData();

    return fullData;
  }
}
