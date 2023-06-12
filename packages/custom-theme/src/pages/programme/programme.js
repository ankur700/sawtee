import {
  Box,
  Grid,
  useColorModeValue,
  Image,
  Heading,
  Divider,
  Button,
  useBreakpointValue,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import Sidebar from "../../components/organisms/archive/sidebar";
import Loading from "../../components/atoms/loading";
import Publication1 from "../../assets/publications-1-resized.jpg";
import GlassBox from "../../components/atoms/glassBox";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import React from "react";
import { formatCPTData } from "../../components/helpers";
import SidebarWidget from "../../components/atoms/sidebarWidget.js";
import NumberedPagination from "../../components/atoms/NumberedPagination";
import ProgrammeItem from "./programmeItem";

const Programmes = ({ state, actions, categories }) => {
  const postData = state.source.get(state.router.link);
  const [news, setNews] = React.useState([]);
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const linkColor = state.theme.colors.linkColor;
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  const newsData = state.source.get("/news");
  React.useEffect(() => {
    if (newsData.isReady) {
      newsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        setNews((prev) => [...prev, formatCPTData(state, post, categories)]);
      });
    }
  }, [newsData]);

  // Load the post, but only if the data is ready.
  // if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        <Box
          as="figure"
          mt={4}
          height="350px"
          _after={{
            display: "block",
            content: '""',
            width: "100%",
            height: "350px",
            background: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Box as={Image} boxSize="100%" objectFit="cover" src={Publication1} />
        </Box>

        <Box
          textAlign="center"
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"2xl"}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="capitalize"
          >
            {postData.type}
          </Heading>
        </Box>
      </Box>

      <Box
        as={Section}
        pb="80px"
        size={size ? size : "lg"}
        px={"32px"}
        pt="50px"
        fontSize={["md", "lg", "xl"]}
        color={contentColor}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
          gap={6}
          pos={"relative"}
        >
          <GridItem colSpan={3}>
            <VStack spacing={8} w={{ base: "auto", md: "full" }}>
              {postData.isReady ? (
                postData.items.map(({ type, id }) => {
                  const program = formatCPTData(
                    state,
                    state.source[type][id],
                    categories
                  );

                  return (
                    <ProgrammeItem
                      key={id}
                      program={program}
                      linkColor={linkColor}
                    />
                  );
                })
              ) : (
                <Loading />
              )}
            </VStack>
            <NumberedPagination />
          </GridItem>
          <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
            <Sidebar>
              <GlassBox py="4" px="8" rounded="2xl">
                <SidebarWidget
                  array={news}
                  title={"Sawtee in Media"}
                  linkColor={linkColor}
                />
              </GlassBox>
              <GlassBox
                rounded="2xl"
                height="max-content"
                display="flex"
                justifyContent="center"
                alignItems="center"
                id="twitter-wrapper"
              >
                <TwitterTimeline
                  handle="sawteenp"
                  width={"100%"}
                  height="700px"
                  maxH={"700px"}
                  rounded="xl"
                />
              </GlassBox>
              <GlassBox
                py="4"
                px="8"
                rounded="2xl"
                height="max-content"
                position={"sticky"}
                top={"8.5rem"}
              >
                <SubscriptionCard />
              </GlassBox>
            </Sidebar>
          </GridItem>
        </Grid>
        {/* <Pagination mt="56px" /> */}
      </Box>
    </LightPatternBox>
  );
};

export default connect(Programmes);
