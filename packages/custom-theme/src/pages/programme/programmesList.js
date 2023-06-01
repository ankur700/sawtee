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
import { formatCPTData, formatedDate } from "../../components/helpers";
import { useEffect, useState } from "react";
import PostCategories from "../../components/organisms/post/post-categories";

const ProgrammesList = ({ state, link, libraries, categories }) => {
  const Html2React = libraries.html2react.Component;
  const linkColor = state.theme.colors.linkColor;
  const HeaderColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const CategoryColor = useColorModeValue("gray.700", "whiteAlpha.700");
  const [programs, setPrograms] = useState([]);

  const data = state.source.get(link);
  useEffect(() => {
    let array = [];
    data.items.map((item) => {
      const post = state.source[item.type][item.id];
      array.push(formatCPTData(state, post, categories));
    });
    if (array.length > 0) {
      setPrograms([...array]);
    }
  }, [data]);

  return (
    <VStack spacing={8} w={{ base: "auto", md: "full" }}>
      {programs.map((program) => {
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
                  {formatedDate(program.publishDate)}
                </Text>
              </Flex>

              <Box mt={2}>
                <Heading
                  color={HeaderColor}
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
                  // isTruncated
                  mt={2}
                  fontSize="md"
                  color="gray.600"
                  _dark={{
                    color: "gray.200",
                  }}
                  overflow={"ellipsis"}
                  noOfLines={[2, 3]}
                >
                  <Html2React html={program.excerpt} />
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
      })}
    </VStack>
  );
};

export default connect(ProgrammesList);
