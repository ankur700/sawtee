import {
  Box,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Heading,
  Tag,
} from "@chakra-ui/react";
import { decode } from "frontity";
import { formatDateWithMoment } from "../../../helpers";
import Link from "../../../atoms/link";
import { motion } from "framer-motion";

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

export default MediaArticle;
