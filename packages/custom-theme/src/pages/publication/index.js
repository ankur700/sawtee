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

const Publication = ({ state, actions, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const [checkedItems, setCheckedItems] = useState([]);

  const defaultCheckedItems = () => {
    let array = [];
    Publications.map((_, i) => {
      if (i <= 4) {
        array.push(true);
      } else {
        array.push(false);
      }
    });
    return array;
  };

  const allChecked = checkedItems.every(Boolean);

  const [filteredData, setFilteredData] = useState(() => {
    let array = [];
    Publications.map((publication, i) => {
      if (i <= 4) {
        array.push({ title: publication.title });
      }
    });
    return array;
  });

  const filterCategory = (event, title) => {
    const newCategories = [...filteredData];
    if (event.target.checked) {
      newCategories.push({ title: title });
      setFilteredData([...newCategories]);
    } else {
      setFilteredData(
        Array.from(newCategories.filter((item) => item.title !== title))
      );
    }
  };

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.
  useEffect(() => {
    setCheckedItems([...defaultCheckedItems()]);
    actions.source.fetch("/");
    List.preload();
  }, []);

  const [ref, scroll] = useScrollProgress();

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.900")}
      showPattern={state.theme.showBackgroundPattern}
      ref={ref}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        {post.featured_media != null && (
          <FeaturedMedia
            mt="0"
            id={post.featured_media.id}
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
          categories={post.categories}
          heading={post.title}
          author={post.author}
          date={post.publishDate}
          isPage={postData.isPage}
          position="absolute"
          bottom="15%"
          left="15%"
        />
      </Box>

      <PostProgressBar value={scroll} />

      <PublicationFilter
        data={Publications}
        filterCategory={filterCategory}
        allChecked={allChecked}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />

      <Section
        bg={useColorModeValue("whiteAlpha.800", "gray.800")}
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
            <PublicationSliders data={filteredData} />
            <Sidebar
              data={featuredEvents}
              title="Sawtee in Media"
              sim={true}
              twittertimeline={false}
              subscription={false}
            />
          </SimpleGrid>
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Publication);
