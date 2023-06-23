import { Box, useColorModeValue } from "@chakra-ui/react";
import { connect, styled } from "frontity";
import React from "react";
import { formatPostData, getPostData } from "../../helpers";
import useScrollProgress from "../../hooks/useScrollProgress";
import { LightPatternBox } from "../../styles/pattern-box";
import Section from "../../styles/section";
import FeaturedMedia from "./featured-media";
import PostHeader from "./post-header";
import PostProgressBar from "./post-progressbar";

const FeaturedEventPost = ({ state, actions, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const postHeaderColor = useColorModeValue("gray.600", "whiteAlpha.600");
  const sectionBg = useColorModeValue("whiteAlpha.700", "gray.700");
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.

  const [ref, scroll] = useScrollProgress();

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;
  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      ref={ref}
      pb={"40px"}
    >
      <Box pb={{ base: "2rem", lg: "50px" }} maxW="5xl" mx="auto">
        <PostHeader
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "3rem" }}
          color={postHeaderColor}
          // categories={post.categories}
          heading={post.title}
          // author={post.author}
          date={post.publishDate}
          isPage={postData.isPage}
        />
      </Box>

      {!postData.isPage && <PostProgressBar value={scroll} />}

      {/* Look at the settings to see if we should include the featured image */}
      <Section bg={sectionBg} pb="80px" size="lg">
        {post.featured_media != null && (
          <FeaturedMedia height="auto" id={post.featured_media.id} />
        )}

        {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
        <Content
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="md"
          pt="50px"
        >
          <Html2React html={post.content} />
        </Content>
      </Section>
    </LightPatternBox>
  );
};

export default connect(FeaturedEventPost);

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled.div`
  word-break: break-word;

  * {
    max-width: 100%;
  }

  ul {
    padding: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }

  h4 {
    font-size: 1.225rem;
  }

  h5 {
    font-size: 1.125rem;
  }

  // p {
  //   margin-bottom: 1rem;
  // }

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

  // a {
  //   color: var(--chakra-colors-primary-700);

  //   &:hover {
  //     color: var(--chakra-colors-gray-700);
  //   }
  // }

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
