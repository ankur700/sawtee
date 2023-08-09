import {
  Stack,
  Heading,
  Container,
  Box,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { styled, connect } from "frontity";

const FooterSubscription = ({ state, libraries }) => {
  const post = state.source["page"][735];
  const Html2React = libraries.html2react.Component;

  return (
    <Container
      bg={"primary.100"}
      _dark={{ bg: "primary.800" }}
      maxW={"lg"}
      boxShadow={"xl"}
      rounded={"lg"}
      p={6}
      direction={"column"}
    >
      <Heading
        as={"h6"}
        fontSize={{ base: "md", sm: "lg" }}
        mb={5}
        textAlign={"center"}
      >
        Subscribe to our Newsletter
      </Heading>
      <Text fontSize="sm">
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
      <Form direction={{ base: "column", md: "row" }} spacing={"12px"}>
        <Box margin={"0 auto"}>
          {post && <Html2React html={post.content.rendered} />}
        </Box>
      </Form>
    </Container>
  );
};

export default connect(FooterSubscription);

const Form = styled(Stack)`
  & .input-group {
    display: flex;
    flex-direction: column;
    align-content: stretch;

  }

  & .wpcf7-list-item-label {
    font-size: 14px;
    font-style: italic;
  }

  & input[type="email"] {
    flex: 1 0 auto;
    width: 100%;
    max-width: 350px;
    border: 1px solid #999 !important;
    background-color: #eee;
    height: 40px;
    color: #000;
    border-radius: 10px;
    padding: 0 10px;
    margin-top: 10px;
  }

  & input[type="submit"] {
    width: 100%;
    max-width: 100px;
    height: 32px;
    background-color: #000;
    color: #fff;
    border-radius: 10px;
  }

  & input[type="checkbox"] {
    margin-right: 5px;
  }

  /**
 * Even when I set some dimension-related styles on this
 * element but not on the input or button, they'll still
 * line up.
 */
  & .input-group-addon {
    background: #eee;
    border: 1px solid #ccc;
    padding: 0.5em 1em;
  }
`;
