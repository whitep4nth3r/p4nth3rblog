import { getServerSideSitemap } from "next-sitemap";
import ContentfulBlogPost from "@contentful/BlogPost";
import ContentfulTalk from "@contentful/Talk";
import { Config } from "@utils/Config";

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  // Single talks
  const talkSlugs = await ContentfulTalk.getAllSlugs();

  const talkFields = talkSlugs.map((slug) => {
    return {
      loc: `https://whitep4nth3r.com/talks/${slug}`,
      lastmod: new Date().toISOString(),
    };
  });

  // Talk indexes paginated
  const totalTalks = await ContentfulTalk.getTotal();
  const totalTalkPages = Math.ceil(totalTalks / Config.pagination.pageSize);

  const talkIndexPageFields = [];
  for (let page = 2; page <= totalTalkPages; page++) {
    talkIndexPageFields.push({
      loc: `https://whitep4nth3r.com/talks/page/${page}`,
      lastmod: new Date().toISOString(),
    });
  }

  // Single blog posts
  const blogPostSlugs = await ContentfulBlogPost.getAllSlugs();

  const blogPostFields = blogPostSlugs.map((slug) => {
    return {
      loc: `https://whitep4nth3r.com/blog/${slug}`,
      lastmod: new Date().toISOString(),
    };
  });

  // Blog indexes paginated
  const totalPosts = await ContentfulBlogPost.getTotal();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  const blogIndexPageFields = [];

  for (let page = 2; page <= totalPages; page++) {
    blogIndexPageFields.push({
      loc: `https://whitep4nth3r.com/blog/page/${page}`,
      lastmod: new Date().toISOString(),
    });
  }

  const allBlogFields = blogPostFields.concat(blogIndexPageFields);
  const allTalkFields = talkFields.concat(talkIndexPageFields);

  const allFields = allBlogFields.concat(allTalkFields);

  return getServerSideSitemap(ctx, allFields);
};

// Default export to prevent next.js errors
export default () => {};
