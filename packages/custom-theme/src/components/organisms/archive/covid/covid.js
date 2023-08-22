import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../../../organisms/archive/sidebar";
import Loading from "../../../atoms/loading";
import { formatCPTData } from "../../../helpers";
import CovidItemCard from "./covidItemCard";
import NumberedPagination from "../../../atoms/NumberedPagination";

const Covid = ({ state, data, linkColor, categories, news, inFocus }) => {
  // const data = state.source.get(state.router.link);

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap={6}
      pos={"relative"}
    >
      <GridItem colSpan={3}>
        <VStack spacing={12} mb="56px">
          {data.isReady ? (
            data.items.map(({ type, id }) => {
              const post = formatCPTData(
                state,
                state.source[type][id],
                categories
              );
              return <CovidItemCard key={post.id} post={post} />;
            })
          ) : (
            <Loading />
          )}
        </VStack>
        <NumberedPagination />
      </GridItem>
      <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
        <Sidebar
          posts={inFocus}
          news={news}
          linkColor={linkColor}
          postsLink={inFocus.link}
          newsLink={inFocus.link}
          showTwitterTimeline={true}
          showSubscriptionBox={true}
        />
      </GridItem>
    </Grid>
  );
};

export default connect(Covid);
