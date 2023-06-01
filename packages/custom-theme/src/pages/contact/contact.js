import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect, styled } from "frontity";
import React from "react";
import { formatPostData, getPostData } from "../../components/helpers";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import GlassBox from "../../components/atoms/glassBox";

const Contact = ({ state, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const Html2React = libraries.html2react.Component;
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );
  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pos="relative">
        {post.featured_media != null && (
          <FeaturedMedia
            mt="0"
            height={"350px"}
            id={post.featured_media.id}
            objectFit={"contain"}
            _after={{
              display: "block",
              content: '""',
              width: "100%",
              height: "350px",
              background: "rgba(0,0,0,0.4)",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        )}
        <PostHeader
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          categories={post.categories}
          heading={post.title}
          author={post.author}
          date={post.publishDate}
          isPage={postData.isPage}
          position="absolute"
          bottom="15%"
          left="15%"
        />
      </Box>
      {/* Look at the settings to see if we should include the featured image */}
      <GlassBox
        as={Section}
        border="none"
        size={"lg"}
        px={{ base: "32px", md: "16px" }}
        paddingBlock="50px"
        mt="50px"
        color={contentColor}
      >
        {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
        <Content px={{ base: "32px", md: "16px" }}>
          <SimpleGrid columns={2} spacing={6}>
            <Box bg={"#000"} p={6}>
              <Html2React html={post.content} />
            </Box>
            <VStack alignItems={"start"} pl={10} spacing={6}>
              {/* <Box>
                <Heading as="h4" className={"info-heading"} fontSize={{base: 'xl', md: '3xl'}}>
                  <Text as="span" fontSize={"36px"} color={"inherit"}>
                    Vist
                  </Text>
                  <br />
                  SAWTEE
                </Heading>
              </Box> */}
              <Box>
                <Heading
                  as="h4"
                  className={"info-heading"}
                  fontSize={{ base: "xl", md: "3xl" }}
                >
                  Opening Hours
                </Heading>
                <Text className="info-text">
                  MONDAY-FRIDAY 9:00 AM – 5:30 PM
                </Text>
              </Box>
              <Box>
                <Heading
                  as="h4"
                  className={"info-heading"}
                  fontSize={{ base: "xl", md: "3xl" }}
                >
                  Address
                </Heading>
                <Text
                  as="address"
                  className="info-text"
                  fontSize={{ base: "xl", md: "2xl" }}
                >
                  Tukucha Marg, Baluwatar, Kathmandu, Nepal
                </Text>
              </Box>
              <Box>
                <Heading
                  as="h4"
                  className={"info-heading"}
                  fontSize={{ base: "xl", md: "3xl" }}
                >
                  General Information
                </Heading>
                <Text className="info-text" pb={6}>
                  No Current Job Openings
                </Text>
                <Heading
                  as="h4"
                  className={"info-heading"}
                  fontSize={{ base: "xl", md: "3xl" }}
                >
                  Queries
                </Heading>
                <Text className="info-text">
                  <a href="mailto:sawtee@sawtee.org">sawtee@sawtee.org</a>
                </Text>
              </Box>
            </VStack>
          </SimpleGrid>
        </Content>
      </GlassBox>
      ;
    </LightPatternBox>
  );
};

export default connect(Contact);

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
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

    & h4,.info-heading {
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
