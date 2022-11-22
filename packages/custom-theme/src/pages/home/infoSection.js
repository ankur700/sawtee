import { Box, useColorModeValue } from "@chakra-ui/react";
import Chart from "../../components/molecules/chart/chart";
import Section from "../../components/atoms/section/section";
import TwitterTimeline from "../../components/atoms/twitterTimeline/twitterTimeline";

const InfoSection = () => {
  return (
    <Section
      width="full"
      id="twitter-section"
      display="flex"
      flexDir={{ base: "column", lg: "row" }}
      gap="2"
    >
      <Box
        id="chart-wrapper"
        bg={"transparent"}
        w={{ base: "100%", lg: "70%" }}
        p={{ base: "6", lg: "12" }}
      >
        <Chart />
      </Box>
      <Box
        bg={useColorModeValue("white", "gray.500")}
        w={{ base: "100%", lg: "30%" }}
        p="12"
        display={"flex"}
        id="twitter-wrapper"
      >
        {/* <Title>{"Track SAWTEE on TWITTER"}</Title> */}
        <TwitterTimeline height="700px" width="100%" handle="sawteenp" />
      </Box>
    </Section>
  );
};

export default InfoSection;
