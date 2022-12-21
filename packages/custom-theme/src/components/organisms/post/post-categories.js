import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Link from "../../atoms/link";
import { decode } from "frontity";

export const PostCategory = (props) => (
  <Box
    transition="background-color ease 0.25s"
    px="5px"
    border="2px solid"
    borderColor={useColorModeValue("accent.400", "accent.50")}
    fontFamily="heading"
    textTransform="uppercase"
    fontWeight="medium"
    display="inline-block"
    _hover={{
      bg: "accent.400",
      color: "whiteAlpha.700",

      _dark: {
        bg: "accent.50",
        color: "gray.700",
      },
    }}
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
    categories.length > limit
      ? categories.filter((_, idx) => idx < limit)
      : categories;

  return (
    <Flex flexWrap="wrap" w="max-content" mt="12px" {...props}>
      {limitCategories.map((category) => (
        <PostCategory key={category.id} mr="6px" mb="6px">
          <Link
            link={category.link}
            dangerouslySetInnerHTML={{ __html: decode(category.name) }}
          />
        </PostCategory>
      ))}
    </Flex>
  );
};

export default PostCategories;
