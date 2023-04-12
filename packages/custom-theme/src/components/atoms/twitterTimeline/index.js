import { useColorModeValue, Box } from "@chakra-ui/react";
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { styled } from "frontity";

const TwitterTimeline = ({ height, width, handle }) => {
  const theme = useColorModeValue("light", "dark");

  const TwitterWrapper = styled(Box)`
    display: flex;
    justifycontent: center;
    alignitems: center;
    fontweight: bold;
    width: 100%;

    & div {
      width: 100%;
    }
  `;

  return (
    <TwitterWrapper id="twitter-wrapper" padding={6}>
      <TwitterTimelineEmbed
        sourceType="timeline"
        screenName={handle || "sawteenp"}
        theme={theme}
        tweetLimit={10}
        noBorders={true}
        noScrollbar={true}
        transparent={true}
        ariaPolite="assertive"
        placeholder="Track SAWTEE"
        options={{ height: height, width: `${width + "%"}` }}
      />
    </TwitterWrapper>
  );
};

export default TwitterTimeline;
