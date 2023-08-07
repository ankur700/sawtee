import {
  Box,
  Grid,
  useColorModeValue,
  Image,
  Heading,
  useBreakpointValue,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../../styles/pattern-box";
import Section from "../../../styles/section";
import Sidebar from "../../../organisms/archive/sidebar";
import Loading from "../../../atoms/loading";
import CoverImage from "../../../../assets/COVID-19-South-Asia-and-LDCs.jpeg";

import { formatCPTData } from "../../../helpers";
import CovidItemCard from "./covidItemCard";
import NumberedPagination from "../../../atoms/NumberedPagination";

const Covid = ({ state, categories, news, inFocus }) => {
  const data = state.source.get(state.router.link);
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const linkColor = state.theme.colors.linkColor;
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");

  // Load the post, but only if the data is ready.
  if (!data.isReady) return <Loading />;
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
          <Box as={Image} boxSize="100%" objectFit="cover" src={CoverImage} />
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
            {data.type}
          </Heading>
        </Box>
      </Box>

      <Box as={Section} pb="80px" size={size || "huge"} pt="50px">
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
          gap={6}
          pos={"relative"}
          w="full"
        >
          <GridItem colSpan={3} display="flex" w="full" flexDirection="column">
            {/* <VStack spacing={12} mb="56px"> */}
            <SimpleGrid columns={2} spacing={6} rowGap={12} mb="56px">
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
            </SimpleGrid>
            {/* </VStack> */}
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
      </Box>
    </LightPatternBox>
  );
};

export default connect(Covid);
