import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import processors from "./components/styles/processors";
import {
  GetAllCategoriesHandler,
  PublicationsHandler,
  MenuHandler,
  EventsHandler,
  PublicationSubcategoryHandler,
} from "./components/handlers";

const customTheme = {
  name: "custom-theme",
  roots: {
    theme: Theme,
  },
  state: {
    theme: {
      logo: "SAWTEE",
      showBackgroundPattern: true,
      showSocialLinks: true,
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
      autoPreFetch: "no",
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

      beforeSSR: async ({ actions }) => {
        await actions.source.fetch("/menu/primary/");
        await actions.source.fetch("/menu/footer/");
        await actions.source.fetch("get-all-categories");
        await actions.source.fetch("/subscription-page");
        await actions.source.fetch("/publications/trade-insight/");
        await actions.source.fetch("/publications/books/");
        await actions.source.fetch("get-publications-categories-posts");
      },
    },
  },
  libraries: {
    html2react: {
      processors: [image, ...processors],
    },
    source: {
      handlers: [
        GetAllCategoriesHandler,
        MenuHandler,
        PublicationsHandler,
        EventsHandler,
        PublicationSubcategoryHandler,
      ],
    },
  },
};

export default customTheme;
