import {
  Heading,
  Container,
  Box,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import {  connect } from "frontity";

const FooterSubscription = ({ state, libraries }) => {
  const post = state.source["page"][735];
  const Html2React = libraries.html2react.Component;

  if (!post) return null;
  return (
    <Container
      bg={"primary.200"}
      _dark={{ bg: "primary.800" }}
      maxW={"md"}
      shadow={"2xl"}
      rounded={"lg"}
      p={6}
      direction={"column"}
    >
      <Heading
        as={"h6"}
        fontSize={{ base: "sm", sm: "md" }}
        mb={3}
        textAlign={"center"}
      >
        Subscribe to our Newsletter
      </Heading>
      <Text
        fontSize={["xs", "sm"]}
        textAlign="center"
        fontStyle="italic"
        mb={2}
      >
        <Checkbox
          isDisabled
          defaultChecked
          colorScheme="green"
          size="sm"
          spacing={4}
        >
          I agree receiving emails from SAWTEE.
        </Checkbox>
      </Text>
      <Box className="footer-form" margin={"0 auto"}>
        {post && <Html2React html={post.content.rendered} />}
      </Box>
    </Container>
  );
};

export default connect(FooterSubscription);

