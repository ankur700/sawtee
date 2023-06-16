import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Link from "../../atoms/link";
import { decode } from "frontity";

export const PostCategory = (props) => (
  <Box
    px={3}
    py={1}
    className="category"
    bg={useColorModeValue("rgb(230 247 255/1)", "rgb(88,175,223,.1)")}
    fontSize="sm"
    fontWeight="600"
    rounded="md"
    zIndex={50}
    cursor="pointer"
    {...props}
  />
);

export const PostCategories = ({
  categories,
  limit = 3,
  color = "white",
  ...props
}) => {
  const limitCategories =
    categories.length >= limit
      ? categories.filter((cat, idx) => {
          if (idx <= limit && cat.parent !== 0) return cat;
        })
      : categories.filter((cat) => cat.parent !== 0);

  if (limitCategories.length > 0) {
    return (
      <Flex
        className="post-categories"
        flexWrap="wrap"
        w="full"
        mt="12px"
        {...props}
      >
        {limitCategories.map((category) => (
          <PostCategory key={category.id} mr="6px" mb="6px">
            <Link
              link={category.link}
              _hover={{ textDecor: "none !important" }}
            >
              {decode(category.name)}
            </Link>
          </PostCategory>
        ))}
      </Flex>
    );
  }
  return null;
};

export default PostCategories;
