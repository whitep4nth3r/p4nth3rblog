const dotenv = require("dotenv");
const fetch = require("node-fetch");

(async function () {
  dotenv.config();

  async function callContentful(query) {
    try {
      const data = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        },
      ).then((response) => response.json());
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }

  async function getPaginated(page) {
    const queryLimit = 100;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${queryLimit}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            title
            excerpt
            topicsCollection {
              items {
                name
              }
            }
            body {
              json
            }
          }
        }
      }`;

    const response = await callContentful(query);

    const { total } = response.data.blogPostCollection;
    const posts = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return { posts, total };
  }

  async function getAll() {
    let page = 1;
    let shouldQueryMorePosts = true;
    const returnPosts = [];

    while (shouldQueryMorePosts) {
      const response = await getPaginated(page);

      if (response.posts.length > 0) {
        returnPosts.push(...response.posts);
      }

      shouldQueryMorePosts = returnPosts.length < response.total;
      page++;
    }

    return returnPosts;
  }

  try {
    const posts = await getAll();
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
})();
