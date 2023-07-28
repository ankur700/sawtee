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
    background-color: var(--chakra-colors-bodyBg-light);
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
    background-color: var(--chakra-colors-bodyBg-dark);
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
 * Styles for code elements.
 *
 * See `2. Element Base / Code` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const codeStyle = (colors) => css`
  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
    font-size: 0.9em;
    padding: 0.4rem 0.6rem;
  }
  code,
  kbd,
  samp {
    background: rgba(0, 0, 0, 0.075);
    border-radius: 0.2rem;
  }
  pre {
    border: 0.1rem solid ${colors.darkgray.light};
    line-height: 1.5;
    margin: 4rem 0;
    overflow: auto;
    padding: 3rem 2rem;
    text-align: left;
  }
  pre code {
    background: transparent;
    padding: 0;
  }
`;

/**
 * Styles for media elements.
 *
 * See `2. Element Base / Media` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const mediaStyle = (colors) => css`
  figure {
    display: block;
    margin: 0;
  }
  iframe {
    display: block;
    max-width: 100%;
  }
  video {
    display: block;
  }
  svg,
  img,
  embed,
  object {
    display: block;
    height: auto;
    max-width: 100%;
  }
  figcaption,
  .wp-caption-text {
    color: ${colors.darkgray.base};
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 1.5rem;
  }
  figcaption a,
  .wp-caption-text a {
    color: inherit;
  }
`;

/**
 * Styles for tables.
 *
 * See `2. Element Base / Tables` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const tableStyles = (colors) => css`
  table {
    border: 0.1rem solid ${colors.darkgray.light};
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    font-size: 1.6rem;
    margin: 4rem 0;
    max-width: 100%;
    overflow: hidden;
    width: 100%;
  }
  .alignleft > table {
    margin: 0;
  }
  .alignright > table {
    margin: 0;
  }
  th,
  td {
    border: 0.1rem solid ${colors.darkgray.light};
    line-height: 1.4;
    margin: 0;
    overflow: visible;
    padding: 0.5em;
  }
  caption {
    background: ${colors.darkgray.light};
    font-weight: 600;
    padding: 0.5em;
    text-align: center;
  }
  thead {
    vertical-align: bottom;
    white-space: nowrap;
  }
  th {
    font-weight: 700;
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
    codeStyle(colors),
    // mediaStyle(colors),
    tableStyles(colors),
  ]);

export default globalStyle;