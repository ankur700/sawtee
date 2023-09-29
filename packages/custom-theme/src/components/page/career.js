import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Section from "../styles/section";
import { Content, GlassBox } from "../atoms";

const Career = ({ post, Html2React }) => {
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  return (
    <Section
      px={"32px"}
      w="full"
      size={"lg"}
      pt="50px"
      pb={"80px"}
      fontSize={["md", "lg", "xl"]}
      color={contentColor}
    >
      <GlassBox border="none">
        <Content
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="sm"
          paddingBlock="50px"
          fontSize={["sm", "md"]}
          color={contentColor}
        >
          <Html2React html={post.content} />
        </Content>
      </GlassBox>
    </Section>
  );
};

export default Career;
