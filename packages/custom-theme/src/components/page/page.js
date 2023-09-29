import { useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import { formatPostData, getPostData } from "./../helpers";
import { PageLayout } from "./../layouts/pageLayout";
import Section from "./../styles/section";
import { GlassBox, Content } from "./../atoms";
import KnowUs from "./knowUs";
import OurWork from "./ourWork";

const Page = ({ state, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const Html2React = libraries.html2react.Component;
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  const socialMenus = state.theme.socialLinks;
  const linkColor = state.theme.colors.linkColor;

  if (postData.route === "/about/") {
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
          <KnowUs post={post} Html2React={Html2React} linkColor={linkColor} />
        </Section>
      </PageLayout>
    );
  } else if (postData.route === "/our-work/") {
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
          size={"lg"}
          pt="50px"
          pb={"80px"}
          fontSize={["md", "lg", "xl"]}
          color={contentColor}
        >
          <OurWork post={post} Html2React={Html2React} />
        </Section>
      </PageLayout>
    );
  } else if (postData.route === "/contact/") {
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
          size={"lg"}
          pt="50px"
          pb={"80px"}
          fontSize={["md", "lg", "xl"]}
          color={contentColor}
        >
          <Contact
            post={post}
            Html2React={Html2React}
            socialMenus={socialMenus}
            linkColor={linkColor}
          />
        </Section>
      </PageLayout>
    );
  } else {
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
  }
};

export default connect(Page);
