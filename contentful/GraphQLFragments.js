export default class GraphQLFragments {
  static blogPostFull() {
    return `
    fragment BlogPostFullAsLink on Entry {
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
        ...TopicsCollectionOnBlogPost
        ...FeaturedImage
      }
    }
  `;
  }

  static topicsCollectionOnBlogPost() {
    return `
    fragment TopicsCollectionOnBlogPost on BlogPost {
      topicsCollection {
        items {
          sys {
            id
          }
          name
          slug
        }
      }
    }
    `;
  }


  static topicsCollectionOnTalk() {
    return `
    fragment TopicsCollectionOnTalk on Talk {
      topicsCollection {
        items {
          sys {
            id
          }
          name
          slug
        }
      }
    }
    `;
  }

  static authorBasic() {
    return `
    fragment AuthorBasic on BlogPost {
      author {
        name
        description
        image {
          url
        }
      }
    }
    `;
  }

  static authorFull() {
    return `
    fragment AuthorFull on BlogPost {
      author {
        name
        description
        twitchUsername
        twitterUsername
        gitHubUsername
        websiteUrl
        youtubeUrl
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
    `;
  }

  static assetsAsLinkOnBlogPost() {
    return `
    fragment AssetsAsLinkOnBlogPost on BlogPostBodyLinks {
      assets {
        block {
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
    `;
  }

  static assetsAsLinkOnPageContent() {
    return `
    fragment AssetsAsLinkOnPageContent on PageContentBodyLinks {
      assets {
        block {
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
    `;
  }

  static assetsAsLinkOnFaq() {
    return `
    fragment AssetsAsLinkOnFaq on FaqAnswerLinks {
      assets {
        block {
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
    `;
  }

  static codeBlockAsLink() {
    return `
    fragment CodeBlockAsLink on Entry {
      ... on CodeBlock {
        description
        language
        code
      }
    }
    `;
  }

  static tweetEmbedAsLink() {
    return `
    fragment TweetEmbedAsLink on Entry {
      ... on TweetEmbed {
        tweetId
      }
    }
    `;
  }

  static videoEmbedAsLink() {
    return `
    fragment VideoEmbedAsLink on Entry {
    ... on VideoEmbed {
        title
        embedUrl
      }
    }
    `;
  }

  static featuredImage() {
    return `
    fragment FeaturedImage on BlogPost {
      featuredImage {
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
    `;
  }
}
