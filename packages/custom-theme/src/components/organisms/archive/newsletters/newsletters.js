import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../../../organisms/archive/sidebar";
import Loading from "../../../atoms/loading";
import { formatCPTData } from "../../../helpers";
import NewsletterCard from "./newsletterCard";
import Pagination from "../../../organisms/archive/pagination";

const NewsletterArchive = ({
  state,
  postData,
  linkColor,
  categories,
  news,
  inFocus,
}) => {
  // const postData = state.source.get(state.router.link);

  if (!postData.isReady) return <Loading />;
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap={6}
      pos={"relative"}
    >
      <GridItem colSpan={3}>
        <VStack spacing={8}>
          {postData.isReady ? (
            postData.items.map((item) => {
              const post = formatCPTData(
                state,
                state.source[item.type][item.id],
                categories
              );
              return (
                <NewsletterCard
                  key={item.id}
                  post={post}
                  linkColor={linkColor}
                />
              );
            })
          ) : (
            <Loading />
          )}
        </VStack>
        <Pagination mt="56px" />
      </GridItem>

      <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
        <Sidebar
          posts={inFocus}
          news={news}
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

export default connect(NewsletterArchive);
