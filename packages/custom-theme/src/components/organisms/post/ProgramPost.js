import { Box, useColorModeValue, Heading, Text } from "@chakra-ui/react";
import { connect, styled, decode } from "frontity";
import { formatDate, formatPostData, getPostData } from "../../helpers";
import { LightPatternBox } from "../../styles/pattern-box";
import Section from "../../styles/section";
import FeaturedMedia from "./featured-media";
import useScrollProgress from "../../hooks/useScrollProgress";
import List from "../archive";
import PostProgressBar from "./post-progressbar";
import PostCategories from "./post-categories";
import React, { useEffect } from "react";

const ProgramPost = ({ state, libraries, actions }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, []);

  const [ref, scroll] = useScrollProgress();

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;
  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      ref={ref}
    >
      <Box pb={{ base: "2rem", lg: "50px" }} maxW="5xl" mx="auto">
        <Box
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "3rem" }}
          color={useColorModeValue("gray.600", "whiteAlpha.600")}
        >
          <PostCategories
            color="black"
            categories={post.categories}
            justifyContent="center"
          />

          <Heading
            fontWeight="bold"
            size={"2xl"}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="uppercase"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue("primary.600", "accent.200")}
            textAlign={"center"}
          >
            For {decode(post.acf.program_partner)}
          </Text>

          <Text fontSize="md" mt="12px" textAlign={"center"}>
            {formatDate(post.acf.program_starting_date) +
              " - " +
              formatDate(post.acf.program_ending_date)}
          </Text>
        </Box>
      </Box>

      <PostProgressBar value={scroll} />

      {/* Look at the settings to see if we should include the featured image */}
      <Section
        bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        pb="80px"
        size="lg"
      >
        {post.featured_media != null && (
          <FeaturedMedia id={post.featured_media.id} />
        )}

        {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
        <Content
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="md"
          pt="50px"
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          <Html2React html={post.content} />
        </Content>

        {/* <Divider borderBottom="1px solid" my="80px" />

        <Section px={{ base: "32px", md: "0" }}>
          <AuthorBio
            image={post.author.avatar_urls["96"]}
            name={post.author.name}
            description={post.author.description}
            link={post.author.link}
          />
        </Section> */}
      </Section>
    </LightPatternBox>
  );
};

export default connect(ProgramPost);

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
