import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Text,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { connect, styled } from "frontity";
import Link from "../../components/atoms/link";
import React, { useState, useEffect } from "react";
import List from "../../components/organisms/archive";
import useScrollProgress from "../../components/hooks/useScrollProgress";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import PostProgressBar from "../../components/organisms/post/post-progressbar";
import { getPostData, formatPostData } from "../../components/helpers";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import { postdata, featuredEvents } from "../../data";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import Title from "../../components/atoms/title";
import GlassBox from "../../components/atoms/glassBox";

const Publication = ({ state, actions, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const [loadAll, setLoadAll] = useState(false);

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
      bg={useColorModeValue("whiteAlpha.300", "gray.900")}
      showPattern={state.theme.showBackgroundPattern}
      ref={ref}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        {post.featured_media != null && (
          <FeaturedMedia
            mt="0"
            id={post.featured_media.id}
            _after={{
              display: "block",
              content: '""',
              width: "100%",
              height: "500px",
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

      <PostProgressBar value={scroll} />

      {/* Look at the settings to see if we should include the featured image */}
      <Section
        bg={useColorModeValue("whiteAlpha.800", "gray.800")}
        pb="80px"
        size="xl"
      >
        {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
        <Content
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="xl"
          pt="50px"
          fontSize={["md", "lg", "xl"]}
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          <SimpleGrid
            templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
            spacing="8"
            pos={"relative"}
          >
            <Stack spacing={8}>
              <Stack spacing="4">
                <Title text={"Trade Insight"} mb="3" />
                <MultiItemCarousel slides={postdata} />
              </Stack>

              <Stack spacing="4">
                <Title text={"Policy Brief"} mb="3" />
                <MultiItemCarousel slides={postdata} />
              </Stack>

              <Stack spacing="4">
                <Title text={"Research Brief"} mb="3" />
                <MultiItemCarousel slides={postdata} />
              </Stack>

              <Stack spacing="4">
                <Title text={"Working Paper"} mb="3" />
                <MultiItemCarousel slides={postdata} />
              </Stack>
            </Stack>
            <SIM data={featuredEvents} title="Sawtee in Media" />
          </SimpleGrid>
        </Content>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Publication);

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled(Box)`
  word-break: break-word;

  * {
    max-width: 100%;
  }

  & ul,
  li {
    font-size: inherit;
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

export const SIM = ({ data, title }) => {
  return (
    <GlassBox p="4" rounded="xl" pos="sticky" top="7.5rem" height="max-content">
      <Title text={title} />
      <Stack spacing={8}>
        {data.map((event, index) => {
          return (
            <Stack key={index * Math.random() + Math.random()}>
              <Text className="title" lineHeight={"normal"}>
                <Link link={"#"}>{event.title}</Link>
              </Text>
              <Box
                display={"flex"}
                justifyContent="space-between"
                fontSize={"sm"}
              >
                <Text>{event.publisher}</Text>
                <Text> {event.date}</Text>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </GlassBox>
  );
};
