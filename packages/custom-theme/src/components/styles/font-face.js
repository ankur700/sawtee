import { Global, css } from "frontity";
import SourceSansProRegular from "../../fonts/source-sans-pro/SourceSansPro-Regular.ttf";
import SourceSansProMedium from "../../fonts/source-sans-pro/SourceSansPro-Semibold.ttf";
import SourceSansProBold from "../../fonts/source-sans-pro/SourceSansPro-Bold.ttf";
import SourceSerifProRegular from "../../fonts/source-serif-pro/SourceSerifPro-Regular.ttf";
import SourceSerifProMedium from "../../fonts/source-serif-pro/SourceSerifPro-Semibold.ttf";
import SourceSerifProBold from "../../fonts/source-serif-pro/SourceSerifPro-Bold.ttf";

const FontFace = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 500;
          font-display: "swap";
          src: url(${SourceSansProRegular}) format("ttf");
        }

        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 600;
          font-display: "swap";
          src: url(${SourceSansProMedium}) format("ttf");
        }

        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 700;
          font-display: "swap";
          src: url(${SourceSansProBold}) format("ttf");
        }
        @font-face {
          font-family: "Source Serif Pro";
          font-style: normal;
          font-weight: 500;
          font-display: "swap";
          src: url(${SourceSerifProRegular}) format("ttf");
        }

        @font-face {
          font-family: "Source Serif Pro";
          font-style: normal;
          font-weight: 600;
          font-display: "swap";
          src: url(${SourceSerifProMedium}) format("ttf");
        }

        @font-face {
          font-family: "Source Serif Pro";
          font-style: normal;
          font-weight: 700;
          font-display: "swap";
          src: url(${SourceSerifProBold}) format("ttf");
        }
      `}
    />
  );
};

export default FontFace;
