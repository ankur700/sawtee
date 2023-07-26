import {
  Flex,
  Box,
  Link,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { decode } from "frontity";
import PostCategories from "../../components/organisms/post/post-categories";

const ProgrammeItem = ({ program, linkColor }) => {
  const HeaderColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const CategoryColor = useColorModeValue("gray.700", "whiteAlpha.700");

  return (
    <Flex as="article" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        fontSize="sm"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        maxW="5xl"
      >
        {/* <Flex justifyContent="space-between" alignItems="center">
          <Text
            as="span"
            fontSize="sm"
            fontWeight="bold"
            // textTransform="uppercase"
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            {formatDateWithMoment(program.publishDate, "MMMM YYYY")}
          </Text>
        </Flex> */}

        <Box mt={2}>
          <Heading fontSize={"lg"} color={HeaderColor} lineHeight={"tall"}>
            <Link
              href={program.link}
              textDecoration={"underline"}
              _hover={{ textDecoration: "none", color: linkColor }}
            >
              {decode(program.title)}
            </Link>
          </Heading>
          <Text
            // isTruncated
            my={4}
            fontSize="md"
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
            noOfLines={[2]}
          >
            {program.excerpt}
          </Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            color="gray.800"
            _dark={{
              color: "whiteAlpha.800",
            }}
            href={program.link}
            _hover={{
              textDecor: "underline",
            }}
          >
            Read more
          </Link>
          <Box display="flex" gap="4" justifyContent={"space-between"}>
            {program.categories && (
              <Flex justifyContent="space-between" alignItems="center">
                <PostCategories
                  justify="flex-start"
                  categories={program.categories}
                  color={CategoryColor}
                />
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProgrammeItem;
