import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  useColorModeValue,
  chakra,
  HStack,
  VStack,
  Link,
  Text,
  Avatar,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { connect, decode } from "frontity";
import { LightPatternBox } from "../../styles/pattern-box";
import Section from "../../styles/section";
import Sidebar from "./sidebar";
import Loading from "../../atoms/loading";
import Publication1 from "../../../assets/publications-1.jpg";
import useSWR from "swr";
import Pagination from "./pagination";
import { getCPTData, formatDateWithMoment } from "../../helpers";

const SawteeInMediaArchive = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);
  const posts = Object.values(state.source["sawtee-in-media"]);
  const Categories = Object.keys(state.source.category);
  const linkColor = state.theme.colors.linkColor;
  const news = getCPTData(posts, state);

  // Load the post, but only if the data is ready.
  if (!data.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        <Box
          as="figure"
          mt={4}
          height="500px"
          _after={{
            display: "block",
            content: '""',
            width: "100%",
            height: "500px",
            background: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Box as={Image} boxSize="100%" objectFit="cover" src={Publication1} />
        </Box>

        <Box
          textAlign="center"
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"3xl"}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="uppercase"
          >
            {data.type}
          </Heading>
        </Box>
      </Box>

      <Section
        bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        pb="80px"
        size="xl"
      >
        <Box
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="xl"
          pt="50px"
          fontSize={["md", "lg", "xl"]}
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          <SimpleGrid
            templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
            spacing="10"
            pos={"relative"}
          >
            {!news.length ? <Loading /> : <MediaArticles news={news} />}
            <Sidebar
              // data={news}
              // title="Sawtee in Media"
              showSawteeInMedia={false}
              showTwitterTimeline={true}
              showSubscriptionCard={true}
            />
          </SimpleGrid>
          <Pagination mt="56px" />
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(SawteeInMediaArchive);

const MediaArticles = ({ news }) => {
  return (
    <VStack spacing={8}>
      {news.map((item) => {
        return (
          <MediaArticleCard
            key={item.id}
            title={item.title}
            content={item.excerpt}
            username={item.author.name}
            userAvatar={item.author.avatar_urls[96]}
            created_at={formatDateWithMoment(item.publishDate)}
            link={item.link}
          />
        );
      })}
    </VStack>
  );
};

const MediaArticleCard = ({
  title,
  content,
  username,
  userAvatar,
  created_at,
  link,
}) => {
  return (
    <LinkBox
      p={4}
      _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
      rounded="md"
      border={"1px solid"}
      w="full"
      borderColor={useColorModeValue("gray.800", "whiteAlpha.800")}
    >
      <VStack spacing={2} mb={5} alignItems={"start"}>
        <LinkOverlay href={link}>
          <chakra.h1
            fontSize="2xl"
            lineHeight={1.2}
            textAlign="left"
            fontWeight="bold"
            w="100%"
          >
            {decode(title)}
          </chakra.h1>
        </LinkOverlay>
        <Text
          fontSize="md"
          noOfLines={3}
          color={useColorModeValue("gray.500", "gray.200")}
          dangerouslySetInnerHTML={{ __html: decode(content) }}
        />
      </VStack>
      <HStack spacing={2} alignItems="center">
        <Avatar size="md" title="Author" src={userAvatar} />
        <Box>
          <Text fontWeight="bold">{username}</Text>
          <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.200")}>
            {created_at}
          </Text>
        </Box>
      </HStack>
    </LinkBox>
  );
};
