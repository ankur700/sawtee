import {
  Grid,
  GridItem,
  VStack,
  Box,
  HStack,
  Stack,
  Text,
  Flex,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../archive/sidebar";

import { formatCPTData, formatDateWithMoment } from "../helpers";
import Loading from "../atoms/loading";
import NumberedPagination from "../atoms/NumberedPagination";
import { PostImageWithOverlay } from "../featured-post/components";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import Link from "../atoms/link";
import { decode, connect } from "frontity";
import PostCategories from "../post/post-categories";

const EventsArchive = ({
  state,
  postData,
  linkColor,
  categories,
  news,
  inFocus,
}) => {
  const linkColor = state.theme.colors.linkColor;

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap={6}
      pos={"relative"}
      w="full"
    >
      <GridItem
        colSpan={3}
        display="flex"
        p="2"
        flexDirection="column"
        align-items="center"
        w="95%"
        mx="auto"
      >
        <VStack spacing={20} mb="56px" w={"full"}>
          {postData.isReady ? (
            postData.items.map(({ type, id }) => {
              const event = formatCPTData(
                state,
                state.source[type][id],
                categories
              );
              return <EventItem key={event.id} event={event} />;
            })
          ) : (
            <Loading />
          )}
        </VStack>

        <NumberedPagination />
      </GridItem>
      <GridItem colSpan={2} display={"flex"} justifyContent={"center"} w="full">
        <Sidebar
          posts={inFocus}
          news={news}
          categories={categories}
          linkColor={linkColor}
          postsLink={inFocus.link}
          newsLink={news.link}
          showTwitterTimeline={true}
          showSubscriptionBox={true}
        />
      </GridItem>
    </Grid>
  );
};

export default connect(EventsArchive);

const EventItem = ({ event }) => {
  const format = "MMMM YYYY";
  const categoriesColor = useColorModeValue("gray.700", "whiteAlpha.700");
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

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
                cusrsor: "pointer",
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
            fontSize={{ base: "md", md: "lg" }}
            _hover={{ color: linkColor, textDecoration: "underline" }}
            mb={4}
          >
            <Link w="100%" link={event.link ? event.link : "#"}>
              {decode(event.title)}
            </Link>
          </Heading>
          <Text fontSize={["xs", "sm"]} color={textColor} noOfLines={2}>
            <Html2React html={event.excerpt} />
          </Text>
        </Box>
        <Box mt="4">
          <Stack
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            alignItems={"center"}
          >
            <Text fontSize={["xs", "sm"]} color={textColor}>
              {formatDateWithMoment(event.publishDate, format)}
            </Text>
            <Button
              size={"sm"}
              colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
              aria-label={"Read More"}
              fontWeight="normal"
              color={useColorModeValue("gray.700", "whiteAlpha.800")}
              variant="outline"
              rounded="md"
              rightIcon={<GoChevronRight />}
            >
              <Link link={event.link}>Read more</Link>
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
