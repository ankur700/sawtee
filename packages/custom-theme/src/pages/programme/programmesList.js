import {
  VStack,
  Flex,
  Box,
  Link,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { decode, connect } from "frontity";
import moment from "moment/moment";
import { formatCPTData } from "../../components/helpers";
import { useMemo } from "react";

const ProgrammesList = ({ state, link, libraries, categories }) => {
  const Html2React = libraries.html2react.Component;
  const linkColor = state.theme.colors.linkColor;

  const data = state.source.get(link);
  const programs = useMemo(() => {
    let array = [];
    data.items.map((item) => {
      const post = state.source[item.type][item.id];
      array.push(formatCPTData(state, post, categories));
    });
    if (array.length > 0) {
      return [...array];
    }
  }, [data, categories]);

  return (
    <VStack spacing={8} w={{ base: "auto", md: "full" }}>
      {programs &&
        programs.map((program) => {
          return (
            <Flex key={program.id} alignItems="center" justifyContent="center">
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
                    {moment(program.publishDate, "YYYYMMDD").fromNow()}
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
                    <Link href={program.link} fontWeight="700">
                      {decode(program.title)}
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
                    <Html2React html={program.excerpt} />
                  </Text>
                </Box>

                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                  <Link
                    color="primary.600"
                    _dark={{
                      color: "primary.400",
                    }}
                    href={program.link}
                    _hover={{
                      textDecor: "underline",
                    }}
                  >
                    Read more
                  </Link>
                  <Box display="flex" gap="4" justifyContent={"space-between"}>
                    {program.categories
                      .filter((cat) => cat.name !== "Programme")
                      .map((category) => {
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
                      })}
                  </Box>
                </Flex>
              </Box>
            </Flex>
          );
        })}
    </VStack>
  );
};

export default connect(ProgrammesList);
