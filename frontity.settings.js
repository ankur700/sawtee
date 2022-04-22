const settings = {
  name: "sawtee-frontend",
  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "SAWTEE",
      description: "South Asia Watch on Trade, Economics and Environment",
    },
  },
  packages: [
    {
      name: "sawtee-theme",
      state: {
        theme: {
          menu: [
            ["Know Us", "/"],
            ["Our Work", "/category/nature/"],
            ["Publications", "/category/travel/"],
            ["Events", "/tag/japan/"],
          ],
          featured: {
            showOnList: true,
            showOnPost: true,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://sawtee.ankursingh.com.np",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
