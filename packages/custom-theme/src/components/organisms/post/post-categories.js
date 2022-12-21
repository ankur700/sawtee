import { Text, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Link from "../../atoms/link";
import { decode } from "frontity";

export const PostCategory = (props) => (
  <Button
    transition="background-color ease 0.25s"
    px="10px"
    fontFamily="heading"
    variant="outline"
    colorScheme={useColorModeValue("accent.700", "accent.50")}
    textTransform="uppercase"
    {...props}
  />
);

export const PostCategories = ({ categories, limit = 3, color, ...props }) => {
  const limitCategories =
    categories.length > limit
      ? categories.filter((_, idx) => idx < limit)
      : categories;

  return (
    <Flex flexWrap="wrap" mt="12px" {...props}>
      {limitCategories.map((category) => (
        <PostCategory key={category.id} mr="6px" mb="6px">
          <Text dangerouslySetInnerHTML={{ __html: decode(category.name) }} />
        </PostCategory>
      ))}
    </Flex>
  );
};

export default PostCategories;
