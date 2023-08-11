import { connect } from "frontity";
import { useEffect, Fragment } from "react";
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
  const publicationSliders = post.acf?.publication_slider;
  const tradeInsight = state.source.get("/publications/trade-insight/");
  const books = state.source.get("/publications/books/");
  const eventsData = state.source.get("/events/");
  const infocus = state.source.get("/in-focus/");
  const linkColor = state.theme.colors.linkColor;
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  useEffect(() => {
    actions.source.fetch("/events/");
    actions.source.fetch("/in-focus/");
  }, []);

  useEffect(() => {
    actions.source.fetch(
      `/publications/${publicationSliders[0].category_slug}/`
    );
    actions.source.fetch(
      `/publications/${publicationSliders[1].category_slug}/`
    );
  }, [publicationSliders]);

  /*

    ? Question
    TODO: Load webP image in About Section
  */

  return (
    <>
      <Box id="carousel-section" width="full">
        <FullWidthCarousel slides={slides} loop={true} />
      </Box>

      <AboutSection
        tradeInsight={tradeInsight}
        books={books}
        categories={categories}
        intro={introText}
        image={introImage.sizes.large}
        show={show}
      />

      <InfoSection />

      <BlogSection
        linkColor={linkColor}
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
  const itemBG = useColorModeValue("blackAlpha.200", "blackAlpha.300");
  return (
    <Box
      py={{ base: "6", md: "12", lg: "16" }}
      px={{ base: "10", md: "16", lg: "20" }}
      mx="auto"
    >
      <FancyTitle title={"In Focus"} />
      <Container maxW="7xl">
        <VStack overflow="hidden">
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
                  templateRows={{ base: "auto auto auto", md: "auto" }}
                  w="100%"
                  templateColumns={{ base: "1fr", md: "2fr 4fr 2fr" }}
                  p={{ base: 2, sm: 4 }}
                  alignItems="center"
                  _hover={{ bg: itemBG }}
                  rowGap={3}
                  m={0}
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
                      fontSize={{ base: "md", lg: "xl" }}
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
                      <Text
                        noOfLines={3}
                        pl="20px"
                        fontSize={{ base: "sm", lg: "md" }}
                      >
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
          <Link mt={6} href={"/in-focus"} w="50%">
            <ViewAllBtn text="Explore All " w="full" />
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};
