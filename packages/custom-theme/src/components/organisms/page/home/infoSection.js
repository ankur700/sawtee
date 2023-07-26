import { Box } from "@chakra-ui/react";
import Chart from "../../../molecules/chart";
import Section from "../../../atoms/section";
import TwitterTimeline from "../../../atoms/twitterTimeline";
import GlassBox from "../../../atoms/glassBox";

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
        w={{ base: "100%", lg: "62%" }}
        p={{ base: "6", lg: "8" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH={"500px"}
      >
        <Chart />
      </Box>
      <GlassBox
        rounded="2xl"
        w={{ base: "100%", lg: "35%" }}
        m={{ base: "2", lg: "4" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TwitterTimeline height="700" width="100" handle="sawteenp" />
      </GlassBox>
    </Section>
  );
};

export default InfoSection;
