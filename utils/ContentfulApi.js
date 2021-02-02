export default class ContentfulApi {

  static async getBlogPosts() {
    return 'blog posts'
  }

  static async getSocialLinks() {
    console.log('HERE 1');
    const query = `
      {
        socialLinkCollection {
          items {
            name
            ariaLabel
            link
          }
        }
      }`

    return await this.callContentful(query);
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
      body: JSON.stringify({ query })
    }

    try {
      const data = await fetch(fetchUrl, fetchOptions).then(response => response.json())
      return data;
    } catch (error) {
      console.err('Oops!');
    }
  }
}