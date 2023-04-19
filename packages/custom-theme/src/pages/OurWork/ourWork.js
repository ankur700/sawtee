import {
  Box,
  Button,
  Container,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "@frontity/components/link";
import { connect, decode, styled } from "frontity";
import React from "react";
import { formatPostData, getPostData } from "../../components/helpers";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import GlassBox from "../../components/atoms/glassBox";

const OurThemes = [
  {
    name: "COVID 19",
    href: "#",
  },
  {
    name: "Trade and Climate Change",
    href: "#",
  },
  {
    name: "Theme",
    href: "#",
  },
  {
    name: "Theme",
    href: "#",
  },
  {
    name: "Financial Mangement",
    href: "#",
  },
  {
    name: "Remittance and Development",
    href: "#",
  },
];

const OurWork = ({ state, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const sectors = post.acf.sectors;
  const intro = post.acf.intro;
  const Html2React = libraries.html2react.Component;

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.700", "gray.700")}
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
          left="15%"
        />
      </Box>
      <Section size="lg" marginBlock={6}>
        <GlassBox
          h="auto"
          px={{ base: "32px", md: "16px" }}
          size="md"
          py="6"
          display="flex"
          gap="4"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          boxShadow={"md"}
        >
          {OurThemes.map((theme, index) => {
            return (
              <Link
                key={index}
                link={theme.href}
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  px="10"
                  size="sm"
                  colorScheme={"primary"}
                  color={useColorModeValue("gray.700", "whiteAlpha.700")}
                  variant="outline"
                >
                  {theme.name}
                </Button>
              </Link>
            );
          })}
        </GlassBox>
      </Section>
      ;
      {/* Look at the settings to see if we should include the featured image */}
      <GlassBox as={Section} mb="50px" border="none" size={"lg"}>
        {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
        <Content
          as={Section}
          px={{ base: "32px", md: "16px" }}
          size="lg"
          paddingBlock="50px"
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.700")}
        >
          <Container
            // className="intro"
            pos="relative"
            mb="20"
            maxW="2xl"
            centerContent
          >
            <Box textAlign="center">
              <Html2React html={intro} fontSize={["lg", "2xl"]} />
            </Box>
          </Container>
          <Box
            display="flex"
            flexDir={{ base: "column", md: "row" }}
            justifyContent="center"
            gap="10"
          >
            {sectors.map(({ title, content, bg_image, link }) => {
              return (
                <LinkBox
                  href={link}
                  pos="relative"
                  h={{ base: "450px", lg: "550px" }}
                  className="cards"
                  width={{ base: "100%", lg: "48%" }}
                  backgroundImage={`url(${bg_image})`}
                  backgroundRepeat="no-repeat"
                  bgColor={"rgba(0,0,0,0.3)"}
                  backgroundBlendMode="overlay"
                  border="3px solid"
                  borderColor={useColorModeValue("gray.700", "whiteAlpha.700")}
                  overflow="hidden"
                  key={title}
                  rounded="xl"
                  display="flex"
                  flexDir={"column"}
                  style={{ backgroundSize: "cover", aspectRatio: "16/9" }}
                  __hover={{
                    backgroundFilter: "blur(5px)",
                  }}
                >
                  <Heading
                    as="h4"
                    className="title"
                    textAlign={"center"}
                    // height="20%"
                    py={{ base: 4, lg: 8 }}
                  >
                    <LinkOverlay color={"whiteAlpha.700"} href={link}>
                      {decode(title)}
                    </LinkOverlay>
                  </Heading>
                  <Text
                    className="content"
                    flex={1}
                    height={"auto"}
                    display="flex"
                    alignItems={"center"}
                    fontSize={{ base: "lg", md: "lg", lg: "xl" }}
                    fontWeight="bold"
                    px={{ base: 4, lg: 10 }}
                    opacity="0"
                    textAlign={"center"}
                  >
                    {decode(content)}
                  </Text>
                </LinkBox>
              );
            })}
          </Box>
        </Content>
      </GlassBox>
      ;
    </LightPatternBox>
  );
};

export default connect(OurWork);

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled(Box)`
  @media (min-width: 420px) {
    & .cards {
      & .title {
        color: white !important;
        z-index: 1;
      }

      & .content {
        z-index: 1;
      }
      &:hover {
        transition: all 0.4s ease-in-out;
        & .title {
          background: hsl(194, 100%, 25%, 0.4);
        }
        & .content {
          // color: #463737;
          color: rgb(0, 0, 0);
          background: hsl(0, 17%, 95%, 0.4);
          opacity: 1;
        }
      }
    }
    // a {
    //   color: #006181;
    //   text-decoration: none;

    //   &:hover,
    //   &:focus {
    //     text-decoration: underline;
    //     text-decoration-style: dotted;

    //     text-decoration-thickness: 2px;
    //     text-underline-offset: 3px;
    //   }
    // }
  }
`;
