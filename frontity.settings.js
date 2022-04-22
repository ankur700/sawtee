const settings = {
  name: "sawtee-frontend",
  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "SAWTEE",
      description: "South Asia Watch on Trade, Economics and Environment",
      year: "1997",
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
