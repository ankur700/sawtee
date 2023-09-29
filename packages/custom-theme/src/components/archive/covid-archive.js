import {
  Grid,
  GridItem,
  VStack,
  Flex,
  Box,
  Text,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Sidebar from "../archive/sidebar";
import { formatDateWithMoment, formatPostData } from "../helpers";
import NumberedPagination from "../atoms/NumberedPagination";
import Link from "../atoms/link";
import { BsArrowUpRight } from "react-icons/bs";
import { connect } from "frontity";
import { ArchiveLayout } from "../layouts/archiveLayout";
import PublicationImage from "../../assets/publications-1-resized.jpg";

const CovidArchive = ({ state, postData, linkColor, news, inFocus }) => {
  const category = postData.route.split("/");
  return (
    <ArchiveLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      category={category[2].toUpperCase()}
      image={PublicationImage}
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
        gap={6}
        pos={"relative"}
      >
        <GridItem colSpan={3}>
          <VStack spacing={12} mb="56px">
            {postData.items.map(({ id, type }) => {
              const post = formatPostData(state, state.source[type][id]);

              return <CovidItemCard key={post.id} post={post} />;
            })}
          </VStack>
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
    </ArchiveLayout>
  );
};

export default connect(CovidArchive);

const CovidItemCard = ({ post }) => {
  return (
    <Box
      rounded={"sm"}
      maxW="2xl"
      w="full"
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
      bg={useColorModeValue("white", "blackAlpha.300")}
      border={"1px"}
      borderColor={useColorModeValue("gray.800", "blackAlpha.500")}
      boxShadow={useColorModeValue(
        "6px 6px 0 var(--chakra-colors-gray-800)",
        "6px 6px 0 var(--chakra-colors-blackAlpha-500)"
      )}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack p={4} align="stretch" justify="space-between" spacing={4}>
        <HStack justify="space-between">
          <Box
            bg={useColorModeValue("gray.800", "blackAlpha.500")}
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
        <Heading
          as="h3"
          color={useColorModeValue("gray.800", "gray.300")}
          fontSize={"lg"}
        >
          <Link link={post.link}>{post.title}</Link>
        </Heading>
        <HStack
          shouldWrapChildren="true"
          align="center"
          __css={{ columnGap: "var(--chakra-space-4)", flexWrap: "wrap" }}
        >
          {post.acf.authors
            ? post.acf.authors?.map(({ author }, idx) => {
                return (
                  <Text
                    key={author}
                    color={useColorModeValue("gray.600", "gray.400")}
                    fontSize="sm"
                  >
                    {idx === post.acf.authors.length ? author + " | " : author}
                  </Text>
                );
              })
            : null}
        </HStack>
      </VStack>
      <HStack borderTop={"1px"}>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          cursor={"pointer"}
          w="full"
        >
          <Link link={post.link} fontSize={"md"} fontWeight={"semibold"}>
            View more
          </Link>
          <BsArrowUpRight />
        </Flex>
      </HStack>
    </Box>
  );
};
