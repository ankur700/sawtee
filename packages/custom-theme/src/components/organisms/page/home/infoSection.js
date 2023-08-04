import { Box, Stack } from "@chakra-ui/react";
import Chart from "../../../molecules/chart";
import TwitterTimeline from "../../../atoms/twitterTimeline";
import GlassBox from "../../../atoms/glassBox";

const InfoSection = () => {
  return (
    <Stack
      id="twitter-section"
      direction={{ base: "column", lg: "row" }}
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
    </Stack>
  );
};

export default InfoSection;
