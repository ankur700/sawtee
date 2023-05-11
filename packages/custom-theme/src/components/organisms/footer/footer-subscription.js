import { useState } from "react";
import { Stack, Heading, Text, Container, Box } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { styled } from "frontity";

const FooterSubscription = ({ post, Html2React }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("initial");
  const [error, setError] = useState(false);

  return (
    <Container
      maxW={"lg"}
      boxShadow={"xl"}
      rounded={"lg"}
      p={6}
      direction={"column"}
    >
      <Heading
        as={"h2"}
        fontSize={{ base: "xl", sm: "2xl" }}
        textAlign={"center"}
        mb={5}
      >
        Subscribe to our Newsletter
      </Heading>
      <Form direction={{ base: "column", md: "row" }} spacing={"12px"}>
        <Box margin={"0 auto"}>
          {post && <Html2React html={post.content.rendered} />}
        </Box>
      </Form>
      <Text mt={2} textAlign={"center"} color={error ? "red.500" : "gray.500"}>
        {error
          ? "Oh no an error occured! 😢 Please try again later."
          : "You won't receive any spam! ✌️"}
      </Text>
    </Container>
  );
};

export default FooterSubscription;

const Form = styled(Stack)`
  & .input-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-content: stretch;

    & .chakra-text {
      position: relative;
    }
  }

  & .wpcf7-list-item-label {
    font-size: 14px;
    font-style: italic;
  }

  & input[type="email"] {
    flex: 1 0 auto;
    width: 95%;
    border: 1px solid #999 !important;
    background-color: #eee;
    height: 40px;
    color: #000;
    border-radius: 10px;
    padding: 0 10px;
    position: relative;
  }

  & input[type="submit"] {
    width: 90px;
    position: absolute;
    right: 24px;
    top: -6px;
    height: 30px;
    margin-top: 10px;
    background-color: #000;
    color: #fff;
    border-radius: 10px;
    font-size: 13px;
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
