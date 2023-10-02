import {
  VStack,
  Box,
  Link,
  Text,
  Heading,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { formatDate } from "../helpers";
import { GlassBox } from "../atoms";
import { BsArrowUpRight } from "react-icons/bs";

const CovidItem = ({ post, headingColor, textColor }) => {
  return (
    <GlassBox maxW="2xl" w="full" my={5} mx={[0, 5]} overflow={"hidden"}>
      <VStack p={4} align="stretch" justify="space-between" spacing={4}>
        <HStack justify="space-between">
          <Box
            bg={useColorModeValue("var(--color-dark)", "var(--color-darker)")}
            w="max-content"
            display={"inline-block"}
            px={2}
            py={1}
            color="gray.200"
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
      <HStack
        borderTop={"1px"}
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
          __css={{ columnGap: 4, flexWrap: "wrap" }}
          justifyContent={"space-between"}
        >
          <Link href={post.link} fontSize={"md"}>
            {`View more `}
          </Link>
          <BsArrowUpRight />
        </HStack>
      </HStack>
    </GlassBox>
  );
};

export default CovidItem;
