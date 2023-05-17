import {
  Box,
  Heading,
  Image,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Publication1 from "../../assets/publications-1-resized.jpg";
import Sidebar from "../../components/organisms/archive/sidebar";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import PublicationFilter from "./publicationFilter";
import PublicationSliders from "./publicationSliders";
import GlassBox from "../../components/atoms/glassBox";
import React, { useState, useEffect } from "react";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import { formatCPTData, formatPostData } from "../../components/helpers";
import Loading from "../../components/atoms/loading";
import SidebarWidget from "../../components/atoms/sidebarWidget.js";

const Publications = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;
  const newsData = state.source.get("/news");
  const publicationData = state.source.data["get-publications/"];
  const [publications, setPublications] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [publicationCategories, setPublicationCategories] = useState([]);

  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  const [pubArray, setPubArray] = useState([]);
  const [news, setNews] = React.useState([]);
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const show = useBreakpointValue([1, 2, 3]);
  const [checkedItems, setCheckedItems] = React.useState([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  useEffect(() => {
    if (publicationData.isReady) {
      publicationData.items.map((_, idx) => {
        const post = state.source.data["get-publications/"].items[idx];
        {
          post &&
            setPublications((prevValue) => [
              ...prevValue,
              formatCPTData(state, post, categories),
            ]);
        }
      });
    }
  }, [publicationData.isReady]);

  useEffect(() => {
    if (newsData.isReady) {
      newsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        setNews((prevValue) => [
          ...prevValue,
          formatPostData(state, post, categories),
        ]);
      });
    }
  }, [newsData]);

  useEffect(() => {
    setPublicationCategories([...categories.filter((cat) => cat.parent === 5)]);
    categories
      .filter((cat) => cat.parent === 5)
      .forEach((item) => {
        setPubArray((prev) => [
          ...prev,
          {
            id: item.id,
            name: item.name,
            link: item.link,
            slides: [],
          },
        ]);
      });
  }, [categories]);

  useEffect(() => {
    let array = [];
    publicationCategories.map((cat, idx) => {
      if (idx < 5) {
        array.push(true);
      } else {
        array.push(false);
      }
    });

    setCheckedItems(array);
  }, [publicationCategories]);

  // get publication categories and publication array for later manipulation

  // Get the slider Data with slides
  useEffect(() => {
    if (publications.length > 0 && pubArray.length > 0) {
      let array = [...pubArray];
      publications.forEach((publication) =>
        publication.categories.map((category) => {
          array.forEach((item) => {
            if (category.id === item.id) {
              item.slides.push({
                ...publication.featured_media,
                link: publication.acf.pub_link,
              });
            }
          });
        })
      );

      setSliderData([...array]);
    }
  }, [publications, pubArray]);

  console.log(publications);

  // Load the post, but only if the data is ready.
  if (!data.isReady) return <Loading />;
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
            as="h2"
            fontWeight="bold"
            color={"whiteAlpha.900"}
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
      {publicationCategories.length > 0 ? (
        <GlassBox
          as={Section}
          // bg={useColorModeValue("whiteAlpha.700", "gray.700")}
          mt={"6"}
          size={"lg"}
          px={{ base: "32px", md: "16px" }}
          py="6"
          display="flex"
          // pos={"sticky"}
          // top={"8rem"}
        >
          <PublicationFilter
            categories={publicationCategories}
            allChecked={allChecked}
            isIndeterminate={isIndeterminate}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
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
          color={contentColor}
        >
          <Grid
            templateColumns={{ base: "1fr", xl: "repeat(5, 1fr)" }}
            gap={6}
            pos={"relative"}
          >
            <GridItem colSpan={3} px={4}>
              <PublicationSliders
                linkColor={linkColor}
                sliderData={sliderData}
                show={show ? show : 3}
                checkedItems={checkedItems}
              />
            </GridItem>
            <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
              <Sidebar>
                <GlassBox py="4" px="8" rounded="2xl">
                  {/* <SawteeInMediaWidget news={news} linkColor={linkColor} /> */}
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
        </Box>
      }
    </LightPatternBox>
  );
};

export default connect(Publications);
