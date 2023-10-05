import { VStack, Link, Text, Heading, HStack, Tag } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { decode } from "frontity";
import { formatDate } from "../helpers";
import { GlassBox } from "../atoms";

const MediaItem = ({ post, headingColor, textColor }) => {
  const { title, excerpt, publishDate, link, acf } = post;
  return (
    <GlassBox
      as={motion.div}
      p="40px"
      // borderLeft={"2px solid"}
      // borderBottom={"2px solid"}
      whileHover={{ y: "-10px" }}
      boxShadow="lg"
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
          flex="1"
          overflow="hidden"
          textOverflow="ellipsis"
          display="-webkit-box"
          lineHeight="1.5"
          sx={{ webkitLineClamp: "3", webkitBoxOrient: "vertical" }}
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
          dangerouslySetInnerHTML={{ __html: formatDate(publishDate) }}
        />
      </HStack>
    </GlassBox>
  );
};

export default MediaItem;
