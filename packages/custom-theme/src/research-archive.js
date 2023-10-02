import { useState, useEffect } from "react";
import {
  GridItem,
  Grid,
  VStack,
  Heading,
  Box,
  Link,
  Container,
  Circle,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../archive/sidebar";
import { formatPostData } from "../helpers";
import NumberedPagination from "../atoms/NumberedPagination";
import { FaFilePdf } from "react-icons/fa";
import PublicationImage from "../../assets/publications-1-resized.jpg";
import { ArchiveLayout } from "../layouts/archiveLayout";

const ResearchArchive = ({ state, news, inFocus }) => {
  // Get the data of the current list.
  const postData = state.source.get(state.router.link);
  const linkColor = state.theme.colors.linkColor;
  const [researches, setResearches] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const category = postData.route.split("/");

  useEffect(() => {
    if (postData.isReady) {
      postData.items.map(({ type, id }, idx) => {
        const post = state.source[type][id];
        setResearches((prev) => [...prev, formatPostData(state, post)]);
      });
    }
  }, [postData]);

  useEffect(() => {
    let array = new Map();
    researches.forEach((research) => {
      research.tags.map((tag) => {
        array.set(`${tag.name}`, { id: tag.id, name: tag.name, posts: [] });
      });
    });
    if (array.size > 0) {
      return setTagsArray(Array.from(array.values()));
    }
  }, [researches]);

  return (
    <ArchiveLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      category={category[2].toUpperCase()}
      image={PublicationImage}
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
        gap="10"
        pos={"relative"}
      >
        <GridItem colSpan={3} pb="56px">
          <ResearchList
            researches={researches}
            tags={tagsArray}
            linkColor={linkColor}
          />
          <NumberedPagination />
        </GridItem>
        <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
          <Sidebar
            posts={inFocus}
            // news={news}
            categories={categories}
            linkColor={linkColor}
            postsLink={inFocus.link}
            newsLink={news.link}
            showTwitterTimeline={false}
            showSubscriptionBox={true}
          />
        </GridItem>
      </Grid>
    </ArchiveLayout>
  );
};

export default connect(ResearchArchive);

const ResearchList = ({ researches, tags, linkColor }) => {
  const HeadingColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const WrapperBackground = useColorModeValue("white", "gray.800");
  const WrapperBorderColor = useColorModeValue("gray.100", "gray.700");
  const TextColor = useColorModeValue("gray.800", "whiteAlpha.800");

  const postsSortedByTags = (tag) => {
    researches.map((r) =>
      r.tags.map((t) => {
        if (tag.id === t.id) {
          tag.posts.push(r);
        }
      })
    );
  };

  return (
    <Container maxW="5xl" p={2}>
      <VStack textAlign="start" align="start" mb={5} spacing={10}>
        {tags.length > 0
          ? tags.map((tagitem) => {
              tagitem.posts.length <= 0 && postsSortedByTags(tagitem);
              return (
                <Box zIndex={5} w="full" key={tagitem.id}>
                  <Heading
                    fontSize="2xl"
                    fontWeight="bold"
                    my={5}
                    color={HeadingColor}
                  >
                    {tagitem.name}
                  </Heading>
                  <Box
                    p={4}
                    bg={WrapperBackground}
                    rounded="xl"
                    borderWidth="1px"
                    borderColor={WrapperBorderColor}
                    w="100%"
                    h="100%"
                    textAlign="left"
                    display={"flex"}
                    boxShadow={"lg"}
                    flexDirection={"column"}
                    alignItems="start"
                    cursor="pointer"
                    _hover={{ shadow: "md" }}
                  >
                    {tagitem.posts.map((researchItem, idx) => (
                      <ReasearchItem
                        key={researchItem.id}
                        icon={FaFilePdf}
                        skipTrail={
                          idx !== tagitem.posts.length - 1 ? true : false
                        }
                        minH={idx !== tagitem.posts.length - 1 ? 20 : "auto"}
                      >
                        <Text
                          color={TextColor}
                          fontSize="lg"
                          lineHeight={1.2}
                          fontWeight="bold"
                          _hover={{
                            color: linkColor,
                            textDecoration: "underline",
                          }}
                        >
                          <Link href={researchItem.acf.link}>
                            {researchItem.title}
                          </Link>
                        </Text>
                      </ReasearchItem>
                    ))}
                  </Box>
                </Box>
              );
            })
          : null}
      </VStack>
    </Container>
  );
};

const ReasearchItem = ({
  icon = FiCheckCircle,
  boxProps = {},
  skipTrail,
  children,
  ...props
}) => {
  const color = useColorModeValue("gray.700", "gray.200");
  return (
    <Flex {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={12}
          bg={useColorModeValue("gray.600", "gray.500")}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box
          as={icon}
          size="1.25rem"
          color={color}
          pos="absolute"
          left="0.875rem"
          top="0.875rem"
        />
        {skipTrail ? <Box w="1px" flex={1} bg={color} my={1} /> : null}
      </Flex>
      <Box pt={{ base: 1, sm: 3 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};
