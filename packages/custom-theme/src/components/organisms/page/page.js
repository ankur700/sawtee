import { connect } from "frontity";
import { getPostData, formatPostData } from "../../helpers";
import KnowUs from "./KnowUs";
import OurWork from "./OurWork";

import Switch from "@frontity/components/switch";
import { LightPatternBox } from "../../styles/pattern-box";
import FeaturedMedia from "../post/featured-media";
import PostHeader from "../post/post-header";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Page = ({ state, libraries, categories }) => {
  const postData = getPostData(state);
  const linkColor = state.theme.colors.linkColor;
  const post = formatPostData(state, postData);
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");

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
          left="5%"
        />
      </Box>
      <Switch>
        <OurWork
          when={postData.route === "/our-work/"}
          post={post}
          postData={postData}
          libraries={libraries}
        />
        <KnowUs
          when={postData.route === "/about/"}
          post={post}
          postData={postData}
          linkColor={linkColor}
          libraries={libraries}
        />
      </Switch>
    </LightPatternBox>
  );
};

export default connect(Page);
