import ReactDOMServer from "react-dom/server";
import ContentfulApi from "@contentful/Api";
import fs from "fs";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import RichTextPageContent from "@components/RichTextPageContent";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getRichTextRenderOptions } from "@components/RichTextPageContent";
import { Config } from "@utils/Config";

export default function buildRss(props) {
  const { pageContent } = props;
  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.buildRss.url}
      />

      <ContentWrapper>
        <PageContentWrapper>
          <RichTextPageContent richTextBodyField={pageContent.body} />
        </PageContentWrapper>
      </ContentWrapper>
    </MainLayout>
  );
}

function buildTags(tags) {
  if (!tags) {
    return;
  }
  return tags
    .map((tag) => {
      return `<category>${tag}</category>`;
    })
    .join("");
}

function buildContent(postBody) {
  return `
  <content:encoded><![CDATA[ 
    ${ReactDOMServer.renderToString(
      documentToReactComponents(
        postBody.json,
        getRichTextRenderOptions(postBody.links, { renderNativeImg: true }),
      ),
    ).replace(/ data-reactroot=""/g, "")}
  ]]></content:encoded>`;
}

function buildRssItems(posts) {
  return posts
    .map((post) => {
      return `
        <item>
          <title>${post.title}</title>
          <description>${post.excerpt}</description>
          <author>${Config.site.email} (${Config.site.owner})</author>
          <link>https://${Config.site.domain}/blog/${post.slug}</link>
          <guid>https://${Config.site.domain}/blog/${post.slug}</guid>
          <pubDate>${post.date}</pubDate>
          ${buildTags(post.tags)}
          ${buildContent(post.body)}
        </item>
        `;
    })
    .join("");
}

export async function getStaticProps() {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.buildRss.slug,
  );

  const posts = await ContentfulApi.getAllBlogPosts();

  const feedString = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"
      xmlns:atom="http://www.w3.org/2005/Atom"
      xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <title>${Config.site.title}</title>
      <atom:link href="https://${
        Config.site.domain
      }/feed.xml" rel="self" type="application/rss+xml" />
      <link>https://${Config.site.domain}</link>
      <description>${Config.site.feedDescription}</description>
      ${buildRssItems(posts)}
    </channel>
    </rss>`;

  fs.writeFile("./public/feed.xml", feedString, function (err) {
    if (err) {
      console.log("Could not write to feed.xml");
    }
    console.log("feed.xml written to ./public!");
  });

  return {
    props: {
      pageContent,
      feedString,
    },
  };
}
