import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  Image,
  Heading,
  Divider,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import Sidebar from "../../components/organisms/archive/sidebar";
import Loading from "../../components/atoms/loading";
import Publication1 from "../../assets/publications-1-resized.jpg";
import EventsList from "./eventsList";
import { useArchiveInfiniteScroll } from "@frontity/hooks";
import React, { useState, useEffect } from "react";
import GlassBox from "../../components/atoms/glassBox";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import SawteeInMediaWidget from "../../components/atoms/sawteeInMediaWidget";
import { formatCPTData } from "../../components/helpers";

const EventsArchive = ({ state, actions, categories }) => {
  // Get the data of the current list.
  const postData = state.source.get(state.router.link);
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const [news, setNews] = useState([]);
  const linkColor = state.theme.colors.linkColor;
  const { pages, isLimit, isFetching, isError, fetchNext } =
    useArchiveInfiniteScroll({ limit: 3 });
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  const newsData = state.source.get("/news");

  useEffect(() => {
    let newsArray = [];
    if (newsData.isReady) {
      newsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        newsArray.push(formatCPTData(state, post, categories));
      });
    }
    if (newsArray.length > 0) {
      setNews(newsArray);
    }
  }, [newsData]);

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;
  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pos="relative">
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
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"2xl"}
            color={"whiteAlpha.900"}
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
        px={"32px"}
        w="full"
        size={size === undefined ? "lg" : size}
        pt="50px"
        pb={"80px"}
        fontSize={["md", "lg", "xl"]}
        color={contentColor}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
          gap={6}
          pos={"relative"}
        >
          <GridItem colSpan={3} px={[6, 10]}>
            {pages.map(({ key, link, isLast, Wrapper }) => (
              <Wrapper key={key}>
                <EventsList
                  link={link}
                  linkColor={linkColor}
                  categories={categories}
                />
                {isLast && <Divider h="10px" mt="10" />}
                <Box w="full" mb="40px" textAlign={"center"}>
                  {isFetching && <Loading />}
                  {isLimit && (
                    <Button onClick={fetchNext}>Load Next Page</Button>
                  )}
                  {isError && (
                    <Button onClick={fetchNext}>
                      Something failed - Retry
                    </Button>
                  )}
                </Box>
              </Wrapper>
            ))}
          </GridItem>
          <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
            <Sidebar>
              <GlassBox py="4" px="8" rounded="2xl" height="max-content">
                <SawteeInMediaWidget news={news} linkColor={linkColor} />
              </GlassBox>
              <GlassBox
                rounded="2xl"
                height="max-content"
                display="flex"
                justifyContent="center"
                alignItems="center"
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
      </Section>
    </LightPatternBox>
  );
};

export default connect(EventsArchive);
