import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Text,
  Stack,
  Divider,
  CheckboxGroup,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { connect, styled } from "frontity";
import Link from "../../components/atoms/link";
import React, { useState, useEffect, useMemo } from "react";
import List from "../../components/organisms/archive";
import useScrollProgress from "../../components/hooks/useScrollProgress";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import FeaturedMedia from "../../components/organisms/post/featured-media";
import PostHeader from "../../components/organisms/post/post-header";
import PostProgressBar from "../../components/organisms/post/post-progressbar";
import { getPostData, formatPostData } from "../../components/helpers";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import { postdata, featuredEvents } from "../../data";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import Title from "../../components/atoms/title";
import GlassBox from "../../components/atoms/glassBox";
import moment from "moment/moment";
import { Publications } from "../../data";

const Publication = ({ state, actions, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const [list, setList] = useState([]);

  const [selectedPublications, setSelectedPublications] = useState();

  const defaultList = () => {
    let array = [];
    Publications.map((publication) => {
      array.push(publication);
    });
    return array;
  };

  const handleChange = (event) => {
    setSelectedPublications(event.target.value);
  };

  function getFilteredPublications() {
    if (!selectedPublications) {
      return list;
    }
    return list.filter(
      (publication) => publication.title === selectedPublications
    );
  }

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.
  useEffect(() => {
    setList(defaultList);
    actions.source.fetch("/");
    List.preload();
  }, []);

  var filteredList = useMemo(getFilteredPublications, [
    selectedPublications,
    list,
  ]);

  const [ref, scroll] = useScrollProgress();

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.900")}
      showPattern={state.theme.showBackgroundPattern}
      ref={ref}
      pt="0"
    >
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

      <PostProgressBar value={scroll} />

      <Section
        bg={useColorModeValue("transparent")}
        size="lg"
        mb="8"
        h="auto"
        px={{ base: "32px", md: "0" }}
        py="6"
        display="flex"
        gap="4"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <CheckboxGroup colorScheme="blue" defaultValue={["all"]}>
          <Stack
            spacing={[1, 5]}
            rowGap="4"
            direction={["column", "row"]}
            wrap="wrap"
            alignItems={"center"}
            justifyContent="center"
          >
            <Button colorScheme={"primary"} variant="outline">
              <Checkbox value="all">All</Checkbox>
            </Button>
            {Publications.map(({ title, id }) => {
              return (
                <Button colorScheme={"primary"} variant="outline">
                  <Checkbox
                    key={id}
                    value={title}
                    onChange={(event) => handleChange(event)}
                  >
                    {title}
                  </Checkbox>
                </Button>
              );
            })}
          </Stack>
        </CheckboxGroup>
      </Section>

      <Section
        bg={useColorModeValue("whiteAlpha.800", "gray.800")}
        pb="80px"
        size="xl"
      >
        <Box
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="xl"
          pt="50px"
          fontSize={["md", "lg", "xl"]}
          color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
        >
          <SimpleGrid
            templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
            spacing="8"
            pos={"relative"}
          >
            <Stack spacing={8}>
              {filteredList.map(({ title, id }) => {
                return (
                  <Stack key={id} spacing="4">
                    <Title text={title} mb="3" />
                    <MultiItemCarousel slides={postdata} />
                  </Stack>
                );
              })}
            </Stack>
            <Sidebar data={featuredEvents} title="Sawtee in Media" />
          </SimpleGrid>
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Publication);

export const Sidebar = ({ data, title }) => {
  return (
    <GlassBox
      py="4"
      px="8"
      rounded="2xl"
      pos="sticky"
      top="7.5rem"
      height="max-content"
    >
      <Title text={title} textAlign="center" />
      <Stack spacing={8} mt="6">
        {data.map((event, index) => {
          const format = "MMMM Do YYYY";
          const formatedDate = moment(event.date).format(format);
          return (
            <Stack key={index}>
              <Text className="title" lineHeight={"normal"}>
                <Link
                  link={"#"}
                  color={useColorModeValue("primary.700", "primary.50")}
                >
                  {event.title}
                </Link>
              </Text>
              <Box
                display={"flex"}
                justifyContent="space-between"
                fontSize={"sm"}
                fontWeight="semibold"
              >
                <Text>{event.publisher}</Text>
                <Box
                  as="time"
                  dateTime={new Date(event.date).toLocaleDateString()}
                >
                  {formatedDate}
                </Box>
              </Box>
              <Divider display={index === data.length - 1 ? "none" : "block"} />
            </Stack>
          );
        })}
      </Stack>
    </GlassBox>
  );
};
