export default class GitHub {
  static async getRepoForksAndStars(repoName) {
    const query = `{ 
      repository(name: "${repoName}", owner: "whitep4nth3r") {
        forkCount,
        stargazerCount
      }
    }`;

    const response = await this.callGitHub(query);

    return response.data.repository;
  }

  /*
   * Call the GitHub GraphQL Api
   * param: query (string)
   */
  static async callGitHub(query) {
    const fetchUrl = `https://api.github.com/graphql`;

    const accessToken = process.env.GITHUB_ACCESS_TOKEN;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    } catch (error) {
      throw new Error(error)
  }
}
