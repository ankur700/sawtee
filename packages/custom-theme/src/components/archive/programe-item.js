import { Flex, Box, Link, Text, Heading } from "@chakra-ui/react";
import PostCategories from "../post/post-categories";
import { GlassBox } from "../atoms";

const ProgrammeItem = ({ post, headingColor, textColor }) => {
  return (
    <Flex as="article" w="full">
      <GlassBox px={8} py={4} fontSize="md" maxW="5xl">
        <Box mt={2}>
          <Heading
            as="h3"
            fontSize={{ base: "lg", md: "xl", xl: "2xl" }}
            color={headingColor}
          >
            <Link
              href={post.link}
              textDecoration={"none"}
              _hover={{ textDecoration: "underline" }}
            >
              {post.title}
            </Link>
          </Heading>
          <Text
            my={4}
            fontSize={["sm", "md"]}
            color={textColor}
            noOfLines={[2]}
          >
            {post.excerpt}
          </Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link color={textColor} href={post.link} className="primary-link">
            Read more
          </Link>
          <Box display="flex" gap="4" justifyContent={"space-between"}>
            {post.categories && (
              <Flex justifyContent="space-between" alignItems="center">
                <PostCategories
                  justify="flex-start"
                  categories={post.categories}
                />
              </Flex>
            )}
          </Box>
        </Flex>
      </GlassBox>
    </Flex>
  );
};

export default ProgrammeItem;
