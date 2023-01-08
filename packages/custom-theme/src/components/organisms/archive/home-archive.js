import { Box, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import React from "react";
import { FeaturedPostSection } from "../../molecules/featured-post/featured-post";
import { formatPostData, splitPosts } from "../../helpers";
import { Newsletter } from "../../atoms/newsletter";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";

const Blog = ({ state, libraries }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const [firstThreePosts, othersPosts] = splitPosts(state, data.items);
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

        <Pagination mt="56px" />
      </Box>
      {libraries.newsletter && (
        <Newsletter showPattern={state.theme.showBackgroundPattern} />
      )}
    </Box>
  );
};

export default connect(Blog);
