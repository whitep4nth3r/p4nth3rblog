module.exports = {
  siteUrl: "https://whitep4nth3r.com",
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [{ userAgent: "*", disallow: "/api", disallow: "/404" }],
  },
  exclude: ["/api/*", "404", "/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://whitep4nth3r.com/server-sitemap.xml"],
  },
};
