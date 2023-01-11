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
import { formatDateWithMoment } from "../../components/helpers";
import Link from "../../components/atoms/link";

const MediaArticles = ({ news, linkColor }) => {
  const Color = linkColor;
  return (
    <VStack spacing={8}>
      {news &&
        news.map(({ id, title, excerpt, publishDate, link, acf }) => {
          return (
            <Box
              key={id}
              p={4}
              _hover={{ bg: useColorModeValue("gray.50", "gray.800") }}
              rounded="md"
              border={"1px solid"}
              w="full"
              borderColor={useColorModeValue("gray.800", "whiteAlpha.800")}
            >
              <VStack spacing={2} mb={5} alignItems={"start"}>
                <Heading
                  color={useColorModeValue("gray.700", "whiteAlpha.700")}
                  fontSize="xl"
                  lineHeight={1.2}
                  fontWeight="bold"
                  _hover={{ color: Color, textDecoration: "underline" }}
                  textAlign="left"
                  w="100%"
                >
                  <Link link={link}> {decode(title)}</Link>
                </Heading>

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
                {acf.publishers &&
                  acf.publishers.map((publisher, idx) => {
                    return (
                      <Tag
                        key={idx}
                        borderRadius="full"
                        bg={useColorModeValue(
                          "rgb(230 247 255/1)",
                          "rgb(88,175,223,.1)"
                        )}
                        px="4"
                        as="a"
                        color={useColorModeValue("gray.700", "gray.100")}
                        href={publisher.publisher_website}
                        _hover={{ textDecor: "underline" }}
                      >
                        {publisher.publisher_name}
                      </Tag>
                    );
                  })}
                <Text color={useColorModeValue("gray.500", "gray.200")}>
                  {formatDateWithMoment(publishDate)}
                </Text>
              </HStack>
            </Box>
          );
        })}
    </VStack>
  );
};


export default MediaArticles;
