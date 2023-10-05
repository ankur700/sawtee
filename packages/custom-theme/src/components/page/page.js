import { useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import { formatPostData, getPostData } from "./../helpers";
import { PageLayout } from "./../layouts/pageLayout";
import Section from "./../styles/section";
import { GlassBox, Content } from "./../atoms";
import KnowUs from "./knowUs";
import OurWork from "./ourWork";
import Switch from "@frontity/components/switch";

const Page = ({ state, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const Html2React = libraries.html2react.Component;
  const contentColor = useColorModeValue(
    "var(--color-dark)",
    "var(--color-light)"
  );

  const socialMenus = state.theme.socialLinks;
  const linkColor = state.theme.colors.linkColor;
  return (
    <PageLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      title={post.title}
      featured_media={post.featured_media}
      isPage={postData.isPage}
    >
      <Section
        px={{ base: "32px", md: "0" }}
        w="full"
        size={"huge"}
        pt="50px"
        pb={"80px"}
        fontSize={["md", "lg", "xl"]}
        color={contentColor}
      >
        <Switch>
          <KnowUs
            when={postData.route === "/about/"}
            post={post}
            Html2React={Html2React}
            linkColor={linkColor}
          />
          <OurWork
            when={postData.route === "/our-work/"}
            post={post}
            Html2React={Html2React}
          />
          <DefaultPage
            when={postData !== ("/about/" || "/our-work/")}
            content={post.content}
          />
        </Switch>
      </Section>
    </PageLayout>
  );
};

export default connect(Page);

const DefaultPage = ({ Html2React, content }) => {
  return (
    <Content
      as={GlassBox}
      px={["4", "8"]}
      maxW="5xl"
      paddingBlock="50px"
      fontSize={["sm", "md"]}
    >
      <Html2React html={content} />
    </Content>
  );
};