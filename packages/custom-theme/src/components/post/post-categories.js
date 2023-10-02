import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import Link from "../atoms/link";
import { decode } from "frontity";

export const PostCategory = (props) => (
  <Button
    px={3}
    py={1}
    className="category"
    fontSize="sm"
    fontWeight="600"
    rounded="md"
    variant="solid"
    colorScheme="gray"
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
      : categories;

  if (limitCategories.length > 0) {
    return (
      <Flex className="post-categories" flexWrap="wrap" mt="12px" {...props}>
        {limitCategories.map((category) => (
          <Link
            key={category.id}
            link={category.link}
            _hover={{ textDecor: "unserline" }}
          >
            <PostCategory mr="6px" mb="6px">
              {decode(category.name)}
            </PostCategory>
          </Link>
        ))}
      </Flex>
    );
  }
  return null;
};

export default PostCategories;
