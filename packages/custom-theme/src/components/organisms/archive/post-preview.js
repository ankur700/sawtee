import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { PostImageWithOverlay } from "../../molecules/featured-post/components";
import Link from "../../atoms/link";
import PostCategories from "../post/post-categories";

const PostPreview = ({ data, ...rest }) => {
  const { title, excerpt, featured_media, link, categories } = data;

  return (
    <Flex
      direction="column"
      position="relative"
      bg={useColorModeValue("whiteAlpha", "blackAlpha")}
      as="article"
      shadow="md"
      {...rest}
    >
      {/* Use the frontity settings for featuredPost here */}
      {featured_media && featured_media.src && (
        <Link link={link}>
          <PostImageWithOverlay {...featured_media} />
        </Link>
      )}

      <Flex p="40px" flexGrow="1" direction="column">
        <Heading
          fontSize="2xl"
          as="h4"
          color={useColorModeValue("gray.800", "whiteAlpha.800")}
          textTransform="uppercase"
        >
          <Link link={link}>{title}</Link>
        </Heading>
        <Box
          my="20px"
          flex="1"
          color={useColorModeValue("gray.700", "whiteAlpha.700")}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <PostCategories
          color="black"
          justify="flex-start"
          categories={categories}
        />
      </Flex>
    </Flex>
  );
};

export default PostPreview;
