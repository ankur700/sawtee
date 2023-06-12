import { Flex, Box, Text, chakra, useColorModeValue } from "@chakra-ui/react";
import { formatDateWithMoment } from "../../components/helpers";
import Link from "@frontity/components/link";

const CovidItemCard = ({ post }) => {
  return (
    <Box
      as="article"
      spacing={4}
      w="full"
      mx="auto"
      px={6}
      py={4}
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      shadow="md"
      rounded="md"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          px={3}
          py={1}
          className="category"
          bg={useColorModeValue("rgb(230 247 255/1)", "rgb(88,175,223,.1)")}
          fontSize="sm"
          rounded="md"
          zIndex={50}
          cursor="pointer"
        >
          {post.acf.genre}
        </Box>
        <chakra.span
          color="gray.800"
          _dark={{
            color: "gray.400",
          }}
          as="time"
          px={3}
          py={1}
          fontSize="xs"
        >
          {formatDateWithMoment(post.publishDate, "MMMM YYYY")}
        </chakra.span>
      </Flex>

      <Box mb={6}>
        <chakra.h1
          fontSize="xl"
          fontWeight="bold"
          my={4}
          color="gray.800"
          _dark={{
            color: "white",
          }}
          title={post.title}
        >
          <Link link={post.link}>{post.title}</Link>
        </chakra.h1>
      </Box>

      <Box>
        <Flex
          alignItems="center"
          mt={2}
          color="gray.700"
          _dark={{
            color: "gray.200",
          }}
          fontSize={"md"}
          flexWrap={"wrap"}
          columnGap={3}
        >
          {post.acf.authors
            ? post.acf.authors?.map(({ author }) => {
                return (
                  <Text key={author} as="span">
                    {author}
                  </Text>
                );
              })
            : null}
        </Flex>
      </Box>
    </Box>
  );
};

export default CovidItemCard;
