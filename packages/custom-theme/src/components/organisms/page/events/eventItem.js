import {
  Box,
  HStack,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  Heading,
  Button,
} from "@chakra-ui/react";
import { PostImageWithOverlay } from "../../../molecules/featured-post/components";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import Link from "../../../atoms/link";
import { decode, connect } from "frontity";
import { formatDateWithMoment } from "../../../helpers";
import PostCategories from "../../../organisms/post/post-categories";

const EventItem = ({ state, libraries, event }) => {
  const format = "MMMM YYYY";
  const linkColor = state.theme.colors.linkColor;
  const categoriesColor = useColorModeValue("gray.700", "whiteAlpha.700");
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const Html2React = libraries.html2react.Component;

  return (
    <Stack
      bg={useColorModeValue("whiteAlpha.800", "gray.800")}
      direction="column"
      spacing={4}
      role="group"
      key={event.id}
      w="full"
      overflow={"hidden"}
      rounded="xl"
      boxShadow={"lg"}
      // shadow="lg"
      _hover={{
        border: "2px solid",
        boxShadow: "xl",
      }}
    >
      <Box overflow={"hidden"}>
        {Object.entries(event.featured_media).length > 0 && (
          <Link link={event.link}>
            <PostImageWithOverlay
              {...event.featured_media}
              height="200px"
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
        {event.categories.length > 1 && (
          <HStack spacing={2} mb={1}>
            <Flex justifyContent="space-between" alignItems="center">
              <PostCategories
                justify="flex-start"
                categories={event.categories}
                color={categoriesColor}
              />
            </Flex>
          </HStack>
        )}
        <Box textAlign="left">
          <Heading
            as="h3"
            color={headingColor}
            fontSize={{ base: "md", "2xl": "lg" }}
            _hover={{ color: linkColor, textDecoration: "underline" }}
            mb={4}
          >
            <Link w="100%" link={event.link ? event.link : "#"}>
              {decode(event.title)}
            </Link>
          </Heading>
          <Text fontSize={"sm"} color={textColor} noOfLines={2}>
            <Html2React html={event.excerpt} />
          </Text>
        </Box>
        <Box mt="4">
          <Stack
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            alignItems={"center"}
          >
            <Text fontSize="sm" color={textColor}>
              {formatDateWithMoment(event.publishDate, format)}
            </Text>
            <Button
              size="sm"
              colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
              aria-label={"Read More"}
              fontWeight="normal"
              color={useColorModeValue("gray.700", "whiteAlpha.800")}
              variant="outline"
              rounded="md"
              rightIcon={<GoChevronRight />}
            >
              <Link fontSize="xs" link={event.link}>
                Read more
              </Link>
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default connect(EventItem);
