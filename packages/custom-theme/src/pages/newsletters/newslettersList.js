import React, {useState, useEffect} from "react";
import {
  Box,
  Text,
  HStack,
  Stack,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { FaRegNewspaper } from "react-icons/fa";
import { formatDateWithMoment } from "../../components/helpers";
import Link from "../../components/atoms/link";

const NewsletterList = ({ state, link, linkColor }) => {
  const data = state.source.get(link);

  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    let array = [];
    data.items.map((item) => {
      const post = state.source[item.type][item.id];
      array.push(formatCPTData(state, post, categories));
    });
    if (array.length > 0) {
      setNewsletters([...array]);
    }
  }, [data]);
  return (
    <>
      {newsletters.map((newsletter) => (
        <Flex key={newsletter.id} mb="10px">
          <Card {...newsletter} linkColor={linkColor} />
        </Flex>
      ))}
    </>
  );
};

const Card = ({ title, publishDate, link, tags, linkColor }) => {
  // For even id show card on left side
  // For odd id show card on right side

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
    >
      <Icon as={FaRegNewspaper} w={8} h={8} color={linkColor} />
      <Box w="full">
        <HStack spacing={2} mb={1}>
          {tags.map((tag) => (
            <Text fontSize="sm" key={tag.id}>
              {tag.name}
            </Text>
          ))}
        </HStack>
        <Stack
          spacing={2}
          direction={{ base: "column", md: "row" }}
          mb={3}
          justifyContent={"space-between"}
        >
          <Text
            color={useColorModeValue("gray.700", "whiteAlpha.700")}
            _hover={{ color: linkColor }}
            fontSize="xl"
            lineHeight={1.2}
            fontWeight="bold"
          >
            <Link link={link}>{title}</Link>
          </Text>
          <Text fontSize="sm">{formatDateWithMoment(publishDate)}</Text>
        </Stack>
      </Box>
    </HStack>
  );
};

export default connect(NewsletterList);
