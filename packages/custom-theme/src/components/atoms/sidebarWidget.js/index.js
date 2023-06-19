import {
  Box,
  Flex,
  Container,
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
import { formatedDate } from "../../helpers";
import { decode } from "frontity";
import GlassBox from "../glassBox";

const ListHeading = ({ title, link }) => {
  return (
    <Box borderBottom="1px solid #E2E4E6">
      <Flex align="center" p="3">
        <Heading
          color={useColorModeValue("gray.800", "whiteAlpha.900")}
          fontSize="xl"
        >
          {title}
        </Heading>
        <Spacer />
        <Link
          href={link ? link : "#"}
          fontSize="14px"
          color={useColorModeValue("primary.700", "primary.100")}
          fontWeight="medium"
        >
          See all
        </Link>
      </Flex>
    </Box>
  );
};

const SidebarWidget = ({ array, linkColor, title, link, ...rest }) => {
  const HeadingColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const TextColor = useColorModeValue("gray.600", "whiteAlpha.600");

  return (
    <GlassBox
      className="glassbox"
      rounded="xl"
      border="1px solid #E2E4E6"
      px={8}
      py={6}
      maxH="620px"
      overflowY="scroll"
      {...rest}
    >
      <ListHeading title={title} link={link} />
      {array.length > 0 ? (
        array.map((item, index) => {
          return (
            <Stack spacing={2} mt="6" key={item.id}>
              <Heading
                className="title"
                fontSize="sm"
                mb="2"
                color={HeadingColor}
                lineHeight={1.2}
                fontWeight="bold"
                _hover={{
                  color: linkColor ? linkColor : "primary.700",
                  textDecoration: "underline",
                }}
              >
                <Link link={item.link}>{decode(item.title)}</Link>
              </Heading>
              <Box
                display={"flex"}
                justifyContent="space-between"
                fontSize={"sm"}
                fontWeight="semibold"
                color={TextColor}
              >
                {item.acf.publishers
                  ? item.acf.publishers.map(
                      ({ publisher, publisher_website }) => {
                        return (
                          <Text
                            as="a"
                            key={publisher}
                            href={publisher_website}
                            _hover={{ textDecor: "underline" }}
                            maxW="180px"
                            noOfLines={1}
                            fontSize="xs"
                          >
                            {publisher}
                          </Text>
                        );
                      }
                    )
                  : null}
                <Box
                  as="time"
                  fontSize="xs"
                  dateTime={new Date(item.publishDate).toLocaleDateString()}
                >
                  {formatedDate(item.publishDate)}
                </Box>
              </Box>
              <Divider
                mb="10px"
                display={index === array.length - 1 ? "none" : "block"}
              />
            </Stack>
          );
        })
      ) : (
        <Stack spacing={6} mt="3">
          <Box display={"flex"} flexDir={"column"} gap={2}>
            <Skeleton w="full" height="15px" />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Skeleton w="80px" height="10px" />
              <Skeleton w="80px" height="10px" />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"column"} gap={2}>
            <Skeleton w="full" height="15px" />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Skeleton w="80px" height="10px" />
              <Skeleton w="80px" height="10px" />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"column"} gap={2}>
            <Skeleton w="full" height="15px" />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Skeleton w="80px" height="10px" />
              <Skeleton w="80px" height="10px" />
            </Box>
          </Box>
        </Stack>
      )}
    </GlassBox>
  );
};

export default SidebarWidget;
