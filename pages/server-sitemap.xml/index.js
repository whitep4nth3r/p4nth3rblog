import { getServerSideSitemap } from "next-sitemap";
import ContentfulApi from "@contentful/Api";
import { Config } from "@utils/Config";

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const blogPostSlugs = await ContentfulApi.getAllPostSlugs();

  const blogPostFields = blogPostSlugs.map((slug) => {
    return {
      loc: `https://whitep4nth3r.com/blog/${slug}`,
      lastmod: new Date().toISOString(),
    };
  });

  const totalPosts = await ContentfulApi.getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  const blogIndexPageFields = [];

  for (let page = 2; page <= totalPages; page++) {
    blogIndexPageFields.push({
      loc: `https://whitep4nth3r.com/blog/page/${page}`,
      lastmod: new Date().toISOString(),
    });
  }

  const fields = blogPostFields.concat(blogIndexPageFields);
  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
