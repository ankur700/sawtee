import {
  Container,
  Box,
  HStack,
  VStack,
  Stack,
  Text,
  Icon,
  Tag,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment/moment";
import { PostImageWithOverlay } from "../../components/molecules/featured-post/components";

// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import Link from "../../components/atoms/link";
import { decode } from "frontity";

const EventsList = ({ data, showAvatar, libraries }) => {
  const format = "MMMM Do YYYY";
  const Html2React = libraries.html2react.Component;
  return (
    <VStack spacing={8} w={{ base: "auto", md: "3xl" }}>
      {data &&
        data.map((article) => (
          <Stack
            key={article.id}
            direction="column"
            spacing={4}
            w="full"
            rounded="xl"
            bg={useColorModeValue("whiteAlpha", "blackAlpha")}
            border="1px solid"
            borderColor="blue.100"
            _hover={{
              borderColor: "blue.300",
              boxShadow: useColorModeValue(
                "0 4px 6px rgba(160, 174, 192, 0.6)",
                "0 4px 6px rgba(9, 17, 28, 0.9)"
              ),
            }}
          >
            <Box>
              {article.featured_media && article.featured_media.src && (
                <Link link={article.link}>
                  <PostImageWithOverlay
                    {...article.featured_media}
                    borderRadius="0.75rem 0.75rem 0 0"
                    overflow="hidden"
                  />
                </Link>
              )}
            </Box>
            <Box p={4}>
              <HStack spacing={2} mb={1}>
                {article.categories &&
                  article.categories.map((cat) => (
                    <Tag
                      key={cat.id}
                      colorScheme={useColorModeValue("blackAlpha", "gray")}
                      borderRadius="full"
                      bg={useColorModeValue(
                        "rgb(230 247 255/1)",
                        "rgb(88,175,223,.1)"
                      )}
                    >
                      {cat.name}
                    </Tag>
                  ))}
              </HStack>
              <Box textAlign="left">
                <Link
                  fontSize="xl"
                  lineHeight={1.2}
                  fontWeight="bold"
                  w="100%"
                  className="primary-link"
                  _hover={{ textDecoration: "underline" }}
                  link={article.link ? article.link : "#"}
                >
                  {decode(article.title)}
                </Link>
                <Text
                  as="div"
                  fontSize="md"
                  color="gray.500"
                  noOfLines={2}
                  lineHeight="normal"
                >
                  <Html2React html={article.excerpt} />
                </Text>
              </Box>
              <Box>
                {showAvatar && article.author && (
                  <Avatar
                    size="sm"
                    title="Author"
                    mb={2}
                    src={article.author.avatar_urls[48]}
                  />
                )}
                <Stack
                  justify="space-between"
                  direction={{ base: "column", sm: "row" }}
                >
                  <Box>
                    <Text fontSize="sm" fontWeight="bold">
                      {article.author.name.toUpperCase()}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {moment(article.publishDate).format(format)}
                    </Text>
                  </Box>
                  <HStack
                    as={Link}
                    spacing={1}
                    p={1}
                    alignItems="center"
                    height="2rem"
                    w="max-content"
                    margin="auto 0"
                    rounded="md"
                    color={useColorModeValue("primary.700", "primary.50")}
                    link={article.link ? article.link : "#"}
                    _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                  >
                    <Link link={article.link}>
                      {" "}
                      <Text fontSize="sm"> Read more</Text>
                    </Link>
                    <Icon as={GoChevronRight} w={4} h={4} />
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </Stack>
        ))}
    </VStack>
  );
};

export default EventsList;
