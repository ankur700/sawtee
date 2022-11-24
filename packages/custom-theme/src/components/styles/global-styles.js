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
    // font-size: 62.5%; /* 1rem = 10px */
    scroll-behavior: smooth;
  }
  .chakra-ui-light {
    background: ${colors.bodyBg.light};
  }
  .chakra-ui-dark {
    background: ${colors.bodyBg.dark};
  }

  body {
    box-sizing: border-box;
    color: #000;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Source Sans Pro",
      Helvetica, sans-serif;
    letter-spacing: -0.015em;
    text-align: left;

    button,
    span {
      font-family: "Source Sans Pro", monospace;
    }
  }

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
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const globalStyle = (colors) =>
  css([
    documentSetup(colors),
    accessibilitySettings,
    gutenbergTheme,
    gutenbergStyles,
    // shortcodesUltimateStyles,
  ]);

export default globalStyle;
