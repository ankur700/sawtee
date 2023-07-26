import { connect } from "frontity";
import { getPostData, formatPostData } from "../../helpers";
import DefaultPage from "./defaultPage";
import KnowUs from "./KnowUs";
import Home from "./home";
import OurWork from "./OurWork";

import Switch from "@frontity/components/switch";
import { LightPatternBox } from "../../styles/pattern-box";
import FeaturedMedia from "../post/featured-media";
import PostHeader from "../post/post-header";
import { Box, useColorModeValue } from "@chakra-ui/react";

/**
 * The Post component that the TwentyTwenty theme uses for rendering any kind of
 * "post type" (posts, pages, attachments, etc.).
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const Page = ({ state }) => {
  const postData = getPostData(state);
  const linkColor = state.theme.colors.linkColor;
  const post = formatPostData(state, postData);
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Switch>
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
            left="15%"
          />
        </Box>
        <Home when={postData.route === "/"} post={post} postData={postData} />
        <OurWork
          when={postData.route === "/our-work/"}
          post={post}
          postData={postData}
        />
        <KnowUs
          when={postData.route === "/about/"}
          post={post}
          postData={postData}
          linkColor={linkColor}
        />
        {/* <DefaultPage when={data.isPage} /> */}
      </Switch>
    </LightPatternBox>
  );
};

export default connect(Page);
