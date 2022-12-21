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

export const PrimaryPostPreview = ({ data, ...props }) => {
  const { title, categories, featured_media, link } = data;

  return (
    <LinkBox>
      <PrimaryPostArticle bgImage={generateGradient()} role="group" {...props}>
        <PostOverlay />
        <PostImage {...featured_media} />
        <PostContent>
          <LinkOverlay href={link}>
            <PostTitle>
              <Link link={link}>{title}</Link>
            </PostTitle>
          </LinkOverlay>
          <PostCategories categories={categories} justifyContent="center" />
        </PostContent>
      </PrimaryPostArticle>
    </LinkBox>
  );
};

export const SecondaryPostPreview = ({ data, ...props }) => {
  const { title, categories, link, featured_media } = data;

  return (
    <LinkBox display="block" flex="1" {...props}>
      <SecondaryPostArticle bgImage={generateGradient()} role="group">
        <PostOverlay />
        <PostImage {...featured_media} />
        <PostContent padding="40px" textAlign="left" mt="0">
          <PostCategories justifyContent="flex-start" categories={categories} />
          <LinkOverlay href={link}>
            <PostTitle as="h2" mt="auto" pt="40px" fontSize="1.65rem">
              <Link link={link}>{title}</Link>
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
      bg="white"
      {...props}
    >
      <Box width={{ base: "100%", lg: "65%" }} flexGrow="1">
        <PrimaryPostPreview data={data[0]} />
      </Box>
      <Flex
        direction={{ base: "column", md: "row", lg: "column" }}
        width={{ base: "100%", lg: "35%" }}
        flexGrow="1"
        gap="2"
      >
        {data.map((item, idx) => {
          if (idx > 0 && idx < data.length) {
            return <SecondaryPostPreview key={idx} data={item} />;
          }
        })}
      </Flex>
    </Flex>
  );
