import { connect } from "frontity";
import { formatPostData, getPostData } from "../../helpers";
import KnowUs from "./KnowUs";
import OurWork from "./OurWork";
import Contact from "./contact/contact";
// import Career from "./career/career";
import Switch from "@frontity/components/switch";
import { LightPatternBox } from "../../styles/pattern-box";
import FeaturedMedia from "../post/featured-media";
import PostHeader from "../post/post-header";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Loading from "../../atoms/loading";
import DefaultPage from "./defaultPage";

const Page = ({ state }) => {
  const data = getPostData(state);
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const post = formatPostData(state, data);

  if (!data.isReady) return <Loading />;

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
          isPage={data.isPage}
          position="absolute"
          bottom="15%"
          left="5%"
        />
      </Box>
      <Switch>
        <OurWork when={data.route === "/our-work/"} data={data} />
        <KnowUs when={data.route === "/about/"} data={data} />
        <Contact when={data.route === "/contact/"} data={data} />
        <DefaultPage data={data} />
      </Switch>
    </LightPatternBox>
  );
};

export default connect(Page);
