import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { formatDateWithMoment } from "../../../helpers";
import Link from "../../../atoms/link";
import { BsArrowUpRight } from "react-icons/bs";

const CovidItemCard = ({ post }) => {
  return (
    <Box
      rounded={"sm"}
      maxW="2xl"
      w="full"
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
      bg={useColorModeValue("white", "blackAlpha.300")}
      border={"1px"}
      borderColor={useColorModeValue("gray.800", "blackAlpha.500")}
      boxShadow={useColorModeValue(
        "6px 6px 0 var(--chakra-colors-gray-800)",
        "6px 6px 0 var(--chakra-colors-blackAlpha-500)"
      )}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack p={4} align="stretch" justify="space-between" spacing={4}>
        <HStack justify="space-between">
          <Box
            bg={useColorModeValue("gray.800", "blackAlpha.500")}
            w="max-content"
            display={"inline-block"}
            px={2}
            py={1}
            color="gray.200"
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {post.acf.genre}
            </Text>
          </Box>

          <Text as="time" fontSize={"xs"} fontWeight="medium">
            {formatDateWithMoment(post.publishDate, "MMM YYYY")}
          </Text>
        </HStack>
        <Heading
          as="h3"
          color={useColorModeValue("gray.800", "gray.300")}
          fontSize={"lg"}
        >
          <Link link={post.link}>{post.title}</Link>
        </Heading>
        <HStack
          shouldWrapChildren="true"
          align="center"
          __css={{ columnGap: "var(--chakra-space-4)", flexWrap: "wrap" }}
        >
          {post.acf.authors
            ? post.acf.authors?.map(({ author }, idx) => {
                return (
                  <Text
                    key={author}
                    color={useColorModeValue("gray.600", "gray.400")}
                    fontSize="sm"
                  >
                    {idx === post.acf.authors.length ? author + " | " : author}
                  </Text>
                );
              })
            : null}
        </HStack>
      </VStack>
      <HStack borderTop={"1px"}>
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
      </HStack>
    </Box>
  );
};

export default CovidItemCard;
