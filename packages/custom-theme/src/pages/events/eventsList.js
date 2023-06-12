import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Stack,
  Text,
  Icon,
  Flex,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { PostImageWithOverlay } from "../../components/molecules/featured-post/components";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import Link from "../../components/atoms/link";
import { decode, connect } from "frontity";
import { formatCPTData, formatDateWithMoment } from "../../components/helpers";
import PostCategories from "../../components/organisms/post/post-categories";
import PulseLoadingCards from "../../components/atoms/pulseLoadingCards";

const EventsList = ({ state, link, libraries, linkColor, categories }) => {
  const format = "MMMM Do YYYY";
  const Html2React = libraries.html2react.Component;
  const StackBackground = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.4)"
  );
  const StackBoxShadow = useColorModeValue(
    "0 4px 6px rgba(160, 174, 192, 0.6)",
    "0 4px 6px rgba(9, 17, 28, 0.9)"
  );
  const categoriesColor = useColorModeValue("gray.700", "whiteAlpha.700");
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const textColor = useColorModeValue("gray.500", "gray.300");
  const readMoreButtonColor = useColorModeValue(
    "rgb(230 247 255/1)",
    "rgb(88,175,223,.1)"
  );
  const data = state.source.get(link);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    data.isReady &&
      data.items.map((item) => {
        const post = state.source[item.type][item.id];
        post &&
          setEvents((prev) => [
            ...prev,
            formatCPTData(state, post, categories),
          ]);
      });
  }, [data]);
  return (
    <VStack spacing={8} w={{ base: "auto", md: "full" }} maxW={"3xl"}>
      {events.length > 0 ? (
        events.map((event, idx) => (
          <Stack
            direction="column"
            spacing={4}
            role="group"
            key={event.id}
            w="full"
            overflow={"hidden"}
            rounded="xl"
            bg={StackBackground}
            boxShadow={StackBoxShadow}
            _hover={{
              border: "1px solid",
              borderColor: "primary.700",
              boxShadow: "none",
            }}
          >
            <Box overflow={"hidden"}>
              {Object.entries(event.featured_media).length > 0 && (
                <Link link={event.link}>
                  <PostImageWithOverlay
                    {...event.featured_media}
                    borderRadius="0.75rem 0.75rem 0 0"
                    overflow="hidden"
                    _groupHover={{
                      transition: "transform 0.4s ease-in-out",
                      transform: "scale(1.05)",
                      borderRadius: "0.75rem 0.75rem 0 0",
                    }}
                  />
                </Link>
              )}
            </Box>
            <Box py={4} px={8}>
              <HStack spacing={2} mb={1}>
                {event.categories && (
                  <Flex justifyContent="space-between" alignItems="center">
                    <PostCategories
                      justify="flex-start"
                      categories={event.categories}
                      color={categoriesColor}
                    />
                  </Flex>
                )}
              </HStack>
              <Box textAlign="left">
                <Heading
                  as="h3"
                  color={headingColor}
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  fontWeight="bold"
                  _hover={{ color: linkColor, textDecoration: "underline" }}
                >
                  <Link w="100%" link={event.link ? event.link : "#"}>
                    {decode(event.title)}
                  </Link>
                </Heading>
                <Text
                  as="div"
                  fontSize={{ base: "sm", lg: "md" }}
                  color={textColor}
                  noOfLines={2}
                  lineHeight="normal"
                >
                  <Html2React html={event.excerpt} />
                </Text>
              </Box>
              <Box mt="2">
                <Stack
                  justify="space-between"
                  direction={{ base: "column", sm: "row" }}
                  alignItems={"center"}
                >
                  <Text fontSize="sm" color={textColor}>
                    {formatDateWithMoment(event.publishDate, format)}
                  </Text>
                  <HStack
                    spacing={1}
                    p={1}
                    px={2}
                    alignItems="center"
                    height="2rem"
                    w="max-content"
                    margin="auto 0"
                    rounded="md"
                    // color={useColorModeValue("primary.700", "primary.50")}
                    link={event.link ? event.link : "#"}
                    _hover={{
                      bg: readMoreButtonColor,
                    }}
                  >
                    <Link link={event.link}>
                      {" "}
                      <Text fontSize="sm"> Read more</Text>
                    </Link>
                    <Icon as={GoChevronRight} w={4} h={4} />
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </Stack>
        ))
      ) : (
        <PulseLoadingCards />
      )}
    </VStack>
  );
};

export default connect(EventsList);
