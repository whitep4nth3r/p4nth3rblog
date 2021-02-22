import ReactDOMServer from "react-dom/server";
import ContentfulApi from "@utils/ContentfulApi";
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
  return tags
    .map((tag) => {
      return `<category>${tag}</category>`;
    })
    .join("");
}

function buildContent(postBody) {
  return `
  <content type="html"><![CDATA[ 
    ${ReactDOMServer.renderToString(
      documentToReactComponents(
        postBody.json,
        getRichTextRenderOptions(postBody.links),
      ),
    ).replace(/ data-reactroot=""/g, "")}
  ]]></content>`;
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
      pageContent,
      feedString,
    },
  };
}
