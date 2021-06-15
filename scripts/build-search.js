const dotenv = require("dotenv");
const fetch = require("node-fetch");
const algoliasearch = require("algoliasearch/lite");

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
            slug
            date
            readingTime
            topicsCollection {
              items {
                sys {
                  id
                }
                name
                slug
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

  function mergeBodyNodes(contentNodes) {
    const paragraphs = contentNodes.map((node) => {
      return node.content.map((innerNode) => {
        switch (innerNode.nodeType) {
          case "text":
            return innerNode.value.trim();
          case "list-item":
            return innerNode.content[0].content
              .map((innerInnerNode) => {
                switch (innerInnerNode.nodeType) {
                  case "text":
                    return innerInnerNode.value.trim();
                  case "hyperlink":
                    return `${innerInnerNode.content[0].value.trim()} (${
                      innerInnerNode.data.uri
                    })`;
                  default:
                    return "";
                }
              })
              .join(" ");
          case "hyperlink":
            return `${innerNode.content[0].value.trim()} (${
              innerNode.data.uri
            })`;
          default:
            return "";
        }
      });
    });

    const returnNodesAsString = paragraphs
      .filter((para) => para.length > 0)
      .join(" ");
    return returnNodesAsString;
  }

  function transformPostsToSearchObjects(posts) {
    const transformed = posts.map((post, index) => {
      if (index === 0) {
        return {
          objectID: post.sys.id,
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          topicsCollection: { items: post.topicsCollection.items },
          date: post.date,
          readingTime: post.readingTime,
          body: mergeBodyNodes(post.body.json.content),
        };
      }
    });

    return transformed;
  }

  try {
    const posts = await getAll();
    const transformed = transformPostsToSearchObjects(posts);

    if (posts.length > 0) {
      const client = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_ADMIN_KEY,
      );

      const index = client.initIndex("p4nth3rblog");
      await index.saveObjects(transformed).then(({ objectIDs }) => {
        console.log(
          `🎉 Sucessfully added ${transformed.length} records to Algolia search`,
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
})();
