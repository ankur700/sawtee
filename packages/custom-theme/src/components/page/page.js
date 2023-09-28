import { useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import { formatPostData } from "./../helpers";
import { PageLayout } from "./../layouts/pageLayout";
import Section from "./../styles/section";
import { GlassBox, Content } from "./../atoms";
import KnowUs from "./knowUs";
import OurWork from "./ourWork";

const Page = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = formatPostData(state, data);
  const Html2React = libraries.html2react.Component;
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  return (
    <PageLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      title={post.title}
      featured_media={post.featured_media}
      isPage={data.isPage}
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
        {data.route === "/about/" && <KnowUs />}
        {data.route === "/our-work/" && <OurWork />}
        {data.route === "/contact/" && <Contact />}

        {data.route !== "/about/" ||
          "/our-work/" ||
          ("/contact/" && (
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
          ))}
      </Section>
    </PageLayout>
  );
};

export default connect(Page);
