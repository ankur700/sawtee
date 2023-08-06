import { connect } from "frontity";

import React, { useEffect, useState, Fragment } from "react";
import {
  Badge,
  useBreakpointValue,
  Container,
  Box,
  chakra,
  Flex,
  Stack,
  VStack,
  Grid,
  Divider,
  Link,
  useColorModeValue,
  Text,
  HStack,
} from "@chakra-ui/react";
import { formatCPTData, formatDate } from "../../../helpers";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { FancyTitle } from "../../../atoms/fancyTitle";
import FullWidthCarousel from "../../../molecules/fullWIdthCarousel";
import ViewAllBtn from "../../../atoms/ViewAllBtn";

const Home = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const introText = post.acf?.about_section_intro;
  const introImage = post.acf?.about_section_image;
  // const publicationSliders = post.acf?.publication_slider;
  const tradeInsight = state.source.get("/publications/trade-insight/");
  const books = state.source.get("/publications/books/");
  const eventsData = state.source.get("/featured-events/");
  const infocus = state.source.get("/in-focus/");
  const linkColor = state.theme.colors.linkColor;
  const [media, setMedia] = useState(null);
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  useEffect(() => {
    actions.source.fetch("/publications/trade-insight/");
    actions.source.fetch("/publications/books/");
    actions.source.fetch("/featured-events/");
    actions.source.fetch("/in-focus/");
  }, []);

  /*

    ? Question
    TODO: Load webP image in About Section
  */

  return (
    <>
      <Box id="carousel-section" width="full">
        <FullWidthCarousel slides={slides} loop={true} />
      </Box>
      {tradeInsight.isReady && books.isReady && (
        <AboutSection
          tradeInsight={tradeInsight}
          books={books}
          categories={categories}
          intro={introText}
          image={introImage.sizes.large}
          show={show}
        />
      )}
      {/* <InfoSection /> */}
      <BlogSection
        linkColor={linkColor}
        media={media}
        eventsData={eventsData}
        categories={categories}
      />
      {infocus.isReady && (
        <InFocusSection
          articles={infocus.items}
          state={state}
          categories={categories}
        />
      )}
    </>
  );
};

export default connect(Home);

const InFocusSection = ({ articles, state, categories }) => {
  const itemBG = useColorModeValue("gray.200", "gray.700");
  return (
    <Container maxW="8xl" p={{ base: 5, md: 10 }}>
      <FancyTitle title={"In Focus"} />

      <VStack overflow="hidden" spacing={3}>
        {articles.map((item, index) => {
          const article = formatCPTData(
            state,
            state.source[item.type][item.id],
            categories
          );
          return (
            <Fragment key={article.id}>
              {index === 0 && <Divider m={0} />}
              <Grid
                templateRows={{ base: "auto auto", md: "auto" }}
                w="100%"
                templateColumns={{ base: "unset", md: "2fr 4fr 2fr" }}
                p={{ base: 2, sm: 4 }}
                alignItems="center"
                _hover={{ bg: itemBG }}
              >
                <Flex
                  spacing={{ base: 0, sm: 3 }}
                  justifySelf="flex-start"
                  alignItems="start"
                  fontWeight="medium"
                  fontSize={{ base: "xs", sm: "sm" }}
                >
                  <Badge
                    variant="subtle"
                    colorScheme="primary"
                    fontSize={["sm", "md"]}
                    px="10px"
                  >
                    In Focus
                  </Badge>
                </Flex>

                <Box gridColumnEnd={{ base: "span 2", md: "unset" }}>
                  <chakra.h3
                    as={Link}
                    fontFamily={"heading"}
                    href={article.link}
                    isExternal
                    fontWeight="bold"
                    fontSize={["lg", "xl"]}
                  >
                    {article.title}
                  </chakra.h3>
                  <HStack pos="relative" mt="20px">
                    <Text
                      as="span"
                      w="5px"
                      h="full"
                      bg="primary.400"
                      rounded="lg"
                      pos={"absolute"}
                    />
                    <Text noOfLines={3} pl="20px">
                      {article.excerpt}
                    </Text>
                  </HStack>
                </Box>

                <Stack
                  spacing={2}
                  direction="row"
                  fontSize={{ base: "sm", sm: "md" }}
                  justifySelf="flex-end"
                  alignItems="start"
                >
                  <Text
                    fontWeight="medium"
                    fontSize="sm"
                    color={"gray.600"}
                    _dark={{
                      color: "gray.300",
                    }}
                  >
                    {formatDate(article.publishDate)}
                  </Text>
                </Stack>
              </Grid>
              <Divider m={0} />
            </Fragment>
          );
        })}
      </VStack>
      <Flex as="a" justify={"center"} mt="1rem" py="6" href={"/in-focus"}>
        <ViewAllBtn text="View All" w="50%" />
      </Flex>
    </Container>
  );
};
