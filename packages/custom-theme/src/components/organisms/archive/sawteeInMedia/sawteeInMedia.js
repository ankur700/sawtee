import { connect } from "frontity";
import { useEffect } from "react";
import MediaArticle from "./MediaArticle";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import Sidebar from "../sidebar";
import { formatCPTData } from "../../../helpers";
import NumberedPagination from "../../../atoms/NumberedPagination";

const SawteeInMedia = ({ state, actions, categories, inFocus }) => {
  const postData = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;

  useEffect(() => {
    actions.source.fetch("/programme/");
  }, []);

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap="10"
      pos={"relative"}
    >
      <GridItem colSpan={{ base: 1, lg: 3 }} w="full">
        <VStack spacing={12} w={{ base: "auto", md: "full" }} mb="56px">
          {postData.isReady &&
            postData.items.map(({ type, id }) => {
              const newsItem = formatCPTData(
                state,
                state.source[type][id],
                categories
              );
              return (
                <MediaArticle
                  key={newsItem.id}
                  newsItem={newsItem}
                  linkColor={linkColor}
                />
              );
            })}
        </VStack>
        <NumberedPagination />
      </GridItem>
      <GridItem
        colSpan={{ base: 1, lg: 2 }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Sidebar
          posts={inFocus}
          // news={programeData}
          linkColor={linkColor}
          postsLink={inFocus.link}
          newsLink={programeData.link}
          showTwitterTimeline={true}
          showSubscriptionBox={true}
        />
      </GridItem>
    </Grid>
  );
};

export default connect(SawteeInMedia);
