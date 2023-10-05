import {
  Box,
  Flex,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { PostImageWithOverlay } from "../featured-post/components";
import Link from "../atoms/link";
import PostCategories from "../post/post-categories";
import { formatDate } from "../helpers";
import { decode } from "frontity";
import { GlassBox } from "../atoms";

const PostPreviewCard = ({
  data,
  showImage,
  isProgramSubcategory,
  ...rest
}) => {
  const { title, excerpt, featured_media, link, categories, publishDate } =
    data;
  const color = useColorModeValue("var(--color-dark", "var(--color-light)");
  return (
    <GlassBox
      display="flex"
      flexDir="column"
      position="relative"
      as="article"
      shadow="md"
      rounded="xl"
      {...rest}
    >
      <LinkBox rounded="xl" w="full">
        {showImage && featured_media && featured_media.src && (
          <Link link={link} overflow="hidden">
            <PostImageWithOverlay
              borderRadius={"0.5rem 0.5rem 0 0"}
              role="group"
              {...featured_media}
            />
          </Link>
        )}

        <Flex p="40px" flexGrow="1" direction="column">
          {!isProgramSubcategory && (
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <PostCategories
                justify="flex-start"
                categories={categories}
                mt="0px"
                color={color}
                limit={1}
              />

              <Box as="time" fontWeight={"semibold"} color={color}>
                {formatDate(publishDate)}
              </Box>
            </Box>
          )}

          <LinkOverlay className="primary-link" href={link}>
            <Heading fontSize="2xl" as="h4" minH="2.25rem" noOfLines={"2"}>
              {decode(title)}
            </Heading>
          </LinkOverlay>

          <Text
            my="20px"
            flex="1"
            overflow="hidden"
            textOverflow="ellipsis"
            display="-webkit-box"
            lineHeight="1.5"
            noOfLines="3"
            color={color}
            sx={{ webkitLineClamp: "3", webkitBoxOrient: "vertical" }}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </Flex>
      </LinkBox>
    </GlassBox>
  );
};

export default PostPreviewCard;
