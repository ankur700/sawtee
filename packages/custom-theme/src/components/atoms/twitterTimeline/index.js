import { Link, Box, useColorModeValue } from "@chakra-ui/react";
import Title from "../../atoms/title";

const TwitterTimeline = ({ height, width, handle, ...rest }) => {
  let link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  return (
    <Link
      className="twitter-timeline"
      data-lang="en"
      data-width={width}
      data-height={height}
      data-dnt="true"
      data-theme={useColorModeValue("light", "dark")}
      data-tweet-limit="15"
      // data-chrome="noheader nofooter noborders"
      href={link}
      {...rest}
      overflow="scroll"
      m={4}
      p={8}
    >
      <Title text={"Track SAWTEE on TWITTER"} />
    </Link>
  );
};

export default TwitterTimeline;
