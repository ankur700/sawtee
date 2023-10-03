import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { LightPatternBox } from "../styles/pattern-box";
import ArchiveHeader from "./archive-header";
import Section from "../styles/section";
import Pagination from "./pagination";
import { connect, decode } from "frontity";
import ArchiveItem from "./archive-item";
import ProgrammeItem from "./programe-item";
import CovidItem from "./covid-item";
import MediaItem from "./media-item";
import EventItem from "./event.item";
import Sidebar from "./sidebar";
import { formatPostData } from "../helpers";
import NumberedPagination from "../atoms/NumberedPagination";

const DefaultArchive = ({ state, news, inFocus }) => {
  const postData = state.source.get(state.router.link);
  const isProgram = postData.route.replace("/category", "") === "/programme/";
  const isEvent = postData.route.replace("/category", "") === "/events/";
  const isMedia =
    postData.route.replace("/category", "") === "/sawtee-in-media/";
  const isCovid = postData.route.replace("/category", "") === "/covid/";
  const isPost = !isEvent && !isProgram && !isMedia && !isCovid;
  const HeadingColor = useColorModeValue(
    "var(--color-dark)",
    "var(--color-light)"
  );
  const TextColor = useColorModeValue(
    "var(--color-dark-acc)",
    "var(--color-light-acc)"
  );
  return (
    <LightPatternBox showPattern={state.theme.showBackgroundPattern} pt="0">
      <Box as="section">
        {postData.isTaxonomy && (
          <ArchiveHeader
            showPattern={state.theme.showBackgroundPattern}
            taxonomy={postData.taxonomy}
            title={decode(state.source[postData.taxonomy][postData.id].name)}
            mb={isPost ? "-80px" : "0px"}
            pb={isPost ? "80px" : "0px"}
          />
        )}

        {postData.isAuthor && (
          <ArchiveHeader
            showPattern={state.theme.showBackgroundPattern}
            taxonomy="Posts By"
            title={decode(state.source.author[postData.id].name)}
          />
        )}

        <Section
          padding={{ base: "24px", lg: "40px" }}
          width={"full"}
          size="huge"
          mx="auto"
        >
          {isPost && (
            <>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
                {postData.items.map(({ type, id }) => {
                  const post = state.source[type][id];

                  return <ArchiveItem key={post.id} post={post} />;
                })}
              </SimpleGrid>
              <Pagination mt="56px" />
            </>
          )}
          {!isPost && (
            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
              gap={12}
              pos={"relative"}
            >
              <GridItem colSpan={{ base: 1, xl: 3 }}>
                <VStack spacing={12} w={"full"} mb="56px">
                  {postData.items.map(({ type, id }) => {
                    const post = formatPostData(state, state.source[type][id]);
                    if (isCovid) {
                      return (
                        <CovidItem
                          key={post.id}
                          post={post}
                          headingColor={HeadingColor}
                          textColor={TextColor}
                        />
                      );
                    } else if (isMedia) {
                      return (
                        <MediaItem
                          key={post.id}
                          post={post}
                          headingColor={HeadingColor}
                          textColor={TextColor}
                        />
                      );
                    } else if (isEvent) {
                      return (
                        <EventItem
                          key={post.id}
                          post={post}
                          headingColor={HeadingColor}
                          textColor={TextColor}
                        />
                      );
                    } else {
                      return (
                        <ProgrammeItem
                          key={post.id}
                          post={post}
                          headingColor={HeadingColor}
                          textColor={TextColor}
                        />
                      );
                    }
                  })}
                  <NumberedPagination />
                </VStack>
              </GridItem>
              <GridItem colSpan={{ base: 1, xl: 2 }}>
                <Sidebar
                  posts={inFocus}
                  news={news}
                  postsLink={inFocus.link}
                  newsLink={news.link}
                  showTwitterTimeline={true}
                  showSubscriptionBox={true}
                />
              </GridItem>
            </Grid>
          )}
        </Section>
      </Box>
    </LightPatternBox>
  );
};

export default connect(DefaultArchive);
