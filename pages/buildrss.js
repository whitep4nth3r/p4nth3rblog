import ContentfulApi from "@utils/ContentfulApi";
import fs from "fs";
import { Config } from "@utils/Config";

export default function rss() {
  return null;
}

function buildRssItems(posts) {
  return posts
    .map((post) => {
      return `
        <item>
        <title>${post.title}</title>
        <description>${post.excerpt}</description>
        <author>whitep4nth3r</author>
        <link>https://${Config.site.domain}/blog/${post.slug}</link>
        <pubDate>${post.date}</pubDate>
        <guid>${post.sys.id}</guid>
        </item>
        `;
    })
    .join("");
}

export async function getStaticProps() {
  const blogPostSlugs = await ContentfulApi.getPostSlugs();

  const posts = await Promise.all(
    await blogPostSlugs.map(
      async (slug) => await ContentfulApi.getPostBySlug(slug),
    ),
  );

  const feedString = `<?xml version="1.0"?>
    <rss version="2.0">
    <channel>
      <title>${Config.site.title}</title>
      <link>https://${Config.site.domain}</link>
      <description>${Config.site.feedDescription}</description>
    </channel>
      ${buildRssItems(posts)}
    </rss>`;

  fs.writeFile("./public/feed.xml", feedString, function (err) {
    if (err) {
      console.log("Could not write to feed.xml");
    }
    console.log("feed.xml written to ./public!");
  });

  return {
    props: {
      feedString,
    },
  };
}
