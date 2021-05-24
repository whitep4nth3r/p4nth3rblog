import { Config } from "@utils/Config";

export function slugifyString(string) {
  return string
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase();
}

const defaultOptions = {
  isPostList: false,
};

function processTopics(topics) {
  return topics.map((topic) => topic.name).join(",");
}

export function buildStructuredDataForBlogPost(post, options = defaultOptions) {
  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${Config.pageMeta.blogIndex.url}/${post.slug}`,
    },
    headline: post.title,
    image: options.isPostList
      ? [post.featuredImage.url]
      : post.body.links?.assets?.block?.map((asset) => asset.url),
    dateCreated: post.date,
    description: post.excerpt,
    keywords: processTopics(post.topicsCollection.items),
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.description,
      image: post.author.image.url,
    },
  });
}

export function capitalizeFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
