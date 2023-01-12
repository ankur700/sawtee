import { Box, Link, Text, useColorModeValue } from "@chakra-ui/react";

const TwitterTimeline = ({ height, width, handle, ...rest }) => {
  let link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;
  return (
    <Box
      as={Link}
      className="twitter-timeline"
      data-lang="en"
      data-width={width}
      data-height={height}
      data-dnt="true"
      data-theme="light"
      data-tweet-limit="15"
      data-chrome="noborders"
      href={link}
      {...rest}
      overflow="scroll"
      rounded="2xl"
      p={3}
    >
      <Text as="p" textAlign={"center"}>
        {"Track SAWTEE on TWITTER"}
      </Text>
    </Box>
  );
};

export default TwitterTimeline;
