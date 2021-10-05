module.exports = {
  siteUrl: "https://whitep4nth3r.com",
  generateRobotsTxt: true, // (optional)
  exclude: ["/api/*", "404", "/server-sitemap.xml"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", disallow: ["/api", "/404"] }],
    additionalSitemaps: ["https://whitep4nth3r.com/server-sitemap.xml"],
  },
};
