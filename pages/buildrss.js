import ReactDOMServer from "react-dom/server";
import ContentfulPageContent from "@contentful/PageContent";
import ContentfulBlogPost from "@contentful/BlogPost";
import ContentfulTalk from "@contentful/Talk";
import fs from "fs";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import RichTextPageContent from "@components/RichTextPageContent";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getRichTextRenderOptions } from "@components/RichTextPageContent";
import { Config } from "@utils/Config";
import { sortItemsByDate } from "@utils/Date";

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

function buildCategories(topics) {
  if (!topics) {
    return;
  }
  return topics
    .map((topic) => {
      return `<category>${topic.name}</category>`;
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

function buildRssItems(items) {
  return items
    .map((item) => {
      const isTalk = item.speakerDeckLink;
      const urlSlug = isTalk ? "talks" : "blog";
      const contentBody = isTalk ? item.transcript : item.body;

      return `
        <item>
          <title>${item.title}</title>
          <description>${item.excerpt}</description>
          <author>${Config.site.email} (${Config.site.owner})</author>
          <link>https://${Config.site.domain}/${urlSlug}/${item.slug}</link>
          <guid>https://${Config.site.domain}/${urlSlug}/${item.slug}</guid>
          <pubDate>${item.date}</pubDate>
          ${buildCategories(item.topicsCollection.items)}
          ${buildContent(contentBody)}
        </item>
        `;
    })
    .join("");
}

export async function getStaticProps() {
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.buildRss.slug,
  );

  const posts = await ContentfulBlogPost.getAll();
  const talks = await ContentfulTalk.getAll();
  const allItems = posts.concat(talks);
  const sortedItems = allItems.sort(sortItemsByDate);

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
      ${buildRssItems(sortedItems)}
    </channel>
    </rss>`;

  fs.writeFile("./public/feed.xml", feedString, function (err) {
    if (err) {
      console.log(error);
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
