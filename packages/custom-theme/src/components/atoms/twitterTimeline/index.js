import { Link, Text, useColorModeValue } from "@chakra-ui/react";
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
      data-chrome="noborders"
      href={link}
      {...rest}
      overflow="scroll"
      p={8}
    >
      <Text as="p" textAlign={"center"}>
        {"Track SAWTEE on TWITTER"}
      </Text>
    </Link>
  );
};

export default TwitterTimeline;
