import {
  Box,
  Text,
  useColorModeValue,
  chakra,
  HStack,
  VStack,
  Avatar,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { decode } from "frontity";
import { formatDateWithMoment } from "../../components/helpers";

const MediaArticles = ({ news }) => {
  return (
    <VStack spacing={8}>
      {news &&
        news.map((item) => {
          return (
            <MediaArticleCard
              key={item.id}
              title={item.title}
              excerpt={item.excerpt}
              username={item.author.name}
              created_at={formatDateWithMoment(item.publishDate)}
              link={item.link}
            />
          );
        })}
    </VStack>
  );
};

const MediaArticleCard = ({ title, excerpt, username, created_at, link }) => {
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
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </VStack>
      <HStack
        fontSize="sm"
        fontWeight="bold"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>{username}</Text>
        <Text color={useColorModeValue("gray.500", "gray.200")}>
          {created_at}
        </Text>
      </HStack>
    </LinkBox>
  );
};

export default MediaArticles;
