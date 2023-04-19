import { useArchiveInfiniteScroll } from "@frontity/hooks";
import { connect } from "frontity";
import React from "react";
import Loading from "../../components/atoms/loading";
import MediaList from "./mediaList";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Publication1 from "../../assets/publications-1-resized.jpg";
import {
  Box,
  Image,
  Heading,
  useColorModeValue,
  Divider,
  Button,
  useBreakpointValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Section from "../../components/styles/section";
import Sidebar from "../../components/organisms/archive/sidebar";
import GlassBox from "../../components/atoms/glassBox";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import { formatCPTData } from "../../components/helpers";
import SidebarWidget from "../../components/atoms/sidebarWidget.js";

const SawteeInMedia = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const programeData = state.source.get("/programme");
  const { pages, isLimit, isFetching, isError, fetchNext } =
    useArchiveInfiniteScroll({ limit: 3 });
  const linkColor = state.theme.colors.linkColor;
  const [news, setNews] = React.useState([]);
  const [programs, setPrograms] = React.useState([]);

  const sectionSize = useBreakpointValue(["sm", "md", "lg", "huge"]);

  React.useEffect(() => {
    let newsArray = [];
    let programesArray = [];
    if (data.isReady) {
      data.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        newsArray.push(formatCPTData(state, post, categories));
      });
    }

    if (programeData.isReady) {
      programeData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        programesArray.push(formatCPTData(state, post, categories));
      });
    }

    if (newsArray.length > 0) {
      setNews(newsArray);
    }

    if (programesArray.length > 0) {
      setPrograms(programesArray);
    }
  }, [data, programeData.isReady]);

  React.useEffect(() => {
    actions.source.fetch("/programme");
  }, []);

  if (!data.isReady) return null;
  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.700", "gray.700")}
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
            {data.type}
          </Heading>
        </Box>
      </Box>
      <Section
        // bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        pb="80px"
        size={sectionSize}
        px={{ base: "32px", md: "0" }}
        pt="50px"
        fontSize={["md", "lg", "xl"]}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
          gap="10"
          pos={"relative"}
        >
          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <Box>
              {pages.map(({ key, link, isLast, Wrapper }) => (
                <Wrapper key={key}>
                  <MediaList news={news} link={link} />
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
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <Sidebar>
              <GlassBox py="4" px="8" rounded="2xl" height="max-content">
                <SidebarWidget
                  array={programs}
                  title={"Programme"}
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
      </Section>
    </LightPatternBox>
  );
};

export default connect(SawteeInMedia);
