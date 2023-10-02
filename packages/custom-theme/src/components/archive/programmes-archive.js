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
import { LightPatternBox } from "../styles/pattern-box";
import ArchiveHeader from "./archive-header";
import Section from "../styles/section";
import { GlassBox } from "../atoms";

const ProgrammesArchive = ({ state, news, inFocus }) => {
  const postData = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;

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
            <GridItem colSpan={3}>
              <VStack spacing={12} w={{ base: "auto", md: "full" }} mb="56px">
                {postData.items.map(({ type, id }) => {
                  const program = formatPostData(state, state.source[type][id]);
                  return <ProgrammeItem key={program.id} program={program} />;
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
        </Section>
      </Box>
    </LightPatternBox>
  );
};

export default connect(ProgrammesArchive);

const ProgrammeItem = ({ program }) => {
  const HeaderColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const CategoryColor = useColorModeValue("gray.700", "whiteAlpha.700");

  return (
    <Flex as="article" w="full">
      <GlassBox px={8} py={4} fontSize="md" maxW="5xl">
        <Box mt={2}>
          <Heading
            as="h3"
            fontSize={{ base: "lg", md: "xl", xl: "2xl" }}
            color={HeaderColor}
          >
            <Link
              href={program.link}
              textDecoration={"none"}
              _hover={{ textDecoration: "underline" }}
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
      </GlassBox>
    </Flex>
  );
};
