import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  chakra,
  useColorModeValue,
  Heading,
  Img,
  Center,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { formatDateWithMoment } from "../../components/helpers";
import Link from "@frontity/components/link";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

const CovidItemCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Box
      w="full"
      rounded={"sm"}
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
      bg="white"
      border={"1px"}
      borderColor="black"
      boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack p={4} align="stretch" justify="space-between" spacing={4}>
        <Box
          bg="black"
          w="max-content"
          display={"inline-block"}
          px={2}
          py={1}
          color="white"
        >
          <Text fontSize={"xs"} fontWeight="medium">
            {post.acf.genre}
          </Text>
        </Box>
        <Heading color={"black"} fontSize={"lg"}>
          {post.title}
        </Heading>
        <HStack
          shouldWrapChildren="true"
          align="center"
          __css={{ columnGap: "var(--chakra-space-4)", flexWrap: "wrap" }}
        >
          {post.acf.authors
            ? post.acf.authors?.map(({ author }, idx) => {
                return (
                  <Text key={author} color={"gray.600"} fontSize="sm">
                    {idx === post.acf.authors.length ? author + " | " : author}
                  </Text>
                );
              })
            : null}
        </HStack>
      </VStack>
      <HStack borderTop={"1px"} color="black">
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          cursor={"pointer"}
          w="full"
        >
          <Link link={post.link} fontSize={"md"} fontWeight={"semibold"}>
            View more
          </Link>
          <BsArrowUpRight />
        </Flex>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          borderLeft={"1px"}
          cursor="pointer"
          onClick={() => setLiked(!liked)}
        >
          {liked ? (
            <BsHeartFill fill="red" fontSize={"24px"} />
          ) : (
            <BsHeart fontSize={"24px"} />
          )}
        </Flex>
      </HStack>
    </Box>
  );
};

export default CovidItemCard;
