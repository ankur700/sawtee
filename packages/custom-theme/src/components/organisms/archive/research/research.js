import { useState, useEffect } from "react";
import { GridItem, Grid } from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../../../organisms/archive/sidebar";
import ResearchList from "./researchList";
import { formatCPTData } from "../../../helpers";
import NumberedPagination from "../../../atoms/NumberedPagination";

const Research = ({ state, news, inFocus, categories }) => {
  // Get the data of the current list.
  const postData = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;
  const [researches, setResearches] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);

  useEffect(() => {
    if (postData.isReady) {
      postData.items.map(({ type, id }, idx) => {
        const post = state.source[type][id];
        setResearches((prev) => [
          ...prev,
          formatCPTData(state, post, categories),
        ]);
      });
    }
  }, [postData]);

  useEffect(() => {
    let array = new Map();
    researches.forEach((research) => {
      research.tags.map((tag) => {
        array.set(`${tag.name}`, { id: tag.id, name: tag.name, posts: [] });
      });
    });
    if (array.size > 0) {
      return setTagsArray(Array.from(array.values()));
    }
  }, [researches]);

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap="10"
      pos={"relative"}
    >
      <GridItem colSpan={3} pb="56px">
        <ResearchList
          researches={researches}
          tags={tagsArray}
          linkColor={linkColor}
        />
        <NumberedPagination />
      </GridItem>
      <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
        <Sidebar
          posts={inFocus}
          // news={news}
          categories={categories}
          linkColor={linkColor}
          postsLink={inFocus.link}
          newsLink={news.link}
          showTwitterTimeline={false}
          showSubscriptionBox={true}
        />
      </GridItem>
    </Grid>
  );
};

export default connect(Research);
