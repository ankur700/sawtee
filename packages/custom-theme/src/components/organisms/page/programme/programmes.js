import {
  Box,
  Grid,
  useColorModeValue,
  useBreakpointValue,
  GridItem,
  VStack,
  Image,
  Heading,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Section from "../../../styles/section";
import Sidebar from "../../archive/sidebar";
import Loading from "../../../atoms/loading";
import Publication1 from "../../../../assets/publications-1-resized.jpg";
import { formatCPTData } from "../../../helpers";
import NumberedPagination from "../../../atoms/NumberedPagination";
import ProgrammeItem from "./programmeItem";
import { LightPatternBox } from "../../../styles/pattern-box";

const Programmes = ({ state, categories, news, inFocus }) => {
  const postData = state.source.get(state.router.link);
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const size = useBreakpointValue(["sm", "md", "lg", "huge", "max"]);
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return <Loading />;

  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pos="relative">
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
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"2xl"}
            color={"whiteAlpha.900"}
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
        px={["32px", 16]}
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
                    linkColor={state.theme.colors.linkColor}
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
        {/* <Pagination mt="56px" /> */}
      </Box>
    </LightPatternBox>
  );
};

export default connect(Programmes);
