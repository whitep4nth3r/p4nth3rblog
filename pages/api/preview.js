import ContentfulApi from "@utils/ContentfulApi";

export default async function preview(req, res) {
  // https://nextjs.org/docs/advanced-features/preview-mode
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.CONTENTFUL_PREVIEW_SECRET ||
    !req.query.slug ||
    !req.query.contentType
  ) {
    return res.status(401).json({ message: "Invalid options" });
  }

  // Fetch the page/blog content by slug using preview API
  let preview = null;
  let redirectPrefix = "";

  switch (req.query.contentType) {
    case "blogPost":
      redirectPrefix = "/blog";
      preview = await ContentfulApi.getPostBySlug(req.query.slug, {
        preview: true,
      });
      break;
    case "pageContent":
      preview = await ContentfulApi.getPageContentBySlug(req.query.slug, {
        preview: true,
      });
      break;
    default:
      preview = null;
  }

  // Prevent preview mode from being enabled if the content doesn't exist
  if (!preview) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  /**
   * res.setPreviewData sets some cookies on the browser
   * which turns on the preview mode. Any requests to Next.js
   * containing these cookies will be considered as the preview
   * mode, and the behavior for statically generated pages
   * will change.
   */
  res.setPreviewData({});
  // ...

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`${redirectPrefix}${preview.slug}`);
}
