import {
  Box,
  Divider,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Link from "../../atoms/link";
import Title from "../../atoms/title";
import { formatedDate } from "../../helpers";
import { decode } from "frontity";

const SawteeInMediaWidget = ({ news, linkColor }) => {
  return (
    <>
      <Title text={"Sawtee in Media"} textAlign="center" mb={8} />
      {news.length > 0 &&
        news.map((item, index) => {
          return (
            <Stack spacing={2} mt="6" key={item.id}>
              <Heading
                className="title"
                fontSize={["sm", "md"]}
                mb="2"
                color={useColorModeValue("gray.700", "whiteAlpha.700")}
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
                color={useColorModeValue("gray.600", "whiteAlpha.600")}
              >
                {item.acf.publishers &&
                  item.acf.publishers.map((publisher, idx) => {
                    return (
                      <Text
                        as="a"
                        key={idx}
                        href={publisher.publisher_website}
                        _hover={{ textDecor: "underline" }}
                        maxW="180px"
                        noOfLines={1}
                      >
                        {publisher.publisher}
                      </Text>
                    );
                  })}
                <Box
                  as="time"
                  dateTime={new Date(item.publishDate).toLocaleDateString()}
                >
                  {formatedDate(item.publishDate)}
                </Box>
              </Box>
              <Divider display={index === news.length - 1 ? "none" : "block"} />
            </Stack>
          );
        })}

      {news.length === 0 && (
        <Stack spacing={6} mt="3">
          <Box display={"flex"} flexDir={"column"} gap={2}>
            <Skeleton w="full" height="20px" />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Skeleton w="80px" height="15px" />
              <Skeleton w="80px" height="15px" />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"column"} gap={2}>
            <Skeleton w="full" height="20px" />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Skeleton w="80px" height="15px" />
              <Skeleton w="80px" height="15px" />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"column"} gap={2}>
            <Skeleton w="full" height="20px" />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Skeleton w="80px" height="15px" />
              <Skeleton w="80px" height="15px" />
            </Box>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default SawteeInMediaWidget;
