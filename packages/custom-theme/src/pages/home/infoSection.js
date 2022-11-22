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
      h="auto"
    >
      <Box id="chart-wrapper" bg={"transparent"} w={["100%", "70%"]} p="12">
        <Chart />
      </Box>
      <Box
        bg={useColorModeValue("white", "gray.500")}
        w={"100%"}
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
