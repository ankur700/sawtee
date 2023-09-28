import { useEffect } from "react";
import {
  Grid,
  GridItem,
  VStack,
  Box,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Heading,
  Tag,
} from "@chakra-ui/react";
import { connect, decode } from "frontity";
import Sidebar from "../archive/sidebar";
import { formatCPTData, formatDateWithMoment } from "../helpers";
import NumberedPagination from "../NumberedPagination";
import { formatDateWithMoment } from "../helpers";
import Link from "../atoms/link";
import { motion } from "framer-motion";

const MediaArchive = ({ state, actions, categories, inFocus }) => {
  const postData = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;

  const programeData = state.source.get("/programme/");

  useEffect(() => {
    actions.source.fetch("/programme/");
  }, []);

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap="10"
      pos={"relative"}
    >
      <GridItem colSpan={{ base: 1, lg: 3 }} w="full">
        <VStack spacing={12} w={{ base: "auto", md: "full" }} mb="56px">
          {postData.isReady &&
            postData.items.map(({ type, id }) => {
              const newsItem = formatCPTData(
                state,
                state.source[type][id],
                categories
              );
              return (
                <MediaArticle
                  key={newsItem.id}
                  newsItem={newsItem}
                  linkColor={linkColor}
                />
              );
            })}
        </VStack>
        <NumberedPagination />
      </GridItem>
      <GridItem
        colSpan={{ base: 1, lg: 2 }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Sidebar
          posts={inFocus}
          // news={programeData}
          linkColor={linkColor}
          postsLink={inFocus.link}
          newsLink={programeData.link}
          showTwitterTimeline={true}
          showSubscriptionBox={true}
        />
      </GridItem>
    </Grid>
  );
};

export default connect(MediaArchive);

const MediaArticle = ({ newsItem, linkColor }) => {
  const { title, excerpt, publishDate, link, acf } = newsItem;
  const publisherColor = useColorModeValue("gray.800", "gray.100");
  return (
    <Box
      as={motion.div}
      px={8}
      pt={8}
      pb={4}
      bg={useColorModeValue("gray.50", "gray.800")}
      w="full"
      boxShadow="md"
      borderLeft={"2px solid"}
      borderBottom={"2px solid"}
      borderColor="primary.300"
      whileHover={{ y: -5 }}
      _hover={{ boxShadow: "xl" }}
    >
      <VStack spacing={2} mb={5} alignItems={"start"}>
        <Heading
          color={useColorModeValue("gray.700", "whiteAlpha.800")}
          fontSize="xl"
          lineHeight={1.2}
          fontWeight="bold"
          _hover={{ color: linkColor, textDecoration: "underline" }}
          textAlign="left"
          w="100%"
          mb={4}
        >
          <Link link={link}> {decode(title)}</Link>
        </Heading>

        <Text
          fontSize="sm"
          noOfLines={3}
          color={useColorModeValue("gray.600", "gray.200")}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </VStack>
      <HStack
        fontSize="sm"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        {acf.publishers.length > 0 &&
          acf.publishers.map(({ publisher, publisher_website }) => {
            return (
              <Tag
                key={publisher}
                px="4"
                py={2}
                as="a"
                color={publisherColor}
                href={publisher_website}
                _hover={{ textDecor: "underline" }}
              >
                {publisher}
              </Tag>
            );
          })}

        <Text color={useColorModeValue("gray.600", "gray.200")}>
          {formatDateWithMoment(publishDate)}
        </Text>
      </HStack>
    </Box>
  );
};
