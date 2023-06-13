import React from "react";
import {
  PostContent,
  PostImage,
  PostOverlay,
  PostTitle,
  PrimaryPostArticle,
  SecondaryPostArticle,
} from "./components";
import generateGradient from "./genarate-gradient";
import { Flex, Box, LinkBox, LinkOverlay } from "@chakra-ui/react";
import PostCategories from "../../organisms/post/post-categories";
import Link from "../../atoms/link";
import { decode } from "frontity";

export const PrimaryPostPreview = ({ data, ...props }) => {
  const { title, categories, featured_media, link } = data;

  return (
    <LinkBox {...props}>
      <PrimaryPostArticle bgImage={generateGradient()} role="group">
        <PostOverlay />
        <PostImage {...featured_media} />
        <PostContent>
          <LinkOverlay href={link}>
            <PostTitle>{title}</PostTitle>
          </LinkOverlay>
          {categories.length > 0 && (
            <PostCategories
              categories={categories}
              justifyContent="center"
              w="full"
            />
          )}
        </PostContent>
      </PrimaryPostArticle>
    </LinkBox>
  );
};

export const SecondaryPostPreview = ({ data, ...props }) => {
  const { title, categories, link, featured_media } = data;

  return (
    <LinkBox
      flex="1"
      rounded={props.rounded ? props.rounded : "none"}
      overflow="hidden"
      {...props}
    >
      <SecondaryPostArticle
        bgImage={generateGradient()}
        role="group"
        alignItems="center"
      >
        <PostOverlay />
        <PostImage {...featured_media} />
        <PostContent padding="40px" textAlign="left" mt="0">
          {categories.length > 0 && (
            <PostCategories
              zIndex={50}
              justifyContent="flex-start"
              categories={categories}
            />
          )}
          <LinkOverlay href={link}>
            <PostTitle as="h2" mt="auto" fontSize="1.65rem">
              {decode(title)}
            </PostTitle>
          </LinkOverlay>
        </PostContent>
      </SecondaryPostArticle>
    </LinkBox>
  );
};

export const FeaturedPostSection = ({ data, ...props }) =>
  data.length > 2 && (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      gap="2"
      rowGap={8}
      bg="transparent"
      {...props}
    >
      <Box width={{ base: "100%", lg: "65%" }} flexGrow="1">
        <PrimaryPostPreview data={data[0]} rounded="xl" overflow="hidden" />
      </Box>
      <Flex
        direction={{ base: "column", md: "row", lg: "column" }}
        width={{ base: "100%", lg: "35%" }}
        flexGrow="1"
        gap="2"
        rowGap={8}
      >
        {data.map((item, idx) => {
          if (idx > 0 && idx < data.length) {
            return (
              <SecondaryPostPreview
                key={item.id}
                data={item}
                rounded="xl"
                overflow="hidden"
              />
            );
          }
        })}
      </Flex>
    </Flex>
  );
