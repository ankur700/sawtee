import { Link, Text, useColorModeValue } from "@chakra-ui/react";
import Script from "@frontity/components/script";

const TwitterTimeline = ({ height, width, handle, ...rest }) => {
  let link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  <Script src="https://platform.twitter.com/widgets.js" />;

  return (
    <Link
      className="twitter-timeline"
      data-lang="en"
      data-width={width}
      data-height={height}
      data-dnt="true"
      data-theme={useColorModeValue("light", "dark")}
      data-tweet-limit="10"
      data-chrome="transparent noborders noscrollbar"
      href={link}
      {...rest}
      overflow="scroll"
      rounded="2xl"
      p={3}
    >
      <Text as="p" textAlign={"center"}>
        {"Track SAWTEE on TWITTER"}
      </Text>
    </Link>
  );
};

export default TwitterTimeline;
