import * as React from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Tag,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect, decode } from "frontity";
import { getCPTData } from "../../components/helpers";
import Link from "../../components/atoms/link";

const ResearchList = ({ state, link, linkColor }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const data = state.source.get(link);
  const posts = () => {
    let array = [];
    data.items.map(({ type, id }) => {
      array.push(state.source[type][id]);
    });
    if (array.length > 0) {
      return array;
    }
  };
  const color = linkColor;
  const researchlist = getCPTData(posts(), state);

  const researchData = new Set();

  


  return (
    <>
      <VStack spacing={4}>
        {researchlist.map(
          ({ id, title, featured_media, link, tags, categories }) => (
            <Box onClick={toggleOpen} w="full" key={id}>
              <HStack
                // p={4}
                bg={useColorModeValue("white", "gray.800")}
                rounded="xl"
                borderWidth="1px"
                borderColor={useColorModeValue("gray.100", "gray.700")}
                w="100%"
                h="100%"
                textAlign="left"
                alignItems="center"
                spacing={4}
                cursor="pointer"
                _hover={{ shadow: "lg" }}
              >
                {featured_media && (
                  <Image
                    {...featured_media}
                    size="md"
                    width={40}
                    height={60}
                    layout="fixed"
                    border={"1px solid"}
                    borderColor={useColorModeValue(
                      "gray.100",
                      "whiteAlpha.700"
                    )}
                    // rounded="md"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                )}
                <VStack align="start" justify="flex-start">
                  <VStack spacing={3} align="start">
                    <HStack spacing="1">
                      {categories.map((cat) => (
                        <Tag
                          key={cat.id}
                          colorScheme={useColorModeValue("blackAlpha", "gray")}
                          borderRadius="full"
                          bg={useColorModeValue(
                            "rgb(230 247 255/1)",
                            "rgb(88,175,223,.1)"
                          )}
                        >
                          {cat.name}
                        </Tag>
                      ))}
                    </HStack>
                    <HStack>
                      <Text
                        color={useColorModeValue("gray.700", "whiteAlpha.700")}
                        fontSize="xl"
                        lineHeight={1.2}
                        fontWeight="bold"
                        _hover={{
                          color: color,
                          textDecoration: "underline",
                        }}
                      >
                        <Link link={link}>{decode(title)}</Link>
                      </Text>
                    </HStack>

                    {/* {!isOpen && (
                        <Text
                          fontSize="sm"
                          color={textColor}
                          noOfLines={{ base: 2 }}
                        >
                          {desc}
                        </Text>
                      )}

                      {isOpen && (
                        <Text fontSize="sm" color={textColor}>
                          {desc}
                        </Text>
                      )} */}
                  </VStack>
                </VStack>
              </HStack>
            </Box>
          )
        )}
      </VStack>
    </>
  );
};

export default connect(ResearchList);
