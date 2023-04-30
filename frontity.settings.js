import image from "@frontity/html2react/processors/image";
import link from "@frontity/html2react/processors/link";
import iframe from "@frontity/html2react/processors/iframe";

const settings = {
  name: "sawtee-frontend",
  state: {
    frontity: {
      title: "SAWTEE",
      description: "South Asia Watch on Trade, Economics and Environment",
      year: "1997",
      logo: "/assets/webp/logo-sawtee.webp",
    },
  },
  packages: [
    "@aamodtgroup/frontity-contact-form-7",
    {
      name: "frontity-menu",
      state: {
        frontityMenu: {
          menuSlugs: ["primary", "footer"],
        },
      },
    },
    {
      name: "custom-theme",
      state: {
        theme: {
          logo: "https://sawtee.org/images/logo-sawtee.webp",
          // show background pattern
          showBackgroundPattern: false,
          // show social links
          showSocialLinks: true,
          socialLinks: [
            ["facebook", "https://www.instagram.com/sawteenp/"],
            ["twitter", "https://www.twitter.com/SAWTEENP/"],
            ["linkedin", "https://www.linkedin.com/sawteenp/"],
            ["youtube", "https://www.youtube.com/@sawteenp/"],
          ],
          menu: [
            {
              name: "Home",
              href: "/",
              submenu: null,
            },
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
              href: "/featured-events/",
            },
          ],
          colors: {
            darkgray: {
              base: "#6D6D6D",
              light: "#DCD7CA",
              lighter: "#F5EFE0",
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
            headerBg: "#e8f3ff",
            footerBg: "#006181",
            bodyBg: {
              light: "#fff",
              dark: "#343e4b",
            },
            linkColor: "rgba(8 ,126, 164, 1)",
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

          autoPreFetch: "all",
          fontSets: "us-ascii",
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://sawtee.org/backend/",
          homepage: "home",
          postsPage: "blog",
          params: {
            type: [
              "publications",
              "featured-events",
              "research",
              "programme",
              "newsletter",
              "sawtee-in-media",
            ],
            orderBy: "menu-order",
            order: "asc",
            per_page: "100",
          },
          postTypes: [
            {
              type: "featured-events",
              endpoint: "featured-events",
              archive: "/featured-events",
            },
            {
              type: "publications",
              endpoint: "publications",
              archive: "/publications",
            },
            {
              type: "sawtee-in-media",
              endpoint: "sawtee-in-media",
              archive: "/sawtee-in-media",
            },
            {
              type: "programme",
              endpoint: "programme",
              archive: "/programme",
            },
            {
              type: "newsletters",
              endpoint: "newsletters",
              archive: "/newsletters",
            },
            {
              type: "research",
              endpoint: "research",
              archive: "/research",
            },
          ],
        },
      },
    },

    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, link, iframe],
    },
  },
};

export default settings;
