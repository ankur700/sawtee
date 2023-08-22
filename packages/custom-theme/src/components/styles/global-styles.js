import { css } from "frontity";

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

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    word-break: break-word;
    word-wrap: break-word;
  }

  body {
    box-sizing: border-box;
    background-color: var(--chakra-colors-blackAlpha.50);
    color: gray.800;
    font-family: var(--chakra-fonts-body);
    text-align: left;
    font-weight: normal;
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }

  body::-webkit-scrollbar {
    width: 11px;
  }

  body::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG);
  }

  .glassbox::-webkit-scrollbar {
    display: none;
  }

  .glassbox {
    -ms-overflow-styles: none;
    scrollbar-width: none;
  }

  .chakra-ui-dark {
    color: var(--chakra-colors-whiteAlpha-800);
    background-color: var(--chakra-colors-blackAlpha.800);
  }

  main {
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .faux-heading {
    font-feature-settings: "lnum";
    font-variant-numeric: lining-nums;
    font-weight: 700;
  }

  em,
  i,
  q,
  dfn {
    font-style: italic;
  }
  em em,
  em i,
  i em,
  i i,
  cite em,
  cite i {
    font-weight: bolder;
  }
  big {
    font-size: 1.2em;
  }
  small {
    font-size: 0.75em;
  }
  b,
  strong {
    font-weight: 700;
  }
  ins {
    text-decoration: underline;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sup {
    top: -0.5em;
  }
  sub {
    bottom: -0.25em;
  }
  abbr,
  acronym {
    cursor: help;
  }
  address {
    line-height: 1.5;
    margin: 0 0 2rem 0;
  }
  hr {
    border-style: solid;
    border-width: 0.1rem 0 0 0;
    border-color: ${colors.darkgray.light};
  }

  #site-content {
    overflow: hidden;
  }

  .footer-form {
    & .input-group {
      display: flex;
      flex-direction: column;

      & p {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      & .wpcf7-form-control-wrap {
        flex-grow: 1;
        width: 75%;
        & input[type="email"] {
          flex: 1 0 auto;
          width: 100%;
          border: 1px solid #999 !important;
          background-color: #eee;
          height: 40px;
          color: #000;
          border-radius: 10px;
          padding: 0 10px;
        }
      }
    }

    & input[type="submit"] {
      width: 100%;
      max-width: 25%;
      height: 40px;
      background-color: #000;
      color: #fff;
      border-radius: 10px;
      font-size: var(--chakra-fontSizes-sm);
    }

    /**
 * Even when I set some dimension-related styles on this
 * element but not on the input or button, they'll still
 * line up.
 */
    & .input-group-addon {
      background: #eee;
      border: 1px solid #ccc;
      padding: 0.5em 1em;
    }

    & .wpcf7-response-output {
      margin-top: 10px;
    }
  }

  @media (min-width: 420px) {
    & .cards {
      & .title {
        color: white !important;
        z-index: 1;
      }

      & .content {
        z-index: 1;
      }
      &:hover {
        transition: all 0.4s ease-in-out;
        & .title {
          background: hsl(194, 100%, 25%, 0.4);
        }
        & .content {
          color: rgb(0, 0, 0);
          background: hsl(0, 17%, 95%, 0.4);
          opacity: 1;
        }
      }
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .left-arrow,
    .right-arrow {
      display: none;
    }
  }
`;

// const accessibilitySettings = css`
//   @media (prefers-reduced-motion: reduce) {
//     * {
//       animation-duration: 0s !important;
//       transition-duration: 0s !important;
//     }
//   }
// `;

/**
 * Global styles for the TwentyTwenty theme.
 *
 * @param colors - Object with color definitions,
 * @returns Serialized style.
 */
const globalStyle = (colors) =>
  css([
    documentSetup(colors),
    // accessibilitySettings,
  ]);

export default globalStyle;