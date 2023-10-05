import {
  Grid,
  GridItem,
  VStack,
  Text,
  HStack,
  Stack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../archive/sidebar";
import Loading from "../atoms/loading";
import { formatCPTData } from "../helpers";
import Pagination from "../archive/pagination";
import Link from "../atoms/link";
import SidebarWidget from "../atoms/sidebarWidget";

const NewsletterArchive = ({
  state,
  postData,
  linkColor,
  categories,
  news,
  infocus,
}) => {
  // const postData = state.source.get(state.router.link);

  if (!postData.isReady) return <Loading />;
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap={6}
      pos={"relative"}
    >
      <GridItem colSpan={3}>
        <VStack spacing={8}>
          {postData.isReady ? (
            postData.items.map((item) => {
              const post = formatCPTData(
                state,
                state.source[item.type][item.id],
                categories
              );
              return (
                <NewsletterCard
                  key={item.id}
                  post={post}
                  linkColor={linkColor}
                />
              );
            })
          ) : (
            <Loading />
          )}
        </VStack>
        <Pagination mt="56px" />
      </GridItem>

      <GridItem colSpan={2} display={"flex"} justifyContent={"center"}>
        <Sidebar showTwitterTimeline={true} showSubscriptionBox={true} />
        {news
          ? news.items !== undefined && (
              <SidebarWidget
                array={news.items.slice(0, 5)}
                title={news.route.split("/")[2].toLocaleUpperCase()}
                link={news.link}
              />
            )
          : null}
        {infocus
          ? infocus.items !== undefined && (
              <SidebarWidget
                array={infocus.items.slice(0, 5)}
                title={infocus.route.split("/")[2].toLocaleUpperCase()}
                link={infocus.link}
                position={"sticky"}
                top={"8.5rem"}
              />
            )
          : null}
      </GridItem>
    </Grid>
  );
};

export default connect(NewsletterArchive);

const NewsletterCard = ({ post, linkColor }) => {
  const { title, publishDate, link, featured_media } = post;
  // For even id show card on left side
  // For odd id show card on right side

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "blackAlpha.300")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      justifyContent="space-between"
      pos="relative"
      w="full"
      maxW={"2xl"}
    >
      {/* <Icon as={FaRegNewspaper} w={8} h={8} color={linkColor} /> */}
      <Image
        boxSize="150px"
        objectFit="cover"
        src={featured_media.src}
        alt={"Cover image"}
        fallbackSrc="https://via.placeholder.com/120x150"
      />
      <Stack
        spacing={2}
        direction={"column"}
        justifyContent={"space-between"}
        alignItems="center"
        w="full"
      >
        <Text
          color={useColorModeValue("gray.700", "whiteAlpha.800")}
          _hover={{ color: linkColor }}
          fontSize="2xl"
          lineHeight={1.2}
          fontWeight="bold"
        >
          <Link link={link}>{title}</Link>
        </Text>
      </Stack>
    </HStack>
  );
};
