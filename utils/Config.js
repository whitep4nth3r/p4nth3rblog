export const Config = {
  site: {
    owner: "whitep4nth3r",
    title: "whitep4nth3r.com | Build stuff, learn things, love what you do",
    domain: "whitep4nth3r.com",
  },
  pageMeta: {
    home: {
      url: "https://whitep4nth3r.com",
      slug: "/",
    },
    blogIndex: {
      url: "https://whitep4nth3r.com/blog",
      slug: "/blog",
    },
    post: {
      slug: "/blog/[slug]",
    },
  },
  pagination: {
    pageSize: 6,
    recentPostsSize: 3,
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
  ],
};
