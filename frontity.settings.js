const settings = {
  name: "sawtee-frontend",
  state: {
    frontity: {
      url: "https://sawtee.ankursingh.com.np/",
      title: "SAWTEE",
      description: "South Asia Watch on Trade, Economics and Environment",
      year: "1997",
      logo: "/assets/logo_sawtee.jpg",
    },
  },
  packages: [
    {
      name: "sawtee-theme",
      state: {
        theme: {
          menu: [
            ["Know Us", "/about"],
            ["Our Work", "/our-work"],
            ["Publications", "/publications"],
            ["Events", "/events"],
          ],
          colors: {
            primary: "#006181",
            headerBg: "#D9DAE1",
            footerBg: "#ffffff",
            bodyBg: "#828990",
          },
          showSearchInHeader: true,
          showAllContentOnArchive: false,
          featuredMedia: {
            showOnArchive: true,
            showOnPost: true,
          },
          autoPreFetch: "hover",
          fontSets: "us-ascii",
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://sawtee.ankursingh.com.np/",
          homepage: "home",
          postsPage: "blog",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
