import { connect } from "frontity";
import { useEffect } from "react";
import MediaArticle from "./MediaArticle";
import { LightPatternBox } from "../../../styles/pattern-box";
import Publication1 from "../../../../assets/publications-1-resized.jpg";
import {
  Box,
  Image,
  Heading,
  useColorModeValue,
  useBreakpointValue,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import Section from "../../../styles/section";
import Sidebar from "../../../organisms/archive/sidebar";
import { formatCPTData } from "../../../helpers";
import NumberedPagination from "../../../atoms/NumberedPagination";

const SawteeInMedia = ({ state, actions, categories, inFocus }) => {
  const postData = state.source.get(state.router.link);
  const programeData = state.source.get("/programme/");
  const linkColor = state.theme.colors.linkColor;
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const sectionSize = useBreakpointValue(["sm", "md", "lg", "huge"]);

  useEffect(() => {
    actions.source.fetch("/programme/");
  }, []);

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
      <Section
        // bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        pb="80px"
        size={sectionSize || "full"}
        px={{ base: "32px", md: "0" }}
        pt="50px"
        fontSize={["md", "lg", "xl"]}
      >
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
              news={programeData}
              linkColor={linkColor}
              postsLink={inFocus.link}
              newsLink={programeData.link}
              showTwitterTimeline={true}
              showSubscriptionBox={true}
            />
          </GridItem>
        </Grid>
      </Section>
    </LightPatternBox>
  );
};

export default connect(SawteeInMedia);
