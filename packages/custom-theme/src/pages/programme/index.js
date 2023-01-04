import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import { getPostData } from "../../components/helpers";
import Sidebar from "./sidebar";
import { featuredEvents } from "../../data";
import Loading from "../../components/atoms/loading";
import useSWR from "swr";
import { fetcher, formatPostData } from "../../components/helpers";
import Link from "@frontity/components/link";

const Programmes = ({ state, actions, libraries }) => {
  const postData = getPostData(state);
  const linkColor = state.theme.colors.linkColor;
  const [programmes, setProgrammes] = useState([]);

  const { data: prog } = useSWR(
    () => `https://sawtee.ankursingh.com.np/wp-json/wp/v2/posts` + 219,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (prog) {
      let array = [];
      prog.forEach((item) => array.push(formatPostData(state, item)));
      if (array.length > 0) {
        setProgrammes([...array]);
      }
    }
  }, []);

  console.log(prog, programmes);

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        {postData.featured_media != null && (
          <FeaturedMedia
            mt="0"
            id={postData.featured_media}
            _after={{
              display: "block",
              content: '""',
              width: "100%",
              height: "500px",
              background: "rgba(0,0,0,0.4)",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        )}
        <PostHeader
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          categories={programmes[0].categories}
          heading={postData.title.rendered}
          isPage={postData.isPage}
          position="absolute"
          bottom="15%"
          left="15%"
        />
      </Box>

      <Section
        bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        pb="80px"
        size="xl"
      >
        <Box
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="xl"
          pt="50px"
          fontSize={["md", "lg", "xl"]}
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          <SimpleGrid
            templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
            spacing="8"
            pos={"relative"}
          >
            {!programmes.length ? (
              <Loading />
            ) : (
              <ProgrammesList articles={programmes} />
            )}
            <Sidebar
              data={featuredEvents}
              title="Sawtee in Media"
              showSawteeInMedia={true}
              showTwitterTimeline={true}
              showSubscriptionCard={true}
            />
          </SimpleGrid>
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Programmes);

const ProgrammesList = ({ articles }) => {
  return (
    <Container p={{ base: 5, md: 10 }}>
      <chakra.h1
        p={4}
        mb={5}
        fontSize="3xl"
        lineHeight={1.2}
        fontWeight="bold"
        w="100%"
      >
        Posts
      </chakra.h1>
      <VStack spacing={8} w={{ base: "auto", md: "2xl" }}>
        {articles.map((article, index) => (
          <Fragment key={index}>
            <Stack direction="column" spacing={4} p={4}>
              <HStack spacing={2} mb={1}>
                {article.categories.map((cat) => (
                  <Tag
                    key={cat.id}
                    colorScheme={useColorModeValue("blackAlpha", "gray")}
                    borderRadius="full"
                  >
                    {cat.name}
                  </Tag>
                ))}
              </HStack>
              <Box textAlign="left">
                <Link
                  fontSize="xl"
                  lineHeight={1.2}
                  fontWeight="bold"
                  w="100%"
                  _hover={{ color: "blue.400", textDecoration: "underline" }}
                >
                  {article.title}
                </Link>
                <Text
                  fontSize="md"
                  color="gray.500"
                  noOfLines={2}
                  lineHeight="normal"
                >
                  {article.excerpt}
                </Text>
              </Box>
              <Box>
                <AvatarGroup size="sm" max={3} mb={1}>
                  <Avatar
                    name={article.author.name}
                    src={article.author.avatar_urls[96]}
                  />
                </AvatarGroup>
                <Stack
                  justify="space-between"
                  direction={{ base: "column", sm: "row" }}
                >
                  <Box>
                    <Text fontSize="sm" fontWeight="bold">
                      {article.author.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {article.publishDate}
                    </Text>
                  </Box>
                  <HStack
                    as={Link}
                    spacing={1}
                    p={1}
                    alignItems="center"
                    height="2rem"
                    w="max-content"
                    margin="auto 0"
                    rounded="md"
                    color="blue.400"
                    _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                  >
                    <Link link={article.link}>
                      <Text fontSize="sm"> Read more</Text>
                    </Link>
                    <Icon as={GoChevronRight} w={4} h={4} />
                  </HStack>
                </Stack>
              </Box>
            </Stack>
            {articles.length - 1 !== index && <Divider />}
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};
