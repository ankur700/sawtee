import React from "react";
import { styled, connect } from "frontity";
import { HiMailOpen } from "react-icons/hi";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const SubscriptionCard = ({ state, libraries }) => {
  const post = state.source["page"][735];
  const Html2React = libraries.html2react.Component;
  const color = useColorModeValue("var(--color-dark)", "var(--color-light)");
  return (
    <SubscriptionBox
      display="flex"
      flexDir={"column"}
      w="full"
      gap="4"
      pos={"relative"}
      rounded="xl"
      textAlign="center"
      p={4}
      color={useColorModeValue("gray.600", "whiteAlpha.600")}
    >
      <Box display={"flex"} justifyContent="center">
        <HiMailOpen size={"60px"} fill={color} />
      </Box>
      <Heading
        as="h4"
        fontSize={{ base: "lg", lg: "xl" }}
        textTransform="uppercase"
        color={color}
      >
        Don't miss out on our future issues!
      </Heading>

      {post && <Html2React html={post.content.rendered} />}
    </SubscriptionBox>
  );
};

export default connect(SubscriptionCard);

const SubscriptionBox = styled(Box)`
  & .plane-icon {
    transform: rotate(90deg);
  }

  & .input-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-content: stretch;

    & p {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  & .wpcf7-list-item-label {
    font-size: 14px;
    font-style: italic;
  }

  & input[type="email"] {
    flex: 1 0 auto;
    width: 100%;
    border: 1px solid var(--color-grey) !important;
    background-color: var(--color-body-bg);
    height: 50px;
    color: var(--color-text);
    border-radius: 10px;
    padding: 0 10px;
    &::placeholder {
      color: var(--color-grey) !important;
    }
  }

  & input[type="submit"] {
    width: 100%;
    margin: 0 auto;
    height: 40px;
    background-color: var(--color-body-bg);
    color: var(--color-text);
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid var(--color-grey) !important;
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
