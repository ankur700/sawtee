import { Box, useColorModeValue } from "@chakra-ui/react";
import { connect, styled } from "frontity";
import { formatPostData, getPostData } from "../../helpers";
import { PageLayout } from "../layouts/pageLayout";
import Section from "../../styles/section";
import {GlassBox} from "../../atoms";

const Page = ({ state, libraries }) => {
  const data = getPostData(state);
  const post = formatPostData(state, data);
  const Html2React = libraries.html2react.Component;
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  return (
    <PageLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      title={post.title}
      featured_media={post.featured_media}
      isPage={data.isPage}
    >
      <Section
        px={{ base: "32px", md: "0" }}
        w="full"
        size={"lg"}
        pt="50px"
        pb={"80px"}
        fontSize={["md", "lg", "xl"]}
        color={contentColor}
      >
        <Content
          as={GlassBox}
          px={["4", "8"]}
          maxW="5xl"
          paddingBlock="50px"
          fontSize={["sm", "md"]}
          color={contentColor}
        >
          <Html2React html={post.content} />
        </Content>
      </Section>
    </PageLayout>
  );
};

export default connect(Page);

const Content = styled(Box)`
  word-break: break-word;

  * {
    max-width: 100%;
  }

  & ul,
  li {
    font-size: inherit;
  }

  ul {
    padding: 1rem;
  }
  p {
    font-size: inherit;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
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
`;
