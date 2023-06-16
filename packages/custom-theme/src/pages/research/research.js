import { useState, useEffect } from "react";
import {
  Box,
  useColorModeValue,
  Image,
  Heading,
  GridItem,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import Sidebar from "../../components/organisms/archive/sidebar";
import Publication1 from "../../assets/publications-1-resized.jpg";
import ResearchList from "./researchList";
import { formatCPTData } from "../../components/helpers";


const Research = ({ state, categories }) => {
  // Get the data of the current list.
  const postData = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const [researches, setResearches] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [latestResearch, setLatestResearch] = useState([]);
    const newsData = state.source.get("/sawtee-in-media/");
    const [news, setNews] = useState([]);
    useEffect(() => {
      if (postData.isReady) {
        postData.items.map(({ type, id }, idx) => {
          const post = state.source[type][id];
          setResearches((prev) => [
            ...prev,
            formatCPTData(state, post, categories),
          ]);
          if (postData.page === 1 && idx <= 2) {
            setLatestResearch((prev) => [
              ...prev,
              formatCPTData(state, post, categories),
            ]);
          }
        });
      }
    }, [postData]);

    useEffect(() => {
      if (newsData.isReady) {
        newsData.items.forEach(({ type, id }) => {
          const post = state.source[type][id];
          setNews((prev) => [...prev, formatCPTData(state, post, categories)]);
        });
      }
    }, [newsData]);

    useEffect(() => {
      let array = [];
      researches.forEach(({ tags }, id) => {
        tags.map((tag) => {
          if (array.length === 0) {
            array.push({ id: tag.id, name: tag.name, posts: [] });
          } else {
            array.map((item) => {
              if (item.id !== tag.id) {
                array.push({ id: tag.id, name: tag.name, posts: [] });
              }
            });
          }
        });
      });
      if (array.length > 0) {
        return setTagsArray([...array]);
      }
    }, [researches]);

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
            <Box
              as={Image}
              boxSize="100%"
              objectFit="cover"
              src={Publication1}
            />
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
          size={size ? size : "full"}
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
              <Sidebar
                posts={latestResearch}
                news={news}
                postType={"Researches"}
                linkColor={linkColor}
                postsLink={postData.link}
                newsLink={newsData.link}
                showTwitterTimeline={true}
                showSubscriptionBox={true}
              />
            </GridItem>
          </Grid>
          {/* <Pagination mt="56px" /> */}
        </Section>
      </LightPatternBox>
    );
};

export default connect(Research);
