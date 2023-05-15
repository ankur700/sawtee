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
import SawteeInMediaWidget from "../../components/atoms/sawteeInMediaWidget";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import { formatCPTData, formatPostData } from "../../components/helpers";
import Loading from "../../components/atoms/loading";

const Publications = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;
  const newsData = state.source.get("/sawtee-in-media");
  // const [publications, setPublications] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [publicationCategories, setPublicationCategories] = useState([]);

  // let [pubArray, setPubArray] = useState([]);
  const [news, setNews] = React.useState([]);
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const show = useBreakpointValue([1, 2, 3]);
  const [checkedItems, setCheckedItems] = React.useState([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // useEffect(() => {
  //   if (data.isReady) {
  //     data.items.map((item) => {
  //       const post = state.source[item.type][item.id];
  //       {
  //         post &&
  //           setPublications((prevValue) => [
  //             ...prevValue,
  //             formatCPTData(state, post, categories),
  //           ]);
  //       }
  //     });
  //   }
  // }, [data]);

  // get publications
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
    if (categories) {
      setPublicationCategories([
        ...categories
          .filter((cat) => cat.parent === 5)
          .sort((a, b) => a.id - b.id),
      ]);
      categories
        .filter(
          (cat) =>
            cat.parent !== 0 &&
            Object.keys(state.source.category).includes(cat.id.toString())
        )
        .forEach((item) => {
          actions.source.fetch(`/category/publications/${item.slug}`);
        });
    }
  }, [categories]);

  useEffect(() => {
    let array = [];
    publicationCategories.map((cat, idx) => {
      const posts = state.source.get(cat.slug);
      console.log(
        "🚀 ~ file: publications.js:121 ~ publicationCategories.forEach ~ posts:",
        posts
      );

      posts.isReady &&
        setSliderData((prev) => [
          ...prev,
          {
            id: cat.id,
            name: cat.name,
            link: cat.link,
            slides: [...posts.items],
          },
        ]);
      if (idx < 5) {
        array.push(true);
      } else {
        array.push(false);
      }
    });

    setCheckedItems(array);
  }, [publicationCategories]);

  console.log(sliderData);

  // get publication categories and publication array for later manipulation

  // Get the slider Data with slides
  // useEffect(() => {
  //   if (publications.length > 0 && pubArray.length > 0) {
  //     let array = [...pubArray].sort((a, b) => a.id - b.id);
  //     publications.forEach((publication) =>
  //       publication.categories.map((category) => {
  //         array.forEach((item) => {
  //           if (category.id === item.id && item.name !== "Publications") {
  //             item.slides.push({
  //               ...publication.featured_media,
  //               link: publication.acf.pub_link,
  //             });
  //           }
  //         });
  //       })
  //     );

  //     setSliderData([...array]);
  //   }
  // }, [publications]);

  // Load the post, but only if the data is ready.
  if (!data.isReady) return <Loading />;
  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.700", "gray.700")}
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
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
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
                  <SawteeInMediaWidget news={news} linkColor={linkColor} />
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
