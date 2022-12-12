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
        w={{ base: "100%", lg: "60%" }}
        p={{ base: "6", lg: "8" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH={"500px"}
      >
        <Chart />
      </Box>
      <Box
        bg={useColorModeValue("whiteAlpha", "blackAlpha")}
        w={{ base: "100%", lg: "40%" }}
        p={{ base: "6", lg: "8" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir='column'
        id="twitter-wrapper"
      >
        <TwitterTimeline height="700px" width="100%" handle="sawteenp" />
      </Box>
    </Section>
  );
};

export default InfoSection;
