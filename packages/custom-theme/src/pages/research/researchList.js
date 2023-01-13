import * as React from "react";
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
import { connect, decode } from "frontity";
import { getCPTData } from "../../components/helpers";
import link from "../../components/atoms/link";
import { HiOutlineNewspaper } from "react-icons/hi";

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
  // console.log(researchlist[0].tags);

  const tagsArray = () => {
    let array = [];
    researchlist.forEach(({ tags }) => {
      tags.map((tag) => array.push({ id: tag.id, name: tag.name, posts: [] }));
    });
    if (array.length > 0) {
      return array;
    }
  };

  tagsArray();

  function postsSortedByTags(tag) {
    researchlist.map((r) =>
      r.tags.map((t) => {
        if (tag.id === t.id) {
          tag.posts.push(r);
        }
      })
    );
  }

  return (
    <Container maxW="7xl" p={{ base: 2, sm: 10 }}>
      <VStack textAlign="start" align="start" mb={5} spacing={10}>
        {tagsArray().map((tagitem) => {
          postsSortedByTags(tagitem);
          return (
            <Box zIndex={5} key={tagitem}>
              <Heading fontSize="4xl" fontWeight="600" my={5}>
                {tagitem.name}
              </Heading>
              <Box
                p={4}
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
                {tagitem.posts.map((researchItem) => (
                  <ReasearchItem
                    key={researchItem.id}
                    icon={HiOutlineNewspaper}
                    skipTrail={tagitem.posts.length > 1 ? true : false}
                  >
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
                      <Link href={researchItem.link}>{researchItem.title}</Link>
                    </Text>
                  </ReasearchItem>
                ))}
              </Box>
            </Box>
          );
        })}
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
  const color = useColorModeValue("gray.700", "gray.500");
  return (
    <Flex minH={20} {...props}>
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
        {skipTrail && <Box w="1px" flex={1} bg={color} my={1} />}
      </Flex>
      <Box pt={{ base: 1, sm: 3 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};
