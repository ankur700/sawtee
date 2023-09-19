import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../../archive/sidebar";
import { formatCPTData } from "../../../helpers";
import NumberedPagination from "../../../atoms/NumberedPagination";
import ProgrammeItem from "./programmeItem";

const Programmes = ({
  state,
  postData,
  linkColor,
  categories,
  news,
  inFocus,
}) => {
  // const postData = state.source.get(state.router.link);

  return (
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
          posts={inFocus}
          news={news}
          categories={categories}
          linkColor={state.theme.colors.linkColor}
          postsLink={inFocus.link}
          newsLink={news.link}
          showTwitterTimeline={true}
          showSubscriptionBox={true}
        />
      </GridItem>
    </Grid>
  );
};

export default connect(Programmes);
