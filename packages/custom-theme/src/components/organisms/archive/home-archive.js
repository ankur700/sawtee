import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import React from "react";
import { FeaturedPostSection } from "../../molecules/featured-post/featured-post";
import {
  formatPostData,
  splitPosts,
  getPostsGroupedByCategory,
} from "../../helpers";
import { Newsletter } from "../../atoms/newsletter";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";
import Link from "../../atoms/link";

const HomeArchive = ({ state, libraries }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const [firstThreePosts, othersPosts] = splitPosts(state, data.items);
  const postsPerCategory = getPostsGroupedByCategory(state.source);
  console.log(state.source);
  const Html2React = libraries.html2react.Component;
  return (
    <Box bg={useColorModeValue("whiteAlpha.300", "gray.800")} as="section">
      <FeaturedPostSection
        data={firstThreePosts.map((post) => formatPostData(state, post))}
      />

      <Box
        bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        py={{ base: "64px", md: "80px" }}
        px={{ base: "24px", md: "40px" }}
        width={{ base: "auto", lg: "80%" }}
        maxWidth="1200px"
        mx="auto"
      >
        <Heading
          as="h3"
          textTransform="uppercase"
          textAlign="center"
          fontSize={{ base: "4xl", md: "6xl" }}
          color={useColorModeValue("accent.400", "accent.50")}
        >
          Latest Events
        </Heading>

        <SimpleGrid
          mt={{ base: "64px", md: "80px" }}
          columns={{ base: 1, md: 2 }}
          spacing="40px"
        >
          {othersPosts.map(({ type, id }, idx) => {
            const item = state.source[type][id];
            return (
              <ArchiveItem
                showImage={true}
                key={item.id}
                item={item}
                color={useColorModeValue("gray.700", "whiteAlpha.700")}
                rounded="xl"
              />
            );
          })}
        </SimpleGrid>
        <Box as="section" w="full">
          {postsPerCategory.map(({ posts, category }, index) => (
            <Box key={index}>
              <Heading as="h4">{category.name}</Heading>
              {posts.map((post, index) => (
                <Box as="article" key={index}>
                  <Box>
                    <Box px={2}>
                      <Link link={post.link}>
                        <h2>
                          <Html2React html={post.title.rendered} />
                        </h2>
                      </Link>
                      <Html2React html={post.excerpt.rendered} />
                    </Box>
                  </Box>
                </Box>
              ))}
              <Link link={category.link}>
                <Text>
                  &gt;&gt; See more posts at <strong>{category.name}</strong>
                </Text>
              </Link>
            </Box>
          ))}
        </Box>

        <Pagination mt="56px" />
      </Box>
      {libraries.newsletter && (
        <Newsletter showPattern={state.theme.showBackgroundPattern} />
      )}
    </Box>
  );
};

export default connect(HomeArchive);
