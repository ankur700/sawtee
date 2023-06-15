import { useMemo, useState, useEffect } from "react";
import {
  Box,
  useColorModeValue,
  Image,
  Heading,
  Divider,
  Button,
  GridItem,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import Sidebar from "../../components/organisms/archive/sidebar";
import Loading from "../../components/atoms/loading";
import Publication1 from "../../assets/publications-1-resized.jpg";
import ResearchList from "./researchList";
import { useArchiveInfiniteScroll } from "@frontity/hooks";
import { formatCPTData } from "../../components/helpers";
import GlassBox from "../../components/atoms/glassBox";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import SidebarWidget from "../../components/atoms/sidebarWidget.js";

const Research = ({ state, categories }) => {
  // Get the data of the current list.
  const postData = state.source.get(state.router.link);
  console.log("🚀 ~ file: research.js:30 ~ Research ~ postData:", postData);
  const linkColor = state.theme.colors.linkColor;
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const [researches, setResearches] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [latestResearch, setLatestResearch] = useState([]);
  useEffect(() => {
    let array = [];
    if (postData.isReady) {
      postData.items.map(({ type, id }) => {
        const post = state.source[type][id];
        setResearches((prev) => [
          ...prev,
          formatCPTData(state, post, categories),
        ]);
        if (postData.page === 1) {
          setLatestResearch((prev) => [
            ...prev,
            formatCPTData(state, post, categories),
          ]);
        }
      });
    }
  }, [postData]);

  useEffect(() => {
    let array = [];
    researches.forEach(({ tags }, id) => {
      tags.map((tag) => {
        if (array.length <= 1) {
          array.push({ id: tag.id, name: tag.name, posts: [] });
        } else {
          if (array[id - 1].id !== tag.id) {
            array.push({ id: tag.id, name: tag.name, posts: [] });
          }
        }
      });
    });
    if (array.length > 0) {
      return setTagsArray([...array.sort((a, b) => b.id - a.id)]);
    }
  }, [researches.length]);

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;
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
      <Section
        pb="80px"
        size={size ? size : "lg"}
        px={"32px"}
        pt="50px"
        fontSize={["md", "lg", "xl"]}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
          gap="10"
          pos={"relative"}
        >
          <GridItem colSpan={3}>
            <ResearchList
              researches={researches}
              tags={tagsArray}
              linkColor={linkColor}
            />
          </GridItem>
          <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
            <Sidebar>
              <SidebarWidget
                array={latestResearch}
                title={"Latest Research Papers"}
                linkColor={linkColor}
                link={postData.link}
              />
              <GlassBox
                rounded="xl"
                height="max-content"
                display="flex"
                justifyContent="center"
                alignItems="center"
                id="twitter-wrapper"
              >
                <TwitterTimeline
                  handle="sawteenp"
                  width={"100%"}
                  height="500px"
                  maxH={"700px"}
                  rounded="xl"
                />
              </GlassBox>
              <GlassBox
                py="4"
                px="8"
                rounded="xl"
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
      </Section>
    </LightPatternBox>
  );
};

export default connect(Research);
