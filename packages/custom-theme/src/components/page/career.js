import { Box, useColorModeValue } from "@chakra-ui/react";
import { connect, styled } from "frontity";
import React from "react";
import Section from "../styles/section";
import GlassBox from "../../atoms/glassBox";
import { formatPostData } from "../helpers";

const Career = ({ state, data, libraries }) => {
  const post = formatPostData(state, data);
  const Html2React = libraries.html2react.Component;
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

export default connect(Career);

const Content = styled(Box)`
  word-break: break-word;

  * {
    max-width: 100%;
  }

  ul {
    padding: 1rem;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  form {
    padding: 24px;

    & p {
      padding-bottom: 1em;
    }

    & label {
      color: #fff;
    }

    & h4,
    .info-heading {
      font-size: 36px;
      color: #000;
      text-transform: uppercase;
      padding-bottom: 10px;
    }

    & .info-text {
      font-size: 20px;
      color: #ccc;
      text-transform: uppercase;
      padding-bottom: 1em;
    }
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;
  }

  iframe {
    display: block;
    margin: auto;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
  a {
    color: #006181;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
      text-decoration-style: dotted;

      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
    }
  }
`;
