import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  Image,
  Heading,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../../styles/pattern-box";
import Section from "../../../styles/section";
import Sidebar from "../../../organisms/archive/sidebar";
import Publication1 from "../../../../assets/publications-1-resized.jpg";
import EventItem from "./eventItem";
import React, { useState, useEffect } from "react";

import { formatCPTData } from "../../../helpers";
import Loading from "../../../atoms/loading";
import NumberedPagination from "../../../atoms/NumberedPagination";

const EventsArchive = ({ state, actions, categories, news }) => {
  // Get the data of the current list.
  const postData = state.source.get(state.router.link);
  const size = useBreakpointValue(["sm", "md", "lg", "huge", "max"]);
  const [events, setEvents] = useState([]);
  const linkColor = state.theme.colors.linkColor;

  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const contentColor = useColorModeValue("#121212", "whiteAlpha.800");

  // useEffect(() => {
  //   if (postData.isReady && postData.page === 1) {
  //     postData.items.forEach(({ type, id }, idx) => {
  //       if (idx <= 2) {
  //         const post = state.source[type][id];
  //         setEvents((prev) => [
  //           ...prev,
  //           formatCPTData(state, post, categories),
  //         ]);
  //       }
  //     });
  //   }
  // }, [postData]);

  // useEffect(() => {
  //   if (news.isReady) {
  //     news.items.forEach(({ type, id }) => {
  //       const post = state.source[type][id];
  //       setNews((prev) => [...prev, formatCPTData(state, post, categories)]);
  //     });
  //   }
  // }, [news]);

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return <Loading />;
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
        px={{ base: "32px", md: 16 }}
        size={size}
        pt="50px"
        pb={"80px"}
        color={contentColor}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
          gap={6}
          pos={"relative"}
          w="full"
        >
          <GridItem
            colSpan={3}
            display="flex"
            p="2"
            flexDirection="column"
            align-items="center"
            w="95%"
            mx="auto"
          >
            <VStack spacing={20} mb="56px" w={"full"}>
              {postData.isReady ? (
                postData.items.map(({ type, id }) => {
                  const event = formatCPTData(
                    state,
                    state.source[type][id],
                    categories
                  );
                  return <EventItem key={event.id} event={event} />;
                })
              ) : (
                <Loading />
              )}
            </VStack>

            <NumberedPagination />
          </GridItem>
          <GridItem
            colSpan={2}
            display={"flex"}
            justifyContent={"center"}
            w="full"
          >
            <Sidebar
              posts={postData}
              news={news}
              postType={"Events"}
              categories={categories}
              linkColor={linkColor}
              postsLink={postData.link}
              newsLink={news.link}
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

export default connect(EventsArchive);