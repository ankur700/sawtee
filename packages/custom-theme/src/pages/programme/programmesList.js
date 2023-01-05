import { Container, VStack, Flex, Box, Link, Text } from "@chakra-ui/react";
import moment from "moment/moment";

const ProgrammesList = ({ programs, programCategories }) => {
  return (
    <Container p={{ base: 5, md: 8 }}>
      <VStack spacing={8} w={{ base: "auto", md: "2xl" }}>
        {programs.map(({ title, excerpt, categories, date, link }) => {
          const categoriesArray = categories.map((catId) =>
            programCategories.filter(
              (item) => item.id === catId && item.id !== 219
            )
          );
          console.log(categoriesArray);
          return (
            <Flex w="full" alignItems="center" justifyContent="center">
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
                maxW="2xl"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  {categoriesArray &&
                    categoriesArray.map((category) => (
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
                    ))}
                </Flex>

                <Box mt={2}>
                  <Link
                    fontSize="xl"
                    color="gray.700"
                    _dark={{
                      color: "white",
                    }}
                    href={link}
                    fontWeight="700"
                    _hover={{
                      color: "gray.600",
                      _dark: {
                        color: "gray.200",
                      },
                      textDecor: "underline",
                    }}
                  >
                    {title.rendered}
                  </Link>
                  <Text
                    mt={2}
                    fontSize="md"
                    color="gray.600"
                    _dark={{
                      color: "gray.300",
                    }}
                    noOfLines={3}
                    dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
                  />
                </Box>

                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                  <Link
                    color="brand.600"
                    _dark={{
                      color: "brand.400",
                    }}
                    href={link}
                    _hover={{
                      textDecor: "underline",
                    }}
                  >
                    Read more
                  </Link>
                  <Text
                    as="span"
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                      color: "gray.400",
                    }}
                  >
                    {moment(date, "YYYYMMDD").fromNow()}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          );
        })}
      </VStack>
    </Container>
  );
};

export default ProgrammesList;
