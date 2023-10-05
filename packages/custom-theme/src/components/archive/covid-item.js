import {
  VStack,
  Box,
  Link,
  Text,
  Heading,
  useColorModeValue,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { formatDate } from "../helpers";
import { GlassBox } from "../atoms";
import { BsArrowUpRight } from "react-icons/bs";

const CovidItem = ({ post, headingColor, textColor }) => {
  return (
    <GlassBox minW="2xl" maxW="2xl" my={5} mx={[0, 5]}>
      <VStack p={4} align="stretch" justify="space-between" spacing={4}>
        <HStack justify="space-between">
          <Box
            bg={useColorModeValue("var(--color-dark-acc)", "var(--color-dark)")}
            w="max-content"
            display={"inline-block"}
            px={2}
            py={1}
            color="gray.200"
            rounded="md"
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {post.acf.genre}
            </Text>
          </Box>

          <Text
            as="time"
            fontSize={"xs"}
            fontWeight="medium"
            dangerouslySetInnerHTML={{ __html: formatDate(post.publishDate) }}
          />
        </HStack>
        <Link href={post.link} className="primary-link">
          <Heading as="h3" color={headingColor} fontSize={"lg"}>
            {post.title}
          </Heading>
        </Link>
      </VStack>
      <Box px={4}>
        <Divider borderColor="var(--color-border)" />
      </Box>
      <HStack
        borderColor={"var(--color-border)"}
        p={4}
        justify={"space-between"}
      >
        <HStack
          shouldWrapChildren="true"
          align="center"
          __css={{ columnGap: 2, flexWrap: "wrap" }}
        >
          {post.acf.authors
            ? post.acf.authors?.map(({ author }, idx) => {
                return (
                  <Text key={author} color={textColor} fontSize="sm">
                    {idx === post.acf.authors.length ? author + " | " : author}
                  </Text>
                );
              })
            : null}
        </HStack>
        <HStack
          shouldWrapChildren="true"
          align="center"
          __css={{ columnGap: 3, flexWrap: "wrap" }}
          justifyContent={"space-between"}
          role="group"
        >
          <Link href={post.link} fontSize={"md"}>
            {`Read more `}
          </Link>
          <BsArrowUpRight />
        </HStack>
      </HStack>
    </GlassBox>
  );
};

export default CovidItem;
