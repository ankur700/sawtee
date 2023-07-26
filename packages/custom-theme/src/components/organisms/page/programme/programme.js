import {
  Box,
  Grid,
  useColorModeValue,
  useBreakpointValue,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Section from "../../components/styles/section";
import Sidebar from "../../components/organisms/archive/sidebar";
import Loading from "../../components/atoms/loading";

import { useState, useEffect } from "react";
import { formatCPTData } from "../../components/helpers";
import NumberedPagination from "../../components/atoms/NumberedPagination";
import ProgrammeItem from "./programmeItem";

const Programmes = ({ postData, posts, categories, linkColor }) => {
  const newsData = state.source.get("/sawtee-in-media/");

  const [news, setNews] = useState([]);

  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  useEffect(() => {
    if (newsData.isReady) {
      newsData.items.forEach(({ type, id }) => {
        const post = state.source[type][id];
        setNews((prev) => [...prev, formatCPTData(state, post, categories)]);
      });
    }
  }, [newsData]);

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return <Loading />;

  return (
    <Box
      as={Section}
      pb="80px"
      size={size ? size : "full"}
      px={"32px"}
      pt="50px"
      fontSize={["md", "lg", "xl"]}
      color={contentColor}
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
        gap={6}
        pos={"relative"}
      >
        <GridItem colSpan={3}>
          <VStack spacing={12} w={{ base: "auto", md: "full" }} mb="56px">
            {postData.items.map(({ type, id }) => {
              const program = formatCPTData(
                state,
                state.source[type][id],
                categories
              );
              return (
                <ProgrammeItem
                  key={program.id}
                  program={program}
                  linkColor={linkColor}
                />
              );
            })}
          </VStack>
          <NumberedPagination />
        </GridItem>
        <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
          <Sidebar
            posts={posts}
            news={news}
            postType={"Programs"}
            linkColor={linkColor}
            postsLink={postData.link}
            newsLink={newsData.link}
            showTwitterTimeline={true}
            showSubscriptionBox={true}
          />
        </GridItem>
      </Grid>
      {/* <Pagination mt="56px" /> */}
    </Box>
  );
};

export default Programmes;
