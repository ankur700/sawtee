import {
  Box,
  useColorModeValue,
  Image,
  Heading,
  Grid,
  GridItem,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../../styles/pattern-box";
import Section from "../../../styles/section";
import Sidebar from "../../../organisms/archive/sidebar";
import Loading from "../../../atoms/loading";
import Publication1 from "../../../../assets/publications-1-resized.jpg";
import { formatCPTData } from "../../../helpers";
import NewsletterCard from "./newsletterCard";
import Pagination from "../../../organisms/archive/pagination";

const NewsletterArchive = ({ state, categories, news, inFocus }) => {
  // Get the data of the current list.
  const postData = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return <Loading />;
  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
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
          color={"whiteAlpha.900"}
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"2xl"}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="capitalize"
          >
            {postData.type}
          </Heading>
        </Box>
      </Box>

      <Box
        as={Section}
        pb="80px"
        size={size || "full"}
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
              showTwitterTimeline={true}
              showSubscriptionBox={true}
            />
          </GridItem>
        </Grid>
      </Box>
    </LightPatternBox>
  );
};

export default connect(NewsletterArchive);
