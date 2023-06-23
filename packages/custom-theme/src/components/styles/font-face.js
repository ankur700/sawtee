import React from "react";
import { Global, css, connect } from "frontity";
import NunitoBoldTTF from "../../fonts/nunito/Nunito-Bold.ttf";
import SourceSerifProRegular from "../../fonts/source-serif-pro/source-serif-pro/SourceSerifPro-Regular.ttf";
import SourceSerifProMedium from "../../fonts/source-serif-pro/source-serif-pro/SourceSerifPro-Semibold.ttf";
import SourceSerifProBold from "../../fonts/source-serif-pro/source-serif-pro/SourceSerifPro-Bold.ttf";

const FontFace = ({ state }) => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Nunito";
          src: url(${NunitoBoldTTF}) format("ttf");
          font-weight: 700;
          font-display: swap;
        }
        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 500;
          font-display: "swap";
          src: url(${SourceSerifProRegular}) format("woff2");
        }

        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 600;
          font-display: "swap";
          src: url(${SourceSerifProMedium}) format("woff2");
        }

        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 700;
          font-display: "swap";
          src: url(${SourceSerifProBold}) format("woff2");
        }
      `}
    />
  );
};

export default connect(FontFace);
