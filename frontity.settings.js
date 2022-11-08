const settings = {
  name: "sawtee-frontend",
  state: {
    frontity: {
      url: "https://sawtee.ankursingh.com.np/",
      title: "SAWTEE",
      description: "South Asia Watch on Trade, Economics and Environment",
      year: "1997",
      logo: "/assets/logo-sawtee.webp",
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
                  submenu: [
                    {
                      name: "Covid 19",
                      href: "#",
                    },
                    {
                      name: "Economics and social reform, growth and poverty",
                      href: "#",
                    },
                    {
                      name: "Trade integration and supply-side constraints",
                      href: "#",
                    },
                    {
                      name: "Trade and climate change",
                      href: "#",
                    },
                    {
                      name: "Competition, regulation and competitiveness",
                      href: "#",
                    },
                    {
                      name: "Remittance and development",
                      href: "#",
                    },
                    {
                      name: "Financial resource management",
                      href: "#",
                    },
                    {
                      name: "Agriculture politics, biodiversity management and food security",
                      href: "#",
                    },
                  ],
                },
                {
                  name: "Programme",
                  href: "#",
                  submenu: [
                    {
                      name: "Completed Programmes",
                      href: "#",
                    },
                    {
                      name: "Ongoing Programmes",
                      href: "#",
                    },
                  ],
                },
                {
                  name: "Research",
                  href: "#",
                  submenu: [
                    {
                      name: "2000-2005",
                      href: "#",
                    },
                    {
                      name: "2005-2010",
                      href: "#",
                    },
                    {
                      name: "2010-2015",
                      href: "#",
                    },
                    {
                      name: "2015-2020",
                      href: "#",
                    },
                    {
                      name: "2020-2025",
                      href: "#",
                    },
                  ],
                },
              ],
            },
            {
              name: "Publications",
              href: "/publications/",
              submenu: [
                {
                  name: "Trade Insight",
                  href: "/publications/trade-insight",
                },
                {
                  name: "Discussion Papers",
                  href: "/publications/discussion-paper",
                },
                {
                  name: "Policy Brief",
                  href: "/publications/policy-brief",
                },
                {
                  name: "Briefing Paper",
                  href: "/publications/briefing-paper",
                },
                {
                  name: "Issue Paper",
                  href: "/publications/issue-paper",
                },
                {
                  name: "Working Paper",
                  href: "/publications/working-paper",
                },
                {
                  name: "Books",
                  href: "/publications/books",
                },
                {
                  name: "Others",
                  href: "/publications/others",
                },
                {
                  name: "Research Briefs",
                  href: "/publications/research-brief",
                },
                {
                  name: "Book Chapters",
                  href: "/publications/book-chapters",
                },
              ],
            },
            {
              name: "Events",
              href: "/events/",
            },
          ],
          colors: {
            gray: {
              50: "#e8f3ff",
              100: "#cfd8e3",
              200: "#b5bdcc",
              300: "#97a3b4",
              400: "#7b899d",
              500: "#626f84",
              600: "#4b5768",
              700: "#343e4b",
              800: "#1e2530",
              900: "#070c18",
            },
            primary: {
              50: "#e1f8ff",
              100: "#bee4f1",
              200: "#9ad1e5",
              300: "#74bed9",
              400: "#50acce",
              500: "#3892b4",
              600: "#29728d",
              700: "#1a5165",
              800: "#09313f",
              900: "#001219",
            },
            accent: {
              50: "#e3f7fb",
              100: "#cbdfe3",
              200: "#afc8ce",
              300: "#92b2ba",
              400: "#759ca5",
              500: "#5b838b",
              600: "#45666d",
              700: "#30494f",
              800: "#192d31",
              900: "#001115",
            },
            light: {
              50: "#f0f4f3",
              100: "#d9dcdb",
              200: "#bec6c3",
              300: "#a3b0ac",
              400: "#879a94",
              500: "#6d807a",
              600: "#55645f",
              700: "#3e4744",
              800: "#252b29",
              900: "#0b0f0d",
            },
            headerBg: "white",
            footerBg: "#006181",
            bodyBg: "gainsboro",
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
