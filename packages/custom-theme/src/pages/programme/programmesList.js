import {
  VStack,
  Flex,
  Box,
  Link,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { decode } from "frontity";
import moment from "moment/moment";

const ProgrammesList = ({ programs, libraries, linkColor }) => {
  const Html2React = libraries.html2react.Component;

  return (
    <VStack spacing={8} w={{ base: "auto", md: "full" }}>
      {programs.map(({ title, excerpt, categories, publishDate, link, id }) => {
        return (
          <Flex key={id} alignItems="center" justifyContent="center">
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
              <Flex justifyContent="space-between" alignItems="center">
                <Text
                  as="span"
                  fontSize="sm"
                  color="gray.600"
                  _dark={{
                    color: "gray.400",
                  }}
                >
                  {moment(publishDate, "YYYYMMDD").fromNow()}
                </Text>
              </Flex>

              <Box mt={2}>
                <Heading
                  color={useColorModeValue("gray.700", "whiteAlpha.700")}
                  fontSize="xl"
                  lineHeight={1.2}
                  fontWeight="bold"
                  _hover={{ color: linkColor, textDecoration: "underline" }}
                >
                  <Link href={link} fontWeight="700">
                    {decode(title)}
                  </Link>
                </Heading>
                <Text
                  mt={2}
                  fontSize="md"
                  color="gray.600"
                  _dark={{
                    color: "gray.200",
                  }}
                  noOfLines={3}
                >
                  <Html2React html={excerpt} />
                </Text>
              </Box>

              <Flex justifyContent="space-between" alignItems="center" mt={4}>
                <Link
                  color="primary.600"
                  _dark={{
                    color: "primary.400",
                  }}
                  href={link}
                  _hover={{
                    textDecor: "underline",
                  }}
                >
                  Read more
                </Link>
                {categories.map((category) => {
                  if (category.id !== 219) {
                    return (
                      <Link
                        key={category.id}
                        px={3}
                        py={1}
                        bg="gray.600"
                        color="gray.100"
                        fontSize="sm"
                        fontWeight="700"
                        rounded="md"
                        href={category.link}
                        _hover={{
                          bg: "gray.500",
                        }}
                      >
                        {category.name}
                      </Link>
                    );
                  }
                })}
              </Flex>
            </Box>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default ProgrammesList;
