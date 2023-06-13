import { css } from "frontity";
import gutenbergStyles from "./style.js";
import gutenbergTheme from "./theme.js";

/**
 * Styles for Document Setup.
 *
 * See `1. Document Setup` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const documentSetup = (colors) => css`
  html {
    scroll-behavior: smooth;
  }

  html {
    --scrollbarBG: #cfd8dc;
    --thumbBG: #90a4ae;
  }

  body {
    box-sizing: border-box;
    background-color: #ffffff;
    color: #121212;
    font-family: var(--chakra-fonts-body);
    letter-spacing: -0.015em;
    line-height: 1.5;
    text-align: left;
    font-weight: normal;
  }

  body::-webkit-scrollbar {
    width: 11px;
  }

  body {
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }

  body::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG);
  }

  // .chakra-ui-light {
  //   background: ${colors.bodyBg.light};
  // }

  // .chakra-ui-dark {
  //   background: ${colors.bodyBg.dark};
  // }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    word-break: break-word;
    word-wrap: break-word;
  }

  #site-content {
    overflow: hidden;
  }

  .primary-link {
    color: rgb(8 126 164/1);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: #666;
  }

  .primary-link:hover,
  .primary-link:focus {
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgb(8 126 164/1);
  }

  .chakra-ui-dark .primary-link {
    color: rgb(20 158 202/1);
  }

  @media (hover: none) and (pointer: coarse) {
    .left-arrow,
    .right-arrow {
      display: none;
    }
  }
`;

const accessibilitySettings = css`
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  }
`;

/**
 * Global styles for the TwentyTwenty theme.
 *
 * @param colors - Object with color definitions,
 * @returns Serialized style.
 */
const globalStyle = (colors) =>
  css([
    documentSetup(colors),
    accessibilitySettings,

    gutenbergTheme,
    gutenbergStyles,
  ]);

export default globalStyle;
