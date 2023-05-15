import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import processors from "./components/styles/processors";
import menuHandler from "./components/handlers/menu-handler";
import AllCategoriesHandler from "./components/handlers/all-categories-handler";
import CategoriesArchiveHandler from "./components/handlers/publication-archive-handler";
import EventsHandler from "./components/handlers/events-handler";
import PublicationsHandler from "./components/handlers/publications-handler";
import NewsHandler from "./components/handlers/news-handler";
// import { theme } from "@chakra-ui/react";

const customTheme = {
  name: "custom-theme",
  roots: {
    // In Frontity, any package can add React components to the site.
    // We use roots for that, scoped to the "theme" namespace.
    theme: Theme,
  },
  state: {
    // State is where the packages store their default settings and other
    // relevant state. It is scoped to the "theme" namespace.
    theme: {
      /**
       * The logo can be a text or an image url
       * logo : "Frontity"
       * logo: "https://uploads-ssl.webflow.com/5be00771820599586e6bd032/5be0223588110a6dbcac2d05_image.svg",
       */
      logo: "Frontity",
      showBackgroundPattern: true,
      showSocialLinks: true,
      /**
       * socialLinks: [
            ["pinterest", "https://www.pinterest.com/frontity/"],
            ["facebook", "https://www.instagram.com/frontity/"],
            ["twitter", "https://www.twitter.com/frontity/"]
          ],
       */
      socialLinks: [],
      menu: [],
      featured: {
        showOnArchive: false,
        showOnPost: true,
      },

      colors: {
        primary: {
          50: "#e9f5f2",
          100: "#d4dcd9",
          200: "#bbc3be",
          300: "#a1aba5",
          400: "#87938b",
          500: "#6d7972",
          600: "#555f58",
          700: "#323c34",
          800: "#232924",
          900: "#272727",
        },
        accent: {
          50: "#ede4d3",
          100: "#fbe3b2",
          200: "#f6d086",
          300: "#f1be58",
          400: "#eca419",
          500: "#d49212",
          600: "#a5710b",
          700: "#775105",
          800: "#483100",
          900: "#1d0f00",
        },
      },
      isSearchModalOpen: false,
      isMobileMenuOpen: false,
      autoPreFetch: "in-view",
      fontSet: "all",
    },
  },
  // Actions are functions that modify the state or deal with other parts of
  // Frontity like libraries.
  actions: {
    theme: {
      openMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = true;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      openSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = true;
      },
      closeSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = false;
      },

      beforeSSR: async ({ state, actions }) => {
        await actions.source.fetch("/events");
        await actions.source.fetch("/news");
        await actions.source.fetch("/sawtee-in-media");
        await actions.source.fetch("all-categories");
        await actions.source.fetch("/subscription-page");
        await actions.source.fetch("get-publications");

        // await actions.source.fetch("/category/(.*)?/:slug");

        // await actions.source.fetch(`/menu/${state.theme.menuUrl}/`);
      },
    },
  },
  libraries: {
    html2react: {
      // Add a processor to html2react so it processes the <img> tags
      // inside the content HTML. You can add your own processors too.
      processors: [image, ...processors],
    },
    source: {
      handlers: [
        AllCategoriesHandler,
        CategoriesArchiveHandler,
        EventsHandler,
        PublicationsHandler,
        NewsHandler,
      ],
    },
  },
};

export default customTheme;
