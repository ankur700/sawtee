import {
  Grid,
  GridItem,
  VStack,
  Flex,
  Box,
  Link,
  Text,
  Heading,
  useColorModeValue,
  HStack,
  Tag,
  Stack,
  Button,
} from "@chakra-ui/react";
import { connect, decode } from "frontity";
import Sidebar from "../archive/sidebar";
import { formatPostData, formatDateWithMoment } from "../helpers";
import NumberedPagination from "../atoms/NumberedPagination";
import PostCategories from "../post/post-categories";
import { LightPatternBox } from "../styles/pattern-box";
import ArchiveHeader from "./archive-header";
import Section from "../styles/section";
import { GlassBox } from "../atoms";
import { BsArrowUpRight } from "react-icons/bs";
import { PostImageWithOverlay } from "../featured-post/components";
import { GoChevronRight } from "react-icons/go";

const ProgrammesArchive = ({ state, news, inFocus }) => {
  const postData = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;
  const isProgram = postData.route.replace("/category", "") === "/programme/";
  const isEvent = postData.route.replace("/category", "") === "/events/";
  const isMedia =
    postData.route.replace("/category", "") === "/sawtee-in-media/";
  const isCovid = postData.route.replace("/category", "") === "/covid/";

  const HeadingColor = useColorModeValue(
    "var(--color-dark)",
    "var(--color-light)"
  );
  const TextColor = useColorModeValue(
    "var(--color-dark-acc)",
    "var(--color-light-acc)"
  );

  return (
    <LightPatternBox showPattern={state.theme.showBackgroundPattern} pt="0">
      <Box as="section">
        {postData.isTaxonomy && (
          <ArchiveHeader
            showPattern={state.theme.showBackgroundPattern}
            taxonomy={postData.taxonomy}
            title={decode(state.source[postData.taxonomy][postData.id].name)}
            mb="0px"
          />
        )}

        {postData.isAuthor && (
          <ArchiveHeader
            showPattern={state.theme.showBackgroundPattern}
            taxonomy="Posts By"
            title={decode(state.source.author[postData.id].name)}
          />
        )}

        <Section
          padding={{ base: "24px", lg: "40px" }}
          width={{ lg: "80%" }}
          size="huge"
          mx="auto"
        >
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
            gap={12}
            pos={"relative"}
          >
            <GridItem colSpan={{ base: 1, xl: 3 }}>
              <VStack spacing={12} w={"full"} mb="56px">
                {postData.items.map(({ type, id }) => {
                  const post = formatPostData(state, state.source[type][id]);
                  if (isCovid) {
                    return (
                      <CovidItemCard
                        key={post.id}
                        post={post}
                        headingColor={HeadingColor}
                        textColor={TextColor}
                      />
                    );
                  } else if (isMedia) {
                    return (
                      <MediaArticle
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
        </Section>
      </Box>
    </LightPatternBox>
  );
};

export default connect(ProgrammesArchive);

const ProgrammeItem = ({ post, headingColor, textColor }) => {
  return (
    <Flex as="article" w="full">
      <GlassBox px={8} py={4} fontSize="md" maxW="5xl">
        <Box mt={2}>
          <Heading
            as="h3"
            fontSize={{ base: "lg", md: "xl", xl: "2xl" }}
            color={headingColor}
          >
            <Link
              href={post.link}
              textDecoration={"none"}
              _hover={{ textDecoration: "underline" }}
            >
              {decode(post.title)}
            </Link>
          </Heading>
          <Text
            my={4}
            fontSize={["sm", "md"]}
            color={textColor}
            noOfLines={[2]}
          >
            {post.excerpt}
          </Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link color={textColor} href={post.link} className="primary-link">
            Read more
          </Link>
          <Box display="flex" gap="4" justifyContent={"space-between"}>
            {post.categories && (
              <Flex justifyContent="space-between" alignItems="center">
                <PostCategories
                  justify="flex-start"
                  categories={post.categories}
                />
              </Flex>
            )}
          </Box>
        </Flex>
      </GlassBox>
    </Flex>
  );
};

const CovidItemCard = ({ post, headingColor, textColor }) => {
  return (
    <GlassBox maxW="2xl" w="full" my={5} mx={[0, 5]} overflow={"hidden"}>
      <VStack p={4} align="stretch" justify="space-between" spacing={4}>
        <HStack justify="space-between">
          <Box
            bg={useColorModeValue("var(--color-dark)", "var(--color-darker)")}
            w="max-content"
            display={"inline-block"}
            px={2}
            py={1}
            color="gray.200"
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {post.acf.genre}
            </Text>
          </Box>

          <Text as="time" fontSize={"xs"} fontWeight="medium">
            {formatDateWithMoment(post.publishDate, "MMM YYYY")}
          </Text>
        </HStack>
        <Link href={post.link} className="primary-link">
          <Heading as="h3" color={headingColor} fontSize={"lg"}>
            {post.title}
          </Heading>
        </Link>
      </VStack>
      <HStack
        borderTop={"1px"}
        borderColor={"var(--color-border)"}
        p={4}
        justify={"space-between"}
      >
        <HStack
          shouldWrapChildren="true"
          align="center"
          __css={{ columnGap: 2, flexWrap: "wrap" }}
        >
          {post.acf.authors
            ? post.acf.authors?.map(({ author }, idx) => {
                return (
                  <Text key={author} color={textColor} fontSize="sm">
                    {idx === post.acf.authors.length ? author + " | " : author}
                  </Text>
                );
              })
            : null}
        </HStack>
        <HStack
          shouldWrapChildren="true"
          align="center"
          __css={{ columnGap: 4, flexWrap: "wrap" }}
          justifyContent={"space-between"}
        >
          <Link href={post.link} fontSize={"md"}>
            {`View more `}
          </Link>
          <BsArrowUpRight />
        </HStack>
      </HStack>
    </GlassBox>
  );
};

const MediaArticle = ({ post, headingColor, textColor }) => {
  const { title, excerpt, publishDate, link, acf } = post;
  return (
    <Box
      as={motion.div}
      px={8}
      pt={8}
      pb={4}
      bg={useColorModeValue("gray.50", "gray.800")}
      w="full"
      boxShadow="md"
      borderLeft={"2px solid"}
      borderBottom={"2px solid"}
      borderColor="primary.300"
      whileHover={{ y: -5 }}
      _hover={{ boxShadow: "xl" }}
    >
      <VStack spacing={2} mb={5} alignItems={"start"}>
        <Link href={link} className="primary-link">
          <Heading
            color={headingColor}
            fontSize="xl"
            lineHeight={1.2}
            fontWeight="bold"
            textAlign="left"
            w="100%"
            mb={4}
          >
            {decode(title)}
          </Heading>
        </Link>

        <Text
          fontSize="sm"
          noOfLines={3}
          color={textColor}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </VStack>
      <HStack
        fontSize="sm"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        {acf.publishers.length > 0 &&
          acf.publishers.map(({ publisher, publisher_website }) => {
            return (
              <Tag
                key={publisher}
                px="4"
                py={2}
                as="a"
                color={textColor}
                href={publisher_website}
                _hover={{ textDecor: "underline" }}
              >
                {publisher}
              </Tag>
            );
          })}

        <Text color={headingColor}>{formatDateWithMoment(publishDate)}</Text>
      </HStack>
    </Box>
  );
};

const EventItem = ({ post, headingColor, textColor }) => {
  const format = "MMMM YYYY";

  return (
    <GlassBox spacing={4} role="group" key={post.id} overflow={"hidden"}>
      <Box overflow={"hidden"}>
        {Object.entries(post.featured_media).length > 0 && (
          <Link href={post.link}>
            <PostImageWithOverlay
              {...post.featured_media}
              height="200px"
              borderRadius="0.75rem 0.75rem 0 0"
              overflow="hidden"
              _groupHover={{
                transition: "transform 0.4s ease-in-out",
                transform: "scale(1.05)",
                borderRadius: "0.75rem 0.75rem 0 0",
                cusrsor: "pointer",
              }}
            />
          </Link>
        )}
      </Box>
      <Box py={4} px={8}>
        {post.categories.length > 1 && (
          <HStack spacing={2} mb={1}>
            <Flex justifyContent="space-between" alignItems="center">
              <PostCategories
                justify="flex-start"
                categories={post.categories}
              />
            </Flex>
          </HStack>
        )}
        <Box textAlign="left">
          <Link
            w="100%"
            href={post.link ? post.link : "#"}
            className="primary-link"
          >
            <Heading
              as="h3"
              color={headingColor}
              fontSize={{ base: "md", md: "lg" }}
              mb={4}
            >
              {decode(post.title)}
            </Heading>
          </Link>
          <Text fontSize={["xs", "sm"]} color={textColor} noOfLines={2}>
            {post.excerpt}
          </Text>
        </Box>
        <Box mt="4">
          <Stack
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            alignItems={"center"}
          >
            <Text fontSize={["xs", "sm"]} color={textColor}>
              {formatDateWithMoment(post.publishDate, format)}
            </Text>
            <Button
              size={"sm"}
              colorScheme={"gray"}
              aria-label={"Read More"}
              fontWeight="normal"
              variant="solid"
              rounded="md"
              rightIcon={<GoChevronRight />}
            >
              <Link href={post.link}>Read more</Link>
            </Button>
          </Stack>
        </Box>
      </Box>
    </GlassBox>
  );
};