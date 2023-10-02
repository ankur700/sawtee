import {
  Box,
  Flex,
  Divider,
  Heading,
  Skeleton,
  Stack,
  Text,
  Spacer,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { formatCPTData, formatDate, formatedDate } from "../helpers";
import { decode, connect } from "frontity";
import { GlassBox } from "../atoms";

const ListHeading = ({ title, link }) => {
  return (
    <Box borderBottom="1px solid var(--color-border)">
      <Flex align="center" p="3">
        <Heading
          as="h3"
          color={"var(--color-text)"}
          fontSize={{ base: "md", md: "xl" }}
        >
          {title}
        </Heading>
        <Spacer />
        <Link href={link} fontSize="14px" fontWeight="medium">
          See all
        </Link>
      </Flex>
    </Box>
  );
};

const SidebarWidget = ({
  state,
  array,
  categories,
  linkColor,
  title,
  link,
  ...rest
}) => {
  const HeadingColor = useColorModeValue(
    "var(--color-dark)",
    "var(--color-light)"
  );
  const TextColor = useColorModeValue(
    "var(--color-dark-acc)",
    "var(--color-light-acc)"
  );

  return (
    <GlassBox className="glassbox" rounded="xl" px={8} py={6} {...rest}>
      <ListHeading title={title} link={link} />

      {array.map(({ type, id }, index) => {
        const post = formatCPTData(state, state.source[type][id], categories);

        if (!post) {
          return (
            <Box key={post.id} display={"flex"} flexDir={"column"} gap={2}>
              <Skeleton w="full" height="30px" />
              <Box display={"flex"} justifyContent={"space-between"}>
                <Skeleton w="80px" height="15px" />
                <Skeleton w="80px" height="15px" />
              </Box>
            </Box>
          );
        }
        return (
          <Stack spacing={2} mt="6" key={post.id}>
            <Heading
              as="h4"
              className="title"
              fontSize={{ base: "sm", lg: "md" }}
              mb="2"
              color={HeadingColor}
              lineHeight={1.2}
              fontWeight="semibold"
            >
              <Link
                _hover={{
                  textDecoration: "underline",
                }}
                link={post.link}
              >
                {decode(post.title)}
              </Link>
            </Heading>
            <Box
              display={"flex"}
              justifyContent="space-between"
              color={TextColor}
            >
              {post.acf.publishers
                ? post.acf.publishers.map(
                    ({ publisher, publisher_website }) => {
                      return (
                        <Text
                          as="a"
                          key={publisher}
                          href={publisher_website}
                          _hover={{ textDecor: "underline" }}
                          maxW="180px"
                          noOfLines={1}
                          fontSize={["xs", "sm"]}
                        >
                          {publisher}
                        </Text>
                      );
                    }
                  )
                : null}
              <Box
                as="time"
                fontSize={["xs", "sm"]}
                dateTime={new Date(post.publishDate).toLocaleDateString()}
              >
                {formatDate(post.publishDate)}
              </Box>
            </Box>
            <Divider
              mb="10px"
              display={index === array.length - 1 ? "none" : "block"}
            />
          </Stack>
        );
      })}
    </GlassBox>
  );
};

export default connect(SidebarWidget);
