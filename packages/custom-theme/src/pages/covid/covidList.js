import React, { useEffect, useState } from "react";
import { Flex, Box, Text, SimpleGrid, chakra, VStack } from "@chakra-ui/react";
import { connect } from "frontity";
import { formatCPTData, formatDateWithMoment } from "../../components/helpers";
import Link from "@frontity/components/link";

const CovidList = ({ state, link, categories }) => {
  const [covidPosts, setCovidPosts] = useState([]);

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
    <SimpleGrid columns={2} spacing={6} rowGap={12}>
      {covidPosts.length > 0 &&
        covidPosts.map((post) => {
          return (
            <VStack
              key={post.id}
              spacing={4}
              justifyContent="space-evenly"
              alignItems={"inherit"}
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
                  color="gray.800"
                  _dark={{
                    color: "gray.400",
                  }}
                  as="time"
                  px={3}
                  py={1}
                  rounded="full"
                  textTransform="uppercase"
                  fontSize="xs"
                >
                  {formatDateWithMoment(post.publishDate, "MMMM YYYY")}
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
                  noOfLines={2}
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
                  fontSize={"sm"}
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
            </VStack>
          );
        })}
    </SimpleGrid>
  );
};

export default connect(CovidList);
