import {
  Box,
  HStack,
  VStack,
  Stack,
  Text,
  Icon,
  Tag,
  useColorModeValue,
  Heading,
  Button
} from "@chakra-ui/react";
import moment from "moment/moment";
import { PostImageWithOverlay } from "../../components/molecules/featured-post/components";
import { motion } from "framer-motion";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import Link from "../../components/atoms/link";
import { decode, connect } from "frontity";
import useInView from "@frontity/hooks/use-in-view";
import { getCPTData } from "../../components/helpers";

const EventsList = ({ state, link, libraries, linkColor }) => {
  const format = "MMMM Do YYYY";
  const Html2React = libraries.html2react.Component;
  const MotionStack = motion(Stack);

  const data = state.source.get(link);
  const posts = () => {
    let array = [];
    data.items.map(({ type, id }) => {
      array.push(state.source[type][id]);
    });
    if (array.length > 0) {
      return array;
    }
  };
  const events = getCPTData(posts(), state);
  const { ref, inView } = useInView({ triggerOnce: false });
  return (
    <VStack spacing={8} w={{ base: "auto", md: "3xl" }} ref={ref}>
      {events &&
        events.map((event) => (
          <MotionStack
            direction="column"
            spacing={4}
            role="group"
            key={event.id}
            w="full"
            overflow={"hidden"}
            rounded="xl"
            border="1px solid"
            borderColor="blue.100"
            _hover={{
              borderColor: "blue.300",
              boxShadow: useColorModeValue(
                "0 4px 6px rgba(160, 174, 192, 0.6)",
                "0 4px 6px rgba(9, 17, 28, 0.9)"
              ),
            }}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: inView ? 0 : 200, opacity: inView ? 1 : 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              bounce: 0.4,
            }}
          >
            <Box overflow={"hidden"}>
              {event.featured_media && event.featured_media.src && (
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
            <Box p={4}>
              <HStack spacing={2} mb={1}>
                {event.categories &&
                  event.categories.map((cat) => (
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
                <Heading
                  as="h3"
                  color={useColorModeValue("gray.700", "whiteAlpha.700")}
                  fontSize="xl"
                  lineHeight={1.2}
                  fontWeight="bold"
                  _hover={{ color: linkColor, textDecoration: "underline" }}
                >
                  <Link w="100%" link={event.link ? event.link : "#"}>
                    {decode(event.title)}
                  </Link>
                </Heading>
                <Text
                  as="div"
                  fontSize="md"
                  color="gray.500"
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
                  <Text fontSize="sm" color="gray.500">
                    {moment(event.publishDate).format(format)}
                  </Text>
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
                    link={event.link ? event.link : "#"}
                    _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
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
          </MotionStack>
        ))}
    </VStack>
  );
};

export default connect(EventsList);
