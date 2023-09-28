import image from "@frontity/html2react/processors/image";
import link from "@frontity/html2react/processors/link";
import iframe from "@frontity/html2react/processors/iframe";

const settings = {
  name: "sawtee-frontend",
  state: {
    frontity: {
      title: "SAWTEE",
      description: "South Asia Watch on Trade, Economics and Environment",
      year: "1994",
      logo: "/assets/logo-sawtee.webp",
    },
  },
  packages: [
    "@aamodtgroup/frontity-contact-form-7",
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
            ["facebook", "https://www.facebook.com/sawteenp/"],
            ["twitter", "https://www.twitter.com/SAWTEENP/"],
            ["linkedin", "https://www.linkedin.com/sawteenp/"],
            ["youtube", "https://www.youtube.com/@sawteenp/"],
          ],
          menu: [],
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
          redirections: ["404", "301"],
          homepage: "home",
          postsPage: "blog",
          params: {
            orderBy: "id",
            order: "desc",
            per_page: 10,
          },
          postTypes: [
            {
              type: "publications",
              endpoint: "publications",
              archive: "/publications",
            },
            {
              type: "newsletters",
              endpoint: "newsletters",
              archive: "/newsletters",
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
