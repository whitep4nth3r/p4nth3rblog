export default async (_, res) => {
  const fetchOptions = {
    headers: {
      "api-key": process.env.DEVTO_API_KEY,
      "Content-Type": "application/json",
    },
  };

  async function getAllArticles() {
    let page = 1;
    let shouldQueryMore = true;
    const allArticles = [];

    while (shouldQueryMore) {
      const response = await fetch(
        `https://dev.to/api/articles/me?page=${page}`,
        fetchOptions,
      );

      const responseJson = await response.json();

      if (responseJson.length > 0) {
        allArticles.push(...responseJson);
      }

      shouldQueryMore = responseJson.length > 0;
      page++;
    }

    return allArticles;
  }

  async function getAllFollowers() {
    let page = 1;
    let shouldQueryMore = true;
    const allFollowers = [];

    while (shouldQueryMore) {
      const response = await fetch(
        `https://dev.to/api/followers/users?page=${page}`,
        fetchOptions,
      );

      const responseJson = await response.json();

      if (responseJson.length > 0) {
        allFollowers.push(...responseJson);
      }

      shouldQueryMore = responseJson.length > 0;
      page++;
    }

    return allFollowers;
  }

  const followers = await getAllFollowers();
  const articles = await getAllArticles();

  const views = articles.reduce((accumulator, article) => {
    return accumulator + parseInt(article["page_views_count"], 10);
  }, 0);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=60",
  );

  return res.status(200).json({
    followers: followers.length,
    views,
  });
};
