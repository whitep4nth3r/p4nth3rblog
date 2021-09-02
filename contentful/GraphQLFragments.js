export default class GraphQLFragments {
  static blogPost() {
    return `
    ... on BlogPost {
      sys {
        id
      }
      date
      updatedDate
      title
      slug
      excerpt
      readingTime
      ${GraphQLFragments.featuredImage()}
      ${GraphQLFragments.topicsCollection()}
    }
  `;
  }

  static topicsCollection() {
    return `
      topicsCollection {
        items {
          sys {
            id  
          }
          name
          slug
        }
      }
    `;
  }

  static authorBasic() {
    return `
    author {
      name
      description
      image {
        url
      }
    }
    `;
  }

  static imageAsset() {
    return `
        sys {
          id
        }
        url
        title
        width
        height
        description
    `;
  }

  static authorFull() {
    return `
      author {
        name
        description
        twitchUsername
        twitterUsername
        gitHubUsername
        websiteUrl
        youtubeUrl
        image {
          ${GraphQLFragments.imageAsset()}
        }
      }
    `;
  }

  static linkedAssets() {
    return `
      assets {
        block {
          ${GraphQLFragments.imageAsset()}
        }
      }
    `;
  }

  static codeBlock() {
    return `
    ... on CodeBlock {
      description
      language
      code
    }
    `;
  }

  static tweetEmbed() {
    return `
    ... on TweetEmbed {
      tweetId
    }
    `;
  }

  static videoEmbed() {
    return `
    ... on VideoEmbed {
        title
        embedUrl
      }
    `;
  }

  static featuredImage() {
    return `
      featuredImage {
        ${GraphQLFragments.imageAsset()}
      }
    `;
  }
}
