const SITE_URL = "https://whitep4nth3r.com";

export const Config = {
  site: {
    owner: "Salma Alam-Naylor | whitep4nth3r",
    title: "whitep4nth3r.com | Build stuff, learn things, love what you do",
    domain: "whitep4nth3r.com",
    email: "whitep4nth3r@gmail.com",
    feedDescription:
      "Live coding streamer, writer, speaker | whitep4nth3r.com | Build stuff, learn things, love what you do",
  },
  pageMeta: {
    openGraph: {
      twitterUser: "whitep4nth3r",
    },
    home: {
      url: SITE_URL,
      slug: "/",
    },
    dashboard: {
      url: `${SITE_URL}/dashboard`,
      slug: "/dashboard",
    },
    blogIndex: {
      url: `${SITE_URL}/blog`,
      slug: "/blog",
    },
    blogIndexPage: {
      slug: "/blog/page/[page]",
    },
    post: {
      slug: "/blog/[slug]",
    },
    buildRss: {
      url: `${SITE_URL}/buildrss`,
      slug: "/buildrss",
    },
    privacyPolicy: {
      url: `${SITE_URL}/privacy-policy`,
      slug: "/privacy-policy",
    },
    projects: {
      url: `${SITE_URL}/projects`,
      slug: "/projects",
    },
    uses: {
      url: `${SITE_URL}/uses`,
      slug: "/uses",
    },
    topics: {
      url: `${SITE_URL}/topics`,
      slug: "/topics",
    },
    faqs: {
      url: `${SITE_URL}/faqs`,
      slug: "/faqs",
    },
    notFound: {
      url: SITE_URL,
      slug: "/404",
    },
  },
  pagination: {
    pageSize: 6,
    recentPostsSize: 6,
  },
  menuLinks: [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "Blog",
      path: "/blog",
    },
    {
      displayName: "Projects",
      path: "/projects",
    },
    {
      displayName: "Uses",
      path: "/uses",
    },
    {
      displayName: "FAQs",
      path: "/faqs",
    },
    {
      displayName: "Dashboard",
      path: "/dashboard",
    },
  ],
};
