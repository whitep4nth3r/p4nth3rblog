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

export function buildStructuredDataForBlogPost(post) {
  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${Config.pageMeta.blogIndex.url}/${post.slug}`,
    },
    headline: post.title,
    image: post.body
      ? post.body.links?.assets?.block?.map((asset) => asset.url)
      : [],
    dateCreated: post.date,
    description: post.excerpt,
    keywords: post.tags.join(","),
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.description,
      image: post.author.image.url,
    },
  });
}
