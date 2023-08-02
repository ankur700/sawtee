import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { formatCPTData } from "../../../helpers";
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
  HStack,
  Grid,
  Icon,
  Divider,
  Link,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

const Home = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const eventsData = state.source.get("/featured-events/");
  const tradeInsight = state.source.get("/publications/trade-insight/");
  const books = state.source.get("/publications/books/");
  const infocus = state.source.get("/in-focus/");
  const [infocusList, setInfocusList] = useState([]);
  const linkColor = state.theme.colors.linkColor;
  const introText = post.acf?.about_section_intro;
  const introImage = post.acf?.about_section_image;
  const [eventsList, setEvetnsList] = useState([]);
  const [media, setMedia] = useState(null);
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  console.log(infocusList);

  useEffect(() => {
    eventsData.isReady &&
      eventsData.items.forEach((item, idx) => {
        const post = state.source[item.type][item.id];
        idx < 6 &&
          setEvetnsList((prev) => [
            ...prev,
            formatCPTData(state, post, categories),
          ]);
      });
  }, [eventsData]);

  useEffect(() => {
    if (eventsList.length > 0) {
      setMedia({
        alt: eventsList[0].featured_media.alt,
        src: eventsList[0].featured_media.src,
        srcSet: eventsList[0].featured_media.srcSet,
      });
    }
  }, [eventsList]);

  useEffect(() => {
    if (infocus.isReady) {
      infocus.items.map((item) => {
        const post = state.source[item.type][item.id];
        setInfocusList((prev) => [
          ...prev,
          formatCPTData(state, post, categories),
        ]);
      });
    }
  }, [infocus]);

  /*

    ? Question
    TODO: Load webP image in About Section
  */

  return (
    <>
      <CarouselSection data={slides} />
      <AboutSection
        intro={introText}
        image={introImage.sizes.medium_large}
        tradeInsight={tradeInsight}
        books={books}
        show={show}
        categories={categories}
      />
      <InfoSection />
      <BlogSection linkColor={linkColor} media={media} events={eventsList} />
      {infocus.isReady && <InFocusSection articles={infocusList} />}
      {/* <Newsletter /> */}
    </>
  );
};

export default connect(Home);

const InFocusSection = ({ articles }) => {
  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <Flex justify="left" mb={3}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          In Focus
        </chakra.h3>
      </Flex>
      <VStack
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        {articles.map((article, index) => {
          return (
            <Fragment key={article.id}>
              <Grid
                templateRows={{ base: "auto auto", md: "auto" }}
                w="100%"
                templateColumns={{ base: "unset", md: "2fr 4fr 2fr" }}
                p={{ base: 2, sm: 4 }}
                gap={3}
                alignItems="center"
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                <Flex
                  spacing={{ base: 0, sm: 3 }}
                  alignItems="center"
                  fontWeight="medium"
                  fontSize={{ base: "xs", sm: "sm" }}
                >
                  <Badge variant="subtle" colorScheme="green">
                    In Focus
                  </Badge>
                </Flex>

                <Box gridColumnEnd={{ base: "span 2", md: "unset" }}>
                  <chakra.h3
                    as={Link}
                    href={article.link}
                    isExternal
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {article.title}
                  </chakra.h3>
                </Box>

                <Stack
                  spacing={2}
                  direction="row"
                  fontSize={{ base: "sm", sm: "md" }}
                  justifySelf="flex-end"
                  alignItems="center"
                >
                  <Text
                    fontWeight="medium"
                    fontSize="sm"
                    color={useColorModeValue("gray.600", "gray.300")}
                  >
                    Published: {article.publishDate}
                  </Text>
                </Stack>
              </Grid>
              {articles.length - 1 !== index && <Divider m={0} />}
            </Fragment>
          );
        })}
      </VStack>
    </Container>
  );
};
