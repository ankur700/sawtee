import React, { useEffect, useState } from "react";
import { Flex, Box, Text, SimpleGrid, chakra } from "@chakra-ui/react";
import { connect } from "frontity";
import { formatCPTData } from "../../components/helpers";

const CovidList = ({ state, link, categories }) => {
  const [covidPosts, setCovidPosts] = useState([]);
  console.log(
    "🚀 ~ file: covidList.js:8 ~ CovidList ~ covidPosts:",
    covidPosts
  );
  const data = state.source.get(link);
  useEffect(() => {
    data.isReady &&
      data.items.map((item) => {
        const post = state.source[item.type][item.id];
        setCovidPosts((prev) => [
          ...prev,
          formatCPTData(state, post, categories),
        ]);
      });
  }, [data]);

  return (
    <SimpleGrid columns={2} spacing={6}>
      {covidPosts.length > 0 &&
        covidPosts.map((post) => {
          console.log(post.acf.authors);
          return (
            <Box
              w="full"
              maxW="sm"
              mx="auto"
              px={4}
              py={3}
              bg="white"
              _dark={{
                bg: "gray.800",
              }}
              shadow="md"
              rounded="md"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <chakra.span
                  fontSize="sm"
                  color="gray.800"
                  _dark={{
                    color: "gray.400",
                  }}
                >
                  {post.acf.genre}
                </chakra.span>
                <chakra.span
                  color="brand.800"
                  _dark={{
                    color: "brand.900",
                  }}
                  px={3}
                  py={1}
                  rounded="full"
                  textTransform="uppercase"
                  fontSize="xs"
                >
                  {post.publishDate}
                </chakra.span>
              </Flex>

              <Box>
                <chakra.h1
                  fontSize="lg"
                  fontWeight="bold"
                  mt={2}
                  color="gray.800"
                  _dark={{
                    color: "white",
                  }}
                >
                  {post.title}
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
                  fontSize={"sm"}
                >
                  {post.acf.authors &&
                    post.acf.authors?.map((author) => {
                      return (
                        <Text key={author} as="span" ml={3}>
                          {author}
                        </Text>
                      );
                    })}
                </Flex>
              </Box>
            </Box>
          );
        })}
    </SimpleGrid>
  );
};

export default connect(CovidList);
