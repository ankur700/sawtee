import { useMemo, useState, useEffect } from "react";
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
import { formatCPTData } from "../../components/helpers";
import { HiOutlineNewspaper } from "react-icons/hi";

const ResearchList = ({ state, link, categories }) => {
  const color = state.theme.colors.linkColor;
  const data = state.source.get(link);
  const [researches, setResearches] = useState([]);
  const HeadingColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const WrapperBackground = useColorModeValue("white", "gray.800");
  const WrapperBorderColor = useColorModeValue("gray.100", "gray.700");
  const TextColor = useColorModeValue("gray.800", "whiteAlpha.800");
  useEffect(() => {
    let array = [];
    if (data.isReady) {
      data.items.map(({ type, id }) => {
        const post = state.source[type][id];
        array.push(formatCPTData(state, post, categories));
      });
    }
    if (array.length > 0) {
      setResearches([...array]);
    }
  }, [data]);

  const tagsArray = useMemo(() => {
    let array = [];
    researches.forEach(({ tags }, id) => {
      tags.map((tag) => {
        if (array.length <= 1) {
          array.push({ id: tag.id, name: tag.name, posts: [] });
        } else {
          if (array[id - 1].id !== tag.id) {
            array.push({ id: tag.id, name: tag.name, posts: [] });
          }
        }
      });
    });
    if (array.length > 0) {
      return [...array.sort((a, b) => a.id - b.id)];
    }
  }, [researches]);

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
    <Container maxW="5xl" p={{ base: 2, sm: 10 }}>
      <VStack textAlign="start" align="start" mb={5} spacing={10}>
        {tagsArray
          ? tagsArray.map((tagitem) => {
              postsSortedByTags(tagitem);
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
                    alignItems="center"
                    cursor="pointer"
                    _hover={{ shadow: "md" }}
                  >
                    {tagitem.posts.map((researchItem, idx) => (
                      <ReasearchItem
                        key={researchItem.id}
                        icon={HiOutlineNewspaper}
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
                            color: color,
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
