import { useColorModeValue, Box, Link } from "@chakra-ui/react";
import React from "react";

const TwitterTimeline = ({ height, width, handle }) => {
  const link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  const theme = useColorModeValue("light", "dark");

  React.useEffect(() => {
    const wrapper = document.getElementById("twitter-wrapper");
    const srcipt = document.createElement("script");
    srcipt.setAttribute("src", "https://platform.twitter.com/widgets.js");

    const anchor = document.createElement("a");
    anchor.dataset.width = width;
    anchor.dataset.height = height;
    anchor.textContent = "Track SAWTEE on Twitter";
    anchor.setAttribute("class", "twitter-timeline");
    anchor.setAttribute("href", link);
    anchor.dataset.chrome = "noscrollbars noborders";
    anchor.dataset.theme = theme;
    wrapper.appendChild(anchor);
    anchor.appendChild(srcipt);
  }, []);

  React.useEffect(() => {
    const prevAnchor = document.getElementsByClassName("twitter-timeline")[0];
    const twitterEmbed = document.getElementsByClassName(".r-kemski")[0];


    if (prevAnchor) {
      prevAnchor.setAttribute("data-theme", theme);
    }

    if (twitterEmbed) {
      twitterEmbed.style.background = "transparent !important";
    }
  }, [theme]);

  return (
    <Box
      id="twitter-wrapper"
      padding={6}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      fontWeight={"semibold"}
      w="full"
    ></Box>
  );
};

export default TwitterTimeline;
