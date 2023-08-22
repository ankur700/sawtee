import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../../../organisms/archive/sidebar";
import EventItem from "./eventItem";

import { formatCPTData } from "../../../helpers";
import Loading from "../../../atoms/loading";
import NumberedPagination from "../../../atoms/NumberedPagination";

const EventsArchive = ({ postData, linkColor, categories, news, inFocus }) => {
  return (
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
      <GridItem colSpan={2} display={"flex"} justifyContent={"center"} w="full">
        <Sidebar
          posts={inFocus}
          news={news}
          categories={categories}
          linkColor={linkColor}
          postsLink={inFocus.link}
          newsLink={news.link}
          showTwitterTimeline={true}
          showSubscriptionBox={true}
        />
      </GridItem>
    </Grid>
  );
};

export default connect(EventsArchive);
