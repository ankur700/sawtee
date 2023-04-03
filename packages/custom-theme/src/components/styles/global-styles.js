import { css } from "frontity";
// import gutenbergStyles from "./style.js";
// import gutenbergTheme from "./theme.js";

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

  html {
  --scrollbarBG: #CFD8DC;
  --thumbBG: #90A4AE;
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
  background-color: var(--thumbBG) ;
  border-radius: 6px;
  border: 3px solid var(--scrollbarBG);
}
  .chakra-ui-light {
    background: ${colors.bodyBg.light};
  }
  .chakra-ui-dark {
    background: ${colors.bodyBg.dark};
  }

  .chakra-ui-dark .twitter-timeline > .r-kemksi {
    background: rgba(0, 0, 0, 0.3) !important;
  }

  .twitter-timeline > iframe {
    border-radius: 10px;
  }




  body {
    box-sizing: border-box;
    color: #000;
    font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Source Sans Pro", sans-serif;
      Helvetica, sans-serif;
    letter-spacing: -0.015em;
    line-height: 1.5;
    text-align: left;
    font-weight: normal;

    button,
    span {
      font-family: "Open Sans", monospace;
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

  .primary-link {
    color: rgb(8 126 164/1);
    text-decoration: none;
  }

  .primary-link:hover,
  .primary-link:focus {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .chakra-ui-dark .primary-link {
    color: rgb(20 158 202/1);
  }

  // Carousel Styles

  .carousel-container {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.carousel-wrapper {
    display: flex;
    width: 100%;
    position: relative;
}

.carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.carousel-content {
    display: flex;
    // gap: 30px;
    transition: all 250ms linear;
    -ms-overflow-style: none;  /* hide scrollbar in IE and Edge */
    scrollbar-width: none;  /* hide scrollbar in Firefox */
}

/* hide scrollbar in webkit browser */
.carousel-content::-webkit-scrollbar, .carousel-content::-webkit-scrollbar {
    display: none;
}

.carousel-content > * {
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
}

@media (hover: none) and (pointer: coarse) {
    .left-arrow, .right-arrow {
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

// const elementBase = (colors) => css`
//   main {
//     display: block;
//   }

//   h1,
//   h2,
//   h3,
//   h4,
//   h5,
//   h6,
//   .faux-heading {
//     font-feature-settings: "lnum";
//     font-variant-numeric: lining-nums;
//     font-weight: 700;
//     letter-spacing: -0.0415625em;
//     line-height: 1.25;
//     margin: 3.5rem 0 2rem;
//     font-family: "Inter", sans-serif;
//   }

//   h1,
//   .heading-size-1 {
//     font-size: 3.6rem;
//     font-weight: 800;
//     line-height: 1.138888889;
//   }

//   h2,
//   .heading-size-2 {
//     font-size: 3.2rem;
//   }

//   h3,
//   .heading-size-3 {
//     font-size: 2.8rem;
//   }

//   h4,
//   .heading-size-4 {
//     font-size: 2.4rem;
//   }

//   h5,
//   .heading-size-5 {
//     font-size: 2.1rem;
//   }

//   h6,
//   .heading-size-6 {
//     font-size: 1.6rem;
//     letter-spacing: 0.03125em;
//     text-transform: uppercase;
//   }

//   p {
//     line-height: 1.5;
//     margin: 0 0 1em 0;
//   }

//   em,
//   i,
//   q,
//   dfn {
//     font-style: italic;
//   }

//   em em,
//   em i,
//   i em,
//   i i,
//   cite em,
//   cite i {
//     font-weight: bolder;
//   }

//   big {
//     font-size: 1.2em;
//   }

//   small {
//     font-size: 0.75em;
//   }

//   b,
//   strong {
//     font-weight: 700;
//   }

//   ins {
//     text-decoration: underline;
//   }

//   sub,
//   sup {
//     font-size: 75%;
//     line-height: 0;
//     position: relative;
//     vertical-align: baseline;
//   }

//   sup {
//     top: -0.5em;
//   }

//   sub {
//     bottom: -0.25em;
//   }

//   abbr,
//   acronym {
//     cursor: help;
//   }

//   address {
//     line-height: 1.5;
//     margin: 0 0 2rem 0;
//   }

//   hr {
//     border-style: solid;
//     border-width: 0.1rem 0 0 0;
//     border-color: ${colors.gray.light};
//     margin: 4rem 0;
//   }

//   // a {
//   //   color: ${colors.gray["900"]};
//   //   text-decoration: none;
//   //   text-underline-offset: 3px;
//   // }

//   // a:hover,
//   // a:focus {
//   //   text-decoration: underline;
//   // }
// `;

// const elementBase700 = css`
//   @media (min-width: 700px) {
//     h1,
//     .heading-size-1,
//     h2,
//     .heading-size-2,
//     h3,
//     .heading-size-3 {
//       margin: 6rem auto 3rem;
//     }

//     h4,
//     .heading-size-4,
//     h5,
//     .heading-size-5,
//     h6,
//     .heading-size-6 {
//       margin: 4.5rem auto 2.5rem;
//     }

//     h1,
//     .heading-size-1 {
//       font-size: 6.4rem;
//     }

//     h2,
//     .heading-size-2 {
//       font-size: 4.8rem;
//     }

//     h3,
//     .heading-size-3 {
//       font-size: 4rem;
//     }

//     h4,
//     .heading-size-4 {
//       font-size: 3.2rem;
//     }

//     h5,
//     .heading-size-5 {
//       font-size: 2.4rem;
//     }

//     h6,
//     .heading-size-6 {
//       font-size: 1.8rem;
//     }
//   }
// `;

// const elementBase1220 = css`
//   @media (min-width: 1220px) {
//     h1,
//     .heading-size-1 {
//       font-size: 8.4rem;
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
    accessibilitySettings,
    // elementBase(colors),
    // elementBase700,
    // elementBase1220,
    // gutenbergTheme,
    // gutenbergStyles,
    // shortcodesUltimateStyles,
  ]);

export default globalStyle;
