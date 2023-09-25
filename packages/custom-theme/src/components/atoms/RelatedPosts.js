import {
  Divider,
  Heading,
  SkeletonText,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Title } from "./atoms";
import Link from "./link";
import { decode } from "frontity";

const RelatedPosts = ({ postType, data, linkColor }) => {
  const HeadingColor = useColorModeValue("gray.700", "whiteAlpha.700");
  return (
    <>
      <Title text={`Related ${postType}`} textAlign="center" mb={8} />

      {data.length > 1 ? (
        data.map((item, index) => {
          return (
            <Stack spacing={2} mt="6" key={item.id} w="full">
              <Heading
                className="title"
                fontSize={["sm", "md"]}
                mb="2"
                color={HeadingColor}
                lineHeight={1.2}
                fontWeight="bold"
                _hover={{
                  color: linkColor ? linkColor : "primary.700",
                  textDecoration: "underline",
                }}
              >
                <Link link={item.link}>{decode(item.title.rendered)}</Link>
              </Heading>

              <Divider display={index === data.length - 1 ? "none" : "block"} />
            </Stack>
          );
        })
      ) : (
        <Stack spacing={6} mt="6" w="full">
          <SkeletonText noOfLines={2} />
          <SkeletonText noOfLines={1} />
          <SkeletonText noOfLines={1} />
        </Stack>
      )}
    </>
  );
};

export default RelatedPosts;
