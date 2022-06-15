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
            {
              name: "Know Us",
              href: "/about/",
              submenu: [
                {
                  name: "Genesis",
                  href: "#Genesis",
                },
                {
                  name: "Registration and Recognition",
                  href: "#",
                },
                {
                  name: "Vision Goal and Objective",
                  href: "#",
                },
                {
                  name: "Strategies",
                  href: "#",
                },
                {
                  name: "Resources",
                  href: "#",
                },
                {
                  name: "Governance Structure",
                  href: "#",
                },
                {
                  name: "Member Institution",
                  href: "#",
                },
              ],
            },
            {
              name: "Our Work",
              href: "/our-work/",
              submenu: [
                {
                  name: "Themes",
                  href: "#",
                },
                {
                  name: "Programme",
                  href: "#",
                },
                {
                  name: "Research",
                  href: "#",
                },
              ],
            },
            {
              name: "Publications",
              href: "/publications/",
            },
            {
              name: "Events",
              href: "/events/",
            },
          ],
          colors: {
            primary: "#006181",
            headerBg: "#D9DAE1",
            footerBg: "#006181",
            bodyBg: "AliceBlue",
          },
          showSearchInHeader: true,
          // State for the menu on mobile
          isMobileMenuOpen: false,
          // State for the search modal on mobile
          isSearchModalOpen: false,
          // Whether to show all post content or only excerpt (summary) in archive view
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
