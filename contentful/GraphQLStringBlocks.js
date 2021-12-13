export default class GraphQLStringBlocks {
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
      ${GraphQLStringBlocks.featuredImage()}
      ${GraphQLStringBlocks.topicsCollection()}
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
          icon {
            description
            url
          }
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
        contentType
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
          ${GraphQLStringBlocks.imageAsset()}
        }
      }
    `;
  }

  static linkedAssets() {
    return `
      assets {
        block {
          ${GraphQLStringBlocks.imageAsset()}
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
        ${GraphQLStringBlocks.imageAsset()}
      }
    `;
  }
}
