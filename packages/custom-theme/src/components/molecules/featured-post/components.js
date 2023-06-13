import { Box, Heading } from "@chakra-ui/react";
import { styled } from "frontity";
import React from "react";
import Link from "../../atoms/link";
import Image from "@frontity/components/image";
import { transform } from "framer-motion";

export const PostLink = styled(Link)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const PostContent = (props) => (
  <Box
    p="40px"
    width="100%"
    display="flex"
    alignItems="center"
    flexDirection="column"
    textTransform="uppercase"
    mt="auto"
    textAlign="left"
    color="white"
    zIndex="2"
    {...props}
  />
);

export const PostTitle = (props) => (
  <Heading
    as="h1"
    size="2xl"
    pointerEvents="none"
    fontWeight="medium"
    position="relative"
    {...props}
  />
);

export const PostOverlay = (props) => (
  <Box
    pointerEvents="none"
    zIndex={1}
    boxSize="100%"
    position="absolute"
    top="0"
    left="0"
    background="rgba(0,0,0,0.4)"
    transition="background-color ease 0.25s"
    _groupHover={{
      background: "rgba(0,0,0,0.6)",
    }}
    {...props}
  />
);

export const PostImageWithOverlay = ({ src, alt, srcSet, ...props }) => (
  <Box cursor="pointer" height="300px" width="100%" pos="relative" {...props}>
    <PostOverlay />
    <PostImage src={src} alt={alt} srcSet={srcSet} />
  </Box>
);

export const PrimaryPostArticle = (props) => (
  <Box
    as="article"
    position="relative"
    display="flex"
    direction="column"
    alignItems="flex-end"
    minHeight={{ base: "unset", md: "530px" }}
    height={{ base: "auto", md: "100%" }}
    paddingTop={{ base: "80px", md: "250px" }}
    cursor="pointer"
    {...props}
  />
);

export const SecondaryPostArticle = (props) => (
  <Box
    as="article"
    position="relative"
    display="flex"
    direction="column"
    flexGrow="1"
    cursor="pointer"
    height="100%"
    minHeight={{ base: "unset", lg: "300px" }}
    {...props}
  />
);

export const PostImage = (props) => (
  <Box
    as={Image}
    width="900"
    height="550"
    position="absolute"
    boxSize="100%"
    objectFit="cover"
    top="0"
    left="0"
    maxWidth="100%"
    {...props}
  />
);
