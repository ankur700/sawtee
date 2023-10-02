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

  :root {
    --scrollbarBG: #cfd8dc;
    --thumbBG: #90a4ae;
    --color-black: #000;
    --color-bg: #fff;
    --color-bg-reverse: var(--color-dark);
    --color-body-bg: var(--color-white);
    --color-dark: #262626;
    --color-darker: #1f1f1f;
    --color-dark-acc: #404040;
    --color-grey-darker: #595959;
    --color-grey-dark: #737373;
    --color-grey: grey;
    --color-grey-light: #8c8c8c;
    --color-grey-lighter: #a6a6a6;
    --color-light-acc: #bfbfbf;
    --color-light: #d9d9d9;
    --linkcolor: "#006181";
    --color-border: "#ebebeb";
    --color-text: var(--color-dark);
    --color-text-reverse: var(--color-light);
  }

  [data-theme="dark"] {
    --color-bg: var(--color-darker);
    --color-body-bg: var(--color-dark);
    --color-text:var(--color-light);
    --color-border: #333;
    --color-bg-reverse: #fff;
    --color-text-reverse: var(--color-dark);
   }

   html {
    scroll-behavior: smooth;
    word-break: break-word;

  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    box-sizing: border-box;
    background-color: var(--color-body-bg);
    color: var(--color-text);
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

  .primary-link {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: var(--linkcolor);
      color: var(--linkcolor);
    }
    }
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
  css([documentSetup(colors), accessibilitySettings]);

export default globalStyle;