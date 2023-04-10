import { useColorModeValue, Box, Link } from "@chakra-ui/react";
import React from "react";

const TwitterTimeline = ({ height, width, handle }) => {
  const link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  const theme = useColorModeValue("light", "dark");

  React.useEffect(() => {
    const wrapper = document.getElementById("twitter-wrapper");
    // const srcipt = document.createElement("script");
    // srcipt.setAttribute("src", "https://platform.twitter.com/widgets.js");

    const prevAnchor = document.getElementsByClassName("twitter-timeline")[0];

    if (prevAnchor) {
      prevAnchor.parentNode.removeChild(prevAnchor);
    }
    const anchor = document.createElement("a");
    anchor.dataset.width = width;
    anchor.dataset.height = height;
    anchor.setAttribute("class", "twitter-timeline");
    anchor.setAttribute("href", link);
    anchor.dataset.chrome = "noscrollbars noborders";
    anchor.dataset.theme = theme;
    wrapper.appendChild(anchor);
    // anchor.appendChild(srcipt);
  }, [theme]);

  const Anchor = React.useRef(null);

  return (
    <Box id="twitter-wrapper" textAlign={"center"}>
      <Link
        href={link}
        ref={Anchor}
        className="twitter-timeline"
        width={width}
        height={height}
        data-theme={theme}
        data-chrome="noscrollbars noborders"
      >
        Track SAWTEE on Twitter
      </Link>
    </Box>
  );
};

export default TwitterTimeline;
