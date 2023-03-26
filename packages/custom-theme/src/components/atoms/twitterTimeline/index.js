import { useColorModeValue, Box } from "@chakra-ui/react";
import React from "react";

const TwitterTimeline = ({ height, width, handle }) => {
  const link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  const theme = useColorModeValue("light", "dark");

  React.useEffect(() => {
    const wrapper = document.getElementById("twitter-wrapper");
    const srcipt = document.createElement("script");
    srcipt.setAttribute("src", "https://platform.twitter.com/widgets.js");

    const prevAnchor = document.getElementsByClassName("twitter-timeline")[0];

    if (prevAnchor) {
      prevAnchor.parentNode.removeChild(prevAnchor);
    }

    const anchor = document.createElement("a");
    anchor.setAttribute("href", link);
    anchor.setAttribute("class", "twitter-timeline");
    anchor.dataset.width = width;
    anchor.innerHTML = "Track SAWTEE on TWITTER";
    anchor.dataset.height = height;
    anchor.dataset.chrome = "noscrollbars noborders";
    anchor.dataset.theme = theme;
    wrapper.appendChild(anchor);
    anchor.appendChild(srcipt);
  }, [theme]);


  return <Box id="twitter-wrapper" textAlign={'center'} ></Box>;
};

export default TwitterTimeline;
