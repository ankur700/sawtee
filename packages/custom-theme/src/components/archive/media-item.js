import {
  VStack,
  Box,
  Link,
  Text,
  Heading,
  useColorModeValue,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MediaItem = ({ post, headingColor, textColor }) => {
  const { title, excerpt, publishDate, link, acf } = post;
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
        <Link href={link} className="primary-link">
          <Heading
            color={headingColor}
            fontSize="xl"
            lineHeight={1.2}
            fontWeight="bold"
            textAlign="left"
            w="100%"
            mb={4}
          >
            {decode(title)}
          </Heading>
        </Link>

        <Text
          fontSize="sm"
          noOfLines={3}
          color={textColor}
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
                color={textColor}
                href={publisher_website}
                _hover={{ textDecor: "underline" }}
              >
                {publisher}
              </Tag>
            );
          })}

        <Text
          color={headingColor}
          dangerouslySetInnerHTML={{ __html: formatDate(post.publishDate) }}
        />
      </HStack>
    </Box>
  );
};

export default MediaItem;
