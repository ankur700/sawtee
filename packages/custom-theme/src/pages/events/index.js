import { Box, useColorModeValue } from "@chakra-ui/react";
import { connect, styled } from "frontity";
import React, { useEffect } from "react";
import List from "../../components/organisms/archive";
import useScrollProgress from "../../components/hooks/useScrollProgress";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import PostProgressBar from "../../components/organisms/post/post-progressbar";
import { getPostData, formatPostData } from "../../components/helpers";
import EventsList from "./eventsList";
import { articles } from "../../data";
import Pagination from "../../components/molecules/pagination";

const Events = ({ state, actions, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);

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
      pt="0"
    >
      <PostProgressBar value={scroll} />

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
          color={"whiteAlpha.800"}
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
      <Section
        bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        pb="80px"
        size="lg"
      >
        {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
        <Content
          as={Section}
          px={{ base: "32px", md: "16px" }}
          size="lg"
          pt="50px"
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          <EventsList data={articles} showAvatar={false} />
          <Pagination />
        </Content>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Events);

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

  ul {
    padding: 1rem;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;