import { Box, Stack } from "@chakra-ui/react";
import TwitterTimeline from "../../../atoms/twitterTimeline";
import GlassBox from "../../../atoms/glassBox";
import DemoChart from "../../../atoms/charts";

const InfoSection = () => {
  return (
    <Stack
      id="twitter-section"
      direction={{ base: "column", lg: "row" }}
      py={{ base: "6", md: "12", lg: "16" }}
      px={{ base: "10", md: "16", lg: "20" }}
      spacing={"10"}
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
        <DemoChart />
      </Box>
      <GlassBox
        rounded="2xl"
        w={{ base: "100%", lg: "35%" }}
        m={{ base: "2", lg: "4" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TwitterTimeline
          maxH="700"
          height="500px"
          width="100"
          handle="sawteenp"
        />
      </GlassBox>
    </Stack>
  );
};

export default InfoSection;
