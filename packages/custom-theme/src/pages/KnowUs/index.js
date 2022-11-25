import {
  Box,
  Divider,
  Text,
  useColorModeValue,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { connect, styled } from "frontity";
import React, { useEffect } from "react";
import List from "../../components/organisms/archive";
import useScrollProgress from "../../components/hooks/useScrollProgress";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import AuthorBio from "../../components/organisms/post/author-bio";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import PostProgressBar from "../../components/organisms/post/post-progressbar";
import { getPostData, formatPostData } from "../../components/helpers";

const KnowUs = ({ state, actions, libraries }) => {
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

  const PageSection = ({ section }) => {
    const { contentRepeater, title, content, hasTabOrHasAccordian } = section;
    return (
      <Box my="4">
        <Text
          as="h3"
          fontSize={["2xl", "3xl", "4xl"]}
          fontFamily="heading"
          py={"4"}
          mb="4"
        >
          {title}
        </Text>
        {hasTabOrHasAccordian ? (
          title !== "Strategies" ? (
            <Tabs variant="enclosed" size="md" isFitted colorScheme="primary">
              <TabList>
                {contentRepeater.map(({ tabTitle }) => (
                  <Tab key={tabTitle}>
                    <Text
                      fontSize={["lg", "xl"]}
                      fontWeight="semibold"
                      fontFamily={"heading"}
                    >
                      {tabTitle}
                    </Text>
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                {contentRepeater.map(({ tabContent }, index) => (
                  <TabPanel
                    px={["5", "10"]}
                    key={index}
                    border={"1px solid #b5bdcc"}
                    display="flex"
                    py={["2", "4"]}
                    minH="250px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Html2React html={tabContent} />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          ) : (
            <Accordion allowToggle>
              {contentRepeater.map(({ tabTitle, tabContent }) => {
                return (
                  <AccordionItem key={tabTitle} border="none">
                    <AccordionButton
                      size="lg"
                      py="4"
                      _expanded={{
                        bg: useColorModeValue(
                          "rgba(0, 0, 0, 0.1)",
                          "rgba(0,0,0,0.3)"
                        ),
                      }}
                    >
                      <Text
                        as="h4"
                        fontSize={"2xl"}
                        flex="1"
                        textAlign="left"
                        fontFamily={"roboto"}
                      >
                        {tabTitle}
                      </Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={["5", "10"]}>
                      <Html2React html={tabContent} />
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )
        ) : (
          <Box>
            <Html2React html={content} />
          </Box>
        )}
        <Divider my="60px" />
      </Box>
    );
  };

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.900")}
      showPattern={state.theme.showBackgroundPattern}
      ref={ref}
    >
      <Box pb={{ base: "2rem", lg: "50px" }}>
        <PostHeader
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={useColorModeValue("gray.700", "whiteAlpha.700")}
          categories={post.categories}
          heading={post.title}
          author={post.author}
          date={post.publishDate}
          isPage={postData.isPage}
        />
      </Box>

      <PostProgressBar value={scroll} />

      {/* Look at the settings to see if we should include the featured image */}
      <Section
        bg={useColorModeValue("whiteAlpha.600", "gray.800")}
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
          fontFamily="openSans"
          fontWeight="normal"
          fontSize={["lg", "xl", "xl"]}
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          {/* <Html2React html={post.content} /> */}
          {post.sections.map((section) => (
            <PageSection key={section.title} section={section} />
          ))}
        </Content>
      </Section>
    </LightPatternBox>
  );
};

export default connect(KnowUs);

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled.div`
  // color: rgba(12, 17, 43, 0.8);
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
