import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import Sidebar from "../../components/organisms/archive/sidebar";
import Loading from "../../components/atoms/loading";
import { fetcher, getPostData } from "../../components/helpers";
import ProgrammesList from "./programmesList";

const Programmes = ({ state, actions, libraries }) => {
  const postData = getPostData(state);
  const linkColor = state.theme.colors.linkColor;
  const categories = postData.acf.categories;

  const {
    data: programs,
    isLoading: loading_programs,
    isValidating,
  } = useSWR(`https://sawtee.ankursingh.com.np/wp-json/wp/v2/posts`, fetcher, {
    revalidateOnFocus: false,
  });

  const { data: news } = useSWR(
    `https://sawtee.ankursingh.com.np/wp-json/wp/v2/sawtee-in-media`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        {postData.featured_media != null && (
          <FeaturedMedia
            mt="0"
            id={postData.featured_media}
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
          // categories={categories}
          heading={postData.title.rendered}
          isPage={postData.isPage}
          position="absolute"
          bottom="15%"
          left="15%"
        />
      </Box>

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
            spacing="10"
            pos={"relative"}
          >
            {loading_programs || isValidating ? (
              <Loading />
            ) : (
              <ProgrammesList
                programs={programs}
                programCategories={categories}
              />
            )}
            <Sidebar
              data={news}
              title="Sawtee in Media"
              showSawteeInMedia={news ? true : false}
              showTwitterTimeline={false}
              showSubscriptionCard={true}
            />
          </SimpleGrid>
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Programmes);


