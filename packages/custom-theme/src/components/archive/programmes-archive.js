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
} from "@chakra-ui/react";
import { connect, decode } from "frontity";
import Sidebar from "../archive/sidebar";
import { formatPostData } from "../helpers";
import NumberedPagination from "../atoms/NumberedPagination";
import PostCategories from "../post/post-categories";
import { ArchiveLayout } from "../layouts/archiveLayout";

const ProgrammesArchive = ({ state, postData, news, inFocus }) => {
  const linkColor = state.theme.colors.linkColor;

  return (
    <ArchiveLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      category={postData.items[0].type}
      image={PublicationImage}
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
        gap={6}
        pos={"relative"}
      >
        <GridItem colSpan={3}>
          <VStack spacing={12} w={{ base: "auto", md: "full" }} mb="56px">
            {postData.items.map(({ type, id }) => {
              const program = formatPostData(state, state.source[type][id]);
              return (
                <ProgrammeItem
                  key={program.id}
                  program={program}
                  linkColor={linkColor}
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
            linkColor={linkColor}
            postsLink={inFocus.link}
            newsLink={news.link}
            showTwitterTimeline={true}
            showSubscriptionBox={true}
          />
        </GridItem>
      </Grid>
    </ArchiveLayout>
  );
};

export default connect(ProgrammesArchive);

const ProgrammeItem = ({ program, linkColor }) => {
  const HeaderColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const CategoryColor = useColorModeValue("gray.700", "whiteAlpha.700");

  return (
    <Flex as="article" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        fontSize="md"
        bg="whiteAlpha.300"
        _dark={{
          bg: "blackAlpha.300",
        }}
        maxW="5xl"
      >
        <Box mt={2}>
          <Heading
            as="h3"
            fontSize={{ base: "lg", md: "xl", xl: "2xl" }}
            color={HeaderColor}
          >
            <Link
              href={program.link}
              textDecoration={"underline"}
              _hover={{ textDecoration: "none", color: linkColor }}
            >
              {decode(program.title)}
            </Link>
          </Heading>
          <Text
            my={4}
            fontSize={["sm", "md"]}
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
            noOfLines={[2]}
          >
            {program.excerpt}
          </Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            color="gray.800"
            _dark={{
              color: "whiteAlpha.800",
            }}
            href={program.link}
            _hover={{
              textDecor: "underline",
            }}
          >
            Read more
          </Link>
          <Box display="flex" gap="4" justifyContent={"space-between"}>
            {program.categories && (
              <Flex justifyContent="space-between" alignItems="center">
                <PostCategories
                  justify="flex-start"
                  categories={program.categories}
                  color={CategoryColor}
                />
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
