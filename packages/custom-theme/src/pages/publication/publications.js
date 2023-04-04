import {
  Box,
  Divider,
  Heading,
  Image,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Publication1 from "../../assets/publications-1.jpg";
import Loading from "../../components/atoms/loading";
import Sidebar from "../../components/organisms/archive/sidebar";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import PublicationFilter from "./publicationFilter";
import PublicationSliders from "./publicationSliders";
import { useArchiveInfiniteScroll } from "@frontity/hooks";
import GlassBox from "../../components/atoms/glassBox";
import React, { useState, useEffect } from "react";
import SawteeInMediaWidget from "../../components/atoms/sawteeInMediaWidget";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import { formatCPTData } from "../../components/helpers";

const Publications = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const newsData = state.source.get("/sawtee-in-media");
  const linkColor = state.theme.colors.linkColor;
  const { pages, isFetching, isLimit, isError, fetchNext } =
    useArchiveInfiniteScroll({ limit: 3 });

  const [news, setNews] = useState([]);
  const [publications, setPublications] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [publicationCategories, setPublicationCategories] = useState([]);
  let [pubArray, setPubArray] = useState([]);
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const show = useBreakpointValue([1, 2, 3]);

  useEffect(() => {
    actions.source.fetch("/sawtee-in-media");
  }, []);

  // get publications
  useEffect(() => {
    let array = [];
    if (data.isReady) {
      data.items.map((item) => {
        const post = state.source[item.type][item.id];
        array.push(formatCPTData(state, post, categories));
      });
    }
    if (array.length > 0) {
      setPublications([...array]);
    }
  }, [data]);

  // get news for sidebar
  useEffect(() => {
    let newsArray = [];
    if (newsData.isReady) {
      newsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        newsArray.push(formatCPTData(state, post, categories));
      });
    }

    if (newsArray.length > 0) {
      setNews([...newsArray]);
    }
  }, [newsData, categories]);


  // get publication categories and publication array for later manipulation
  useEffect(() => {
    let array = [];
    if (categories) {
      setPublicationCategories([
        ...categories.filter((cat) => cat.parent === 5),
      ]);
      categories
        .filter(
          (cat) =>
            cat.parent !== 0 &&
            Object.keys(state.source.category).includes(cat.id.toString())
        )
        .forEach((item) => {
          array.push({
            id: item.id,
            name: item.name,
            link: item.link,
            slides: [],
          });
        });
    }

    if (array.length > 0) {
      setPubArray([...array]);
    }
  }, [categories]);


// Get the slider Data with slides
  useEffect(() => {
    if (publications.length > 0 && pubArray.length > 0) {
      let array = [...pubArray];
      publications.forEach((publication) =>
        publication.categories.map((category) => {
          array.forEach((item) => {
            if (category.id === item.id && item.name !== "Publications") {
              item.slides.push({
                ...publication.featured_media,
                link: publication.link,
              });
            }
          });
        })
      );

      setSliderData([...array]);
    }
  }, [publications, pubArray]);


  // Load the post, but only if the data is ready.
  if (!data.isReady) return null;
  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
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
            as="h2"
            fontWeight="bold"
            color={"whiteAlpha.900"}
            size={"2xl"}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="uppercase"
          >
            {data.type}
          </Heading>
        </Box>
      </Box>
      {publicationCategories.length > 0 ? (
        <GlassBox
          as={Section}
          // bg={useColorModeValue("whiteAlpha.700", "gray.700")}
          mt={"6"}
          size={"lg"}
        >
          <PublicationFilter categories={publicationCategories} />
        </GlassBox>
      ) : null}

      {
        <Box
          as={Section}
          px={"32px"}
          w="full"
          size={size === undefined ? "lg" : size}
          pt="50px"
          pb={"80px"}
          fontSize={["md", "lg", "xl"]}
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          <Grid
            templateColumns={{ base: "1fr", xl: "repeat(5, 1fr)" }}
            gap={6}
            pos={"relative"}
          >
            <GridItem colSpan={3} px={4}>
              {pages &&
                pages.map(({ key, link, isLast, Wrapper }) => (
                  <Wrapper key={key}>
                    <PublicationSliders
                      link={link}
                      linkColor={linkColor}
                      sliderData={sliderData}
                      show={show ? show : 3}
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
                <GlassBox py="4" px="8" rounded="2xl">
                  <SawteeInMediaWidget news={news} linkColor={linkColor} />
                </GlassBox>
                {/* <GlassBox
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
              </GlassBox> */}
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
        </Box>
      }
    </LightPatternBox>
  );
};

export default connect(Publications);
