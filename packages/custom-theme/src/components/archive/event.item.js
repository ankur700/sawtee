import {
  Flex,
  Box,
  Link,
  Text,
  Heading,
  HStack,
  Stack,
  Button,
} from "@chakra-ui/react";
import { decode } from "frontity";
import { formatDate } from "../helpers";
import PostCategories from "../post/post-categories";
import { GlassBox } from "../atoms";
import { PostImageWithOverlay } from "../featured-post/components";
import { GoChevronRight } from "react-icons/go";

const EventItem = ({ post, headingColor, textColor }) => {
  return (
    <GlassBox
      spacing={4}
      role="group"
      key={post.id}
      overflow={"hidden"}
      maxW={"3xl"}
    >
      <Box overflow={"hidden"}>
        {Object.entries(post.featured_media).length > 0 && (
          <Link href={post.link}>
            <PostImageWithOverlay
              {...post.featured_media}
              height="260px"
              borderRadius="0.75rem 0.75rem 0 0"
              overflow="hidden"
              _groupHover={{
                transition: "transform 0.4s ease-in-out",
                transform: "scale(1.05)",
                borderRadius: "0.75rem 0.75rem 0 0",
                cusrsor: "pointer",
              }}
            />
          </Link>
        )}
      </Box>
      <Box p={[4, 8]}>
        {post.categories.length > 1 && (
          <HStack spacing={2} mb={1}>
            <Flex justifyContent="space-between" alignItems="center">
              <PostCategories
                justify="flex-start"
                categories={post.categories}
              />
            </Flex>
          </HStack>
        )}
        <Box textAlign="left">
          <Link
            w="100%"
            href={post.link ? post.link : "#"}
            className="primary-link"
          >
            <Heading
              as="h3"
              color={headingColor}
              fontSize={{ base: "md", md: "lg" }}
              mb={4}
            >
              {decode(post.title)}
            </Heading>
          </Link>
          <Text fontSize={["xs", "sm"]} color={textColor} noOfLines={2}>
            {post.excerpt}
          </Text>
        </Box>
        <Box mt="4">
          <Stack
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            alignItems={"center"}
          >
            <Text
              fontSize={["xs", "sm"]}
              color={textColor}
              dangerouslySetInnerHTML={{ __html: formatDate(post.publishDate) }}
            />
            <Button
              size={"sm"}
              colorScheme={"gray"}
              aria-label={"Read More"}
              fontWeight="normal"
              variant="solid"
              rounded="md"
              rightIcon={<GoChevronRight />}
            >
              <Link href={post.link}>Read more</Link>
            </Button>
          </Stack>
        </Box>
      </Box>
    </GlassBox>
  );
};

export default EventItem;
