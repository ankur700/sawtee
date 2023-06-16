import {
  VStack,
  Heading,
  Box,
  Link,
  Container,
  Circle,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
// import { FaFilePdf } from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa";

const ResearchList = ({ state, researches, tags, linkColor }) => {
  const HeadingColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const WrapperBackground = useColorModeValue("white", "gray.800");
  const WrapperBorderColor = useColorModeValue("gray.100", "gray.700");
  const TextColor = useColorModeValue("gray.800", "whiteAlpha.800");

  const postsSortedByTags = (tag) => {
    researches.map((r) =>
      r.tags.map((t) => {
        if (tag.id === t.id) {
          tag.posts.push(r);
        }
      })
    );
  };

  return (
    <Container maxW="5xl" p={2}>
      <VStack textAlign="start" align="start" mb={5} spacing={10}>
        {tags
          ? tags.map((tagitem) => {
              tagitem.posts.length <= 0 && postsSortedByTags(tagitem);
              return (
                <Box zIndex={5} w="full" key={tagitem.id}>
                  <Heading
                    fontSize="2xl"
                    fontWeight="bold"
                    my={5}
                    color={HeadingColor}
                  >
                    {tagitem.name}
                  </Heading>
                  <Box
                    p={4}
                    bg={WrapperBackground}
                    rounded="xl"
                    borderWidth="1px"
                    borderColor={WrapperBorderColor}
                    w="100%"
                    h="100%"
                    textAlign="left"
                    display={"flex"}
                    boxShadow={"lg"}
                    flexDirection={"column"}
                    alignItems="start"
                    cursor="pointer"
                    _hover={{ shadow: "md" }}
                  >
                    {tagitem.posts.map((researchItem, idx) => (
                      <ReasearchItem
                        key={researchItem.id}
                        icon={FaFilePdf}
                        skipTrail={
                          idx !== tagitem.posts.length - 1 ? true : false
                        }
                        minH={idx !== tagitem.posts.length - 1 ? 20 : "auto"}
                      >
                        <Text
                          color={TextColor}
                          fontSize="lg"
                          lineHeight={1.2}
                          fontWeight="bold"
                          _hover={{
                            color: linkColor,
                            textDecoration: "underline",
                          }}
                        >
                          <Link href={researchItem.link}>
                            {researchItem.title}
                          </Link>
                        </Text>
                      </ReasearchItem>
                    ))}
                  </Box>
                </Box>
              );
            })
          : null}
      </VStack>
    </Container>
  );
};

export default connect(ResearchList);

const ReasearchItem = ({
  icon = FiCheckCircle,
  boxProps = {},
  skipTrail,
  children,
  ...props
}) => {
  const color = useColorModeValue("gray.700", "gray.200");
  return (
    <Flex {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={12}
          bg={useColorModeValue("gray.600", "gray.500")}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box
          as={icon}
          size="1.25rem"
          color={color}
          pos="absolute"
          left="0.875rem"
          top="0.875rem"
        />
        {skipTrail ? <Box w="1px" flex={1} bg={color} my={1} /> : null}
      </Flex>
      <Box pt={{ base: 1, sm: 3 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};
