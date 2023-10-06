import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  useBreakpointValue,
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
import Loading from "../atoms/loading";
import SidebarWidget from "../atoms/sidebarWidget";
import useCrossSiteTrackingCookies from "../hooks/useCrossSiteTrackingCookies";

const DefaultArchive = ({ state, news, infocus, categories }) => {
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
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);

  const isTrackingProtectionEnabled = useCrossSiteTrackingCookies();
  console.log(
    "🚀 ~ file: default-archive.js:46 ~ DefaultArchive ~ isTrackingProtectionEnabled:",
    isTrackingProtectionEnabled
  );

  if (!postData.isReady || postData.items.length === 0) {
    return <Loading />;
  }
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

        <Section padding={{ base: "24px", lg: "80px" }} size={size} mx="auto">
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
                <VStack spacing={12} mb="56px">
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
                  showTwitterTimeline={isTrackingProtectionEnabled === null ? false : !isTrackingProtectionEnabled}
                  showSubscriptionBox={true}
                />
                {news
                  ? news.items !== undefined && (
                      <SidebarWidget
                        array={news.items.slice(0, 5)}
                        title={news.route.split("/")[2].toLocaleUpperCase()}
                        link={news.link}
                        mt={12}
                      />
                    )
                  : null}
                {infocus
                  ? infocus.items !== undefined && (
                      <SidebarWidget
                        array={infocus.items.slice(0, 5)}
                        title={infocus.route.split("/")[2].toLocaleUpperCase()}
                        link={infocus.link}
                        position={"sticky"}
                        top={"8rem"}
                        mt={12}
                      />
                    )
                  : null}
              </GridItem>
            </Grid>
          )}
        </Section>
      </Box>
    </LightPatternBox>
  );
};

export default connect(DefaultArchive);
