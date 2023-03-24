import { Link, useColorModeValue, useColorMode } from "@chakra-ui/react";
import React from "react";

const TwitterTimeline = ({ height, width, handle, theme, ...rest }) => {
  let link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  const { colorMode } = useColorMode();

  const currentTheme = React.useMemo(() => {
    if (colorMode) {
      return colorMode === "light" ? "light" : "dark";
    }
  }, [colorMode]);


  if (currentTheme === "light" || currentTheme === undefined) {
    console.log("displaying light version");
    return (
      <Link
        className={"twitter-timeline"}
        overflow="scroll"
        data-height={height}
        data-width={width}
        data-chrome="noscrollbars noborders"
        data-limit={5}
        data-theme={"light"}
        rounded="2xl"
        href={link}
        p={3}
        textAlign="center"
        color={useColorModeValue("gray.700", "whiteAlpha.900")}
        {...rest}
      >
        {"Track SAWTEE on TWITTER"}
      </Link>
    );
  } else {
    console.log("displaying dark version");
    return (
      <Link
        className={"twitter-timeline"}
        overflow="scroll"
        data-height={height}
        data-width={width}
        data-chrome="noscrollbars noborders"
        data-limit={5}
        data-theme={"dark"}
        rounded="2xl"
        href={link}
        p={3}
        textAlign="center"
        color={useColorModeValue("gray.700", "whiteAlpha.900")}
        {...rest}
      >
        {"Track SAWTEE on TWITTER"}
      </Link>
    );
  }
};

export default TwitterTimeline;
