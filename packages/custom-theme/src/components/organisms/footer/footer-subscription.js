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

  if (post)
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

    & p {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    & .wpcf7-form-control-wrap {
      flex-grow: 1;
      width: 75%;
      & input[type="email"] {
        flex: 1 0 auto;
        width: 100%;
        border: 1px solid #999 !important;
        background-color: #eee;
        height: 40px;
        color: #000;
        border-radius: 10px;
        padding: 0 10px;
      }
    }
  }

  & input[type="submit"] {
    width: 100%;
    max-width: 25%;
    height: 40px;
    background-color: #000;
    color: #fff;
    border-radius: 10px;
    font-size: var(--chakra-fontSizes-sm);
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

  & .wpcf7-response-output {
    margin-top: 10px;
  }
`;
