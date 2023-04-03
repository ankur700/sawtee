import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Divider,
  SimpleGrid,
  Grid,
  GridItem,
  Container,
  useBreakpointValue,
  SkeletonText,
} from "@chakra-ui/react";
import { connect, styled, decode } from "frontity";
import {
  formatDate,
  formatDateWithMoment,
  formatPostData,
  getPostData,
} from "../../helpers";
import { LightPatternBox } from "../../styles/pattern-box";
import Section from "../../styles/section";
import FeaturedMedia from "./featured-media";
import useScrollProgress from "../../hooks/useScrollProgress";
import PostProgressBar from "./post-progressbar";
import PostCategories from "./post-categories";
import React, { useEffect } from "react";
import GlassBox from "../../atoms/glassBox";
import Title from "../../atoms/title";
import Link from "@frontity/components/link";
import Sidebar from "../archive/sidebar";
import SawteeInMediaWidget from "../../atoms/sawteeInMediaWidget";
import TwitterTimeline from "../../atoms/twitterTimeline";
import SubscriptionCard from "../../atoms/subscriptionCard";

const ProgramPost = ({ state, libraries, actions }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const linkColor = state.theme.colors.linkColor;
  // Get the html2react component.
  const [programs, setPrograms] = React.useState([]);
  const Html2React = libraries.html2react.Component;

  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.
  useEffect(() => {
    actions.source.fetch("/programme");
  }, []);

  const data = state.source.get("/programme");
  useEffect(() => {
    let array = [];
    if (data.isReady) {
      data.items.map((item) => {
        if (item.id !== post.id) {
          const post = state.source[item.type][item.id];
          array.push(post);
        }
      });
    }
    if (array.length > 0) {
      setPrograms([...array]);
    }
  }, [data.isReady]);

  const [ref, scroll] = useScrollProgress();

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;
  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      ref={ref}
    >
      <Box pb={{ base: "2rem", lg: "50px" }} maxW="5xl" mx="auto">
        <Box
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "3rem" }}
          color={useColorModeValue("gray.600", "whiteAlpha.600")}
        >
          <PostCategories
            color="black"
            categories={post.categories}
            justifyContent="center"
          />

          <Heading
            fontWeight="bold"
            size={"2xl"}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="uppercase"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue("primary.600", "accent.200")}
            textAlign={"center"}
          >
            Partner: {decode(post.acf.program_partner)}
          </Text>

          <Text fontSize="md" mt="12px" textAlign={"center"}>
            {formatDateWithMoment(
              post.acf.program_starting_date,
              "MMMM D YYYY"
            ) +
              " - " +
              formatDateWithMoment(post.acf.program_ending_date, "MMMM D YYYY")}
          </Text>
        </Box>
      </Box>

      <PostProgressBar value={scroll} />

      {/* Look at the settings to see if we should include the featured image */}
      <Section
        // bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        pb="80px"
        w="full"
        size={"lg"}
      >
        {post.featured_media != null && (
          <FeaturedMedia id={post.featured_media.id} />
        )}

        {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}

        <Grid
          templateColumns={"repeat(5,1fr)"}
          gap={6}
          placeItems={"center"}
          pt="50px"
        >
          <GridItem colSpan={3} placeSelf={"start"} display={"flex"}>
            <Content
              as={Section}
              px={{ base: "20px", md: "0" }}
              size="sm"
              // w="full"
              color={useColorModeValue(
                "rgba(12, 17, 43, 0.8)",
                "whiteAlpha.800"
              )}
            >
              <Html2React html={post.content} />
            </Content>
          </GridItem>

          <GridItem
            display="flex"
            flexDir="column"
            colSpan={2}
            gap={16}
            minW="md"
            w="full"
            maxW={"lg"}
          >
            <GlassBox py="4" px="8" rounded="2xl">
              <Title text={"Related Programs"} textAlign="center" mb={8} />

              {programs &&
                programs.map((item, index) => {
                  return (
                    <Stack spacing={2} mt="6" key={item.id} w="full">
                      <Heading
                        className="title"
                        fontSize={["sm", "md"]}
                        mb="2"
                        color={useColorModeValue("gray.700", "whiteAlpha.700")}
                        lineHeight={1.2}
                        fontWeight="bold"
                        _hover={{
                          color: linkColor ? linkColor : "primary.700",
                          textDecoration: "underline",
                        }}
                      >
                        <Link link={item.link}>
                          {decode(item.title.rendered)}
                        </Link>
                      </Heading>

                      <Divider
                        display={
                          index === programs.length - 1 ? "none" : "block"
                        }
                      />
                    </Stack>
                  );
                })}

              {programs.length < 1 && (
                <Stack spacing={6} mt="6" w="full">
                  <SkeletonText noOfLines={2} />
                  <SkeletonText noOfLines={1} />
                  <SkeletonText noOfLines={1} />
                </Stack>
              )}
            </GlassBox>

            <Sidebar>
              <GlassBox
                py="4"
                px="8"
                rounded="2xl"
                height="max-content"
                position={"sticky"}
                top={"8.5rem"}
              >
                <SubscriptionCard />
              </GlassBox>
            </Sidebar>
          </GridItem>
        </Grid>
      </Section>
    </LightPatternBox>
  );
};

export default connect(ProgramPost);

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled.div`
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
