import { connect } from "frontity";
import {
  Text,
  Box,
  Skeleton,
  SimpleGrid,
  VStack,
  Image,
  Grid,
  GridItem,
  Link,
  Container,
  Badge,
  chakra,
  Flex,
  Stack,
  Divider,
  HStack,
  useBreakpointValue,
  useSafeLayoutEffect,
  useColorModeValue,
} from "@chakra-ui/react";
import { FullWidthCarousel, MultiItemCarousel } from "../atoms/carousels";
import {
  Title,
  Card,
  ImageCard,
  FancyTitle,
  ViewAllBtn,
  TwitterTimeline,
  GlassBox,
} from "../atoms";
import DemoChart from "../atoms/charts";
import CustomLink from "../atoms/link";
import { formatCPTData, formatDate } from "../helpers";

const Home = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const introText = post.acf?.about_section_intro;
  const introImage = post.acf?.about_section_image;
  const tradeInsight = state.source.get("/publications/trade-insight/");
  const books = state.source.get("/publications/books/");
  const eventsData = state.source.get("/events/");
  const infocus = state.source.get("/category/in-focus/");
  const linkColor = state.theme.colors.linkColor;
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  useSafeLayoutEffect(() => {
    actions.source.fetch("/events/");
    actions.source.fetch("/category/in-focus/");
  }, []);

  /*

    ? Question
    TODO: Load webP image in About Section
  */

  return (
    <>
      <CarouselSection slides={slides} />

      <AboutSection
        tradeInsight={tradeInsight}
        books={books}
        categories={categories}
        intro={introText}
        image={introImage.sizes.large}
        show={show}
        state={state}
      />

      <InfoSection />

      {eventsData.isReady && (
        <BlogSection
          state={state}
          linkColor={linkColor}
          eventsData={eventsData}
          categories={categories}
        />
      )}

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

const CarouselSection = ({ slides }) => {
  return (
    <Box id="carousel-section" width="full">
      <FullWidthCarousel slides={slides} loop={true} />
    </Box>
  );
};

const AboutSection = ({
  state,
  tradeInsight,
  books,
  categories,
  intro,
  image,
  show,
}) => {
  const ImageBorderColor = useColorModeValue("gray.900", "whiteAlpha.900");

  return (
    <Box width="full" overflow="hidden" id="about-section">
      <SimpleGrid columns={{ base: 1, lg: 2 }}>
        <Box
          w="full"
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          backgroundImage={`url(${image})`}
          backgroundColor="rgba(0,0,0,0.6)"
          backgroundBlendMode="multiply"
          backgroundSize="cover"
        >
          {intro && (
            <Text
              as="blockquote"
              fontSize={["xl", "2xl", "3xl"]}
              color={"whiteAlpha.800"}
              m="0"
              alignSelf={"center"}
              zIndex={10}
              px={{ base: "2rem", md: "4rem" }}
              margin={{ base: "1rem 20px", lg: "1rem auto" }}
              fontFamily="body"
              _before={{
                content: '"“"',
                marginLeft: "-1rem",
              }}
              _after={{
                content: '"”"',
              }}
            >
              {intro}
            </Text>
          )}
        </Box>

        <VStack
          rowGap={8}
          align="center"
          bg={"rgba(70,55,55, 0.85)"}
          bgBlendMode={"lighten"}
          _dark={{
            background: "rgba(70,55,55, 1)",
          }}
          p={6}
          overflow="hidden"
          w="full"
          minH="600px"
        >
          <Box px={6}>
            <Title
              py={["3", "6"]}
              text={"Trade Insight"}
              color="whiteAlpha.900"
            />

            {tradeInsight.isReady ? (
              <MultiItemCarousel show={show} gap={"30px"}>
                {tradeInsight.items.map(({ type, id }) => {
                  const slide = formatCPTData(
                    state,
                    state.source[type][id],
                    categories
                  );

                  return (
                    <CustomLink
                      key={slide.id}
                      title={slide.title}
                      maxHeight={"250px"}
                      link={slide.acf.pub_link}
                      pos={"relative"}
                      w={`calc(100% / ${show} - 30px )`}
                      _before={{
                        content: `''`,
                        position: "absolute",
                        top: 0,
                        left: "unset",
                        width: `100%`,
                        height: "auto",
                        borderRadius: "15px",
                        background: "rgba(0,0,0,0.3)",
                        backgroundBlendMode: "overlay",
                      }}
                      _hover={{
                        _before: {
                          background: "transparent",
                        },
                      }}
                    >
                      <Image
                        src={slide.featured_media.src}
                        srcSet={
                          slide.srcSet
                            ? slide.srcSet
                            : slide.featured_media.srcSet
                        }
                        alt={slide.title}
                        title={slide.title}
                        rounded="xl"
                        border={`1px solid`}
                        borderColor={ImageBorderColor}
                        objectFit="cover"
                        style={{ width: "160px", height: "auto" }}
                      />
                    </CustomLink>
                  );
                })}
              </MultiItemCarousel>
            ) : (
              <MultiItemCarousel>
                {[1, 2, 4, 5, 6].map((item) => {
                  return (
                    <MultiItemCarousel key={item}>
                      <Skeleton
                        h="auto"
                        w="160px"
                        rounded={"xl"}
                        bg={"rgba(255,255,255, 0.1)"}
                      ></Skeleton>
                    </MultiItemCarousel>
                  );
                })}
              </MultiItemCarousel>
            )}
          </Box>

          <Box px={6}>
            <Title py={["3", "6"]} text={"Books"} color="whiteAlpha.900" />
            {books.isReady ? (
              <MultiItemCarousel show={show} gap={"30px"}>
                {books.items.map(({ type, id }) => {
                  const slide = formatCPTData(
                    state,
                    state.source[type][id],
                    categories
                  );

                  return (
                    <CustomLink
                      key={slide.id}
                      title={slide.title}
                      maxHeight={"250px"}
                      link={slide.acf.pub_link}
                      pos={"relative"}
                      w={`calc(100% / ${show} - 30px )`}
                      _before={{
                        content: `''`,
                        position: "absolute",
                        top: 0,
                        left: "unset",
                        width: `100%`,
                        height: "auto",
                        borderRadius: "15px",
                        background: "rgba(0,0,0,0.3)",
                        backgroundBlendMode: "overlay",
                      }}
                      _hover={{
                        _before: {
                          background: "transparent",
                        },
                      }}
                    >
                      <Image
                        src={slide.featured_media.src}
                        srcSet={
                          slide.srcSet
                            ? slide.srcSet
                            : slide.featured_media.srcSet
                        }
                        alt={slide.title}
                        title={slide.title}
                        rounded="xl"
                        border={`1px solid`}
                        borderColor={ImageBorderColor}
                        objectFit="cover"
                        style={{ width: "160px", height: "auto" }}
                      />
                    </CustomLink>
                  );
                })}
              </MultiItemCarousel>
            ) : (
              <MultiItemCarousel>
                {[1, 2, 4, 5, 6].map((item) => {
                  return (
                    <MultiItemCarousel key={item}>
                      <Skeleton
                        h="auto"
                        w="160px"
                        rounded={"xl"}
                        bg={"rgba(255,255,255, 0.1)"}
                      ></Skeleton>
                    </MultiItemCarousel>
                  );
                })}
              </MultiItemCarousel>
            )}
          </Box>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

const BlogSection = ({ state, eventsData, linkColor, categories }) => {
  return (
    <Box
      maxW="full"
      display="flex"
      py={{ base: "6", md: "12", lg: "16" }}
      px={{ base: "10", md: "16", lg: "20" }}
      flexDir="column"
      id="blog-section"
    >
      <FancyTitle title={"Policy Outreach"} />
      <Container maxW="8xl">
        <VStack spacing={6}>
          <Grid
            className="band"
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            templateRows={"auto"}
            placeItems="center"
            gap={6}
          >
            {eventsData.isReady &&
              eventsData.items.length > 0 &&
              eventsData.items.slice(0, 6).map((item, i) => {
                const article = formatCPTData(
                  state,
                  state.source[item.type][item.id],
                  categories
                );

                if (i === 0) {
                  return (
                    <GridItem
                      key={article.id}
                      colSpan={{ base: "1", md: "2", lg: "4" }}
                      rowSpan={2}
                      // maxW="6xl"
                    >
                      <ImageCard
                        title={article.title}
                        categories={article.categories}
                        featured_media={{
                          alt: article.featured_media.alt,
                          src: article.featured_media.src,
                          srcSet: article.featured_media.srcSet,
                        }}
                        excerpt={article.excerpt}
                        target={article.link}
                        linkColor={linkColor}
                        date={article.publishDate}
                        imageHeight={"250px"}
                      />
                    </GridItem>
                  );
                } else {
                  return (
                    <GridItem
                      key={article.id}
                      colSpan={{ base: "1", md: "1", lg: "2" }}
                      rowSpan="auto"
                      // maxW="3xl"
                      // minH={"10rem"}
                    >
                      <Card
                        title={article.title}
                        categories={article.categories}
                        excerpt={article.excerpt}
                        target={article.link}
                        linkColor={linkColor}
                        date={article.publishDate}
                      />
                    </GridItem>
                  );
                }
              })}
          </Grid>
          <Link href={"/featured-events"} w="50%">
            <ViewAllBtn text="Explore All" w="full" mt={6} />
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};

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
        <VStack overflow="hidden" spacing={6}>
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

const InfoSection = () => {
  return (
    <Stack
      id="twitter-section"
      direction={{ base: "column", lg: "row" }}
      py={{ base: "6", md: "12", lg: "16" }}
      px={{ base: "10", md: "16", lg: "20" }}
      spacing={"10"}
    >
      <Box
        id="chart-wrapper"
        w={{ base: "100%", lg: "62%" }}
        p={{ base: "6", lg: "8" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH={"500px"}
      >
        <DemoChart />
      </Box>
      <GlassBox
        rounded="2xl"
        w={{ base: "100%", lg: "35%" }}
        m={{ base: "2", lg: "4" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TwitterTimeline
          maxH="700"
          height="500px"
          width="100"
          handle="sawteenp"
        />
      </GlassBox>
    </Stack>
  );
};
