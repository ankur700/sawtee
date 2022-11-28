import { Box, useColorModeValue } from "@chakra-ui/react";
import Chart from "../../components/molecules/chart";
import Section from "../../components/atoms/section";
import TwitterTimeline from "../../components/atoms/twitterTimeline";

const InfoSection = () => {
  return (
    <Section
      width="full"
      id="twitter-section"
      display="flex"
      flexDir={{ base: "column", lg: "row" }}
    >
      <Box
        id="chart-wrapper"
        bg={useColorModeValue("rgba(0,0, 0, 0.1)", "rgba(0,0, 0, 0.3)")}
        w={{ base: "100%", lg: "60%" }}
        p={{ base: "6", lg: "8" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Chart /> */}
        <Box h="auto" w="100%" bg="white"></Box>
      </Box>
      <Box
        bg={useColorModeValue("rgba(0,0, 0, 0.1)", "rgba(0,0, 0, 0.3)")}
        w={{ base: "100%", lg: "40%" }}
        p={{ base: "6", lg: "8" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        id="twitter-wrapper"
      >
        {/* <Title>{"Track SAWTEE on TWITTER"}</Title> */}
        <TwitterTimeline height="700px" width="100%" handle="sawteenp" />
      </Box>
    </Section>
  );
};

export default InfoSection;
