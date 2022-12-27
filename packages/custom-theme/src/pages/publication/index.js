import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import React, { useState, useEffect } from "react";
import List from "../../components/organisms/archive";
import useScrollProgress from "../../components/hooks/useScrollProgress";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import PostProgressBar from "../../components/organisms/post/post-progressbar";
import { getPostData, formatPostData } from "../../components/helpers";
import { Publications } from "../../data";
import PublicationFilter from "./publicationFilter";
import Sidebar from "./sidebar";
import PublicationSliders from "./publicationSliders";
import { featuredEvents } from "../../data";
import Loading from "../../components/atoms/loading";
import {
  fetchCategories,
  fetchMedia,
  formatPostData,
} from "../../components/helpers";

const Publication = ({ state, actions, libraries }) => {
  const postData = getPostData(state);
  const posts = state.source.publications;
  // const [filteredCategory, setFilteredData] = useState([]);
  const linkColor = state.theme.colors.linkColor;

  const [categories, setCategories] = useState([]);
  const [pubCategories, setPubCategories] = useState([]);
  const [publications, setPublications] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    posts.forEach((post) => {
      setPublications([...publications, formatPostData(state, post)]);
    });

    const categoriesApi =
      "https://sawtee.ankursingh.com.np/wp-json/wp/v2/categories?per_page=20";

    fetchCategories(categoriesApi, setCategories);

    if (categories.lenght > 0) {
      setPubCategories(
        categories.filter((category) => (category.parent = 217))
      );
    }

    fetchMedia(89, setFeaturedImage);

    return () => controller.abort();
  }, []);

  console.log(posts, featuredImage, publications);

  // const filterCategory = (event, title) => {
  //   const newCategories = Array.from(new Set([...filteredData]));
  //   if (event.target.checked) {
  //     newCategories.push({ title: title });
  //     setFilteredData([...newCategories]);
  //   } else {
  //     setFilteredData(
  //       Array.from(newCategories.filter((item) => item.title !== title))
  //     );
  //   }
  // };

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.
  useEffect(() => {
    // setFilteredData(Publications);
    actions.source.fetch("/");
    List.preload();
  }, []);

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        {featuredImage != null && (
          <FeaturedMedia
            mt="0"
            id={featuredImage.id}
            _after={{
              display: "block",
              content: '""',
              width: "100%",
              height: "500px",
              background: "rgba(0,0,0,0.4)",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        )}
        <PostHeader
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          categories={categories}
          heading={"Publications"}
          isPage={postData.isPage}
          position="absolute"
          bottom="15%"
          left="15%"
        />
      </Box>

      <PublicationFilter data={pubCategories} linkColor={linkColor} />

      <Section
        bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        pb="80px"
        size="xl"
      >
        <Box
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="xl"
          pt="50px"
          fontSize={["md", "lg", "xl"]}
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          <SimpleGrid
            templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
            spacing="8"
            pos={"relative"}
          >
            {/* {!posts.length ? (
              <Loading />
            ) : (
              <PublicationSliders data={publications} />
            )} */}
            <Sidebar
              data={featuredEvents}
              title="Sawtee in Media"
              showSawteeInMedia={true}
              showTwitterTimeline={true}
              showSubscriptionCard={true}
            />
          </SimpleGrid>
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Publication);
