import {
  Box,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Heading,
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
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
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
                      <Text
                        key={idx}
                        as="a"
                        href={publisher.publisher_website}
                        _hover={{ textDecor: "underline" }}
                        maxW="180px"
                      >
                        {publisher.publisher_name}
                      </Text>
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
