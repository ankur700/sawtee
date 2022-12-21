import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import React, { useState, useEffect } from "react";
import useScrollProgress from "../../hooks/useScrollProgress";
import { LightPatternBox } from "../../styles/pattern-box";
import Section from "../../styles/section";
import PostProgressBar from "../../organisms/post/post-progressbar";
import { Publications } from "../../../data";
import PublicationFilter from "./publicationFilter";
import Sidebar from "./sidebar";
import PublicationSliders from "./publicationSliders";
import { featuredEvents } from "../../../data";
import Loading from "../../atoms/loading";
import Publication1 from "../../../assets/publications-1.jpg";

const PublicationsArchive = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);

  const [filteredCategory, setFilteredData] = useState([]);
  const linkColor = state.theme.colors.linkColor;

  // const filterCategory = (event, title) => {
  //   const newCategories = Array.from(new Set([...filteredData]));
  //   if (event.target.checked) {
  //     newCategories.push({ title: title });
  //     setFilteredData([...newCategories]);
  //   } else {
  //     setFilteredData(
  //       Array.from(newCategories.filter((item) => item.title !== title))
  //     );
  //   }
  // };

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.
  useEffect(() => {
    setFilteredData(Publications);
  }, []);

  // Load the post, but only if the data is ready.
  if (!data.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        <Box
          as="figure"
          mt={4}
          height="500px"
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
        >
          <Box as={Image} boxSize="100%" objectFit="cover" src={Publication1} />
        </Box>

        <Box
          textAlign="center"
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"3xl"}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="uppercase"
          >
            {data.type}
          </Heading>
        </Box>
      </Box>

      <PublicationFilter data={filteredCategory} linkColor={linkColor} />

      <Section
        bg={useColorModeValue("whiteAlpha.700", "gray.700")}
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
            {!filteredCategory.length ? (
              <Loading />
            ) : (
              <PublicationSliders data={filteredCategory} />
            )}
            <Sidebar
              data={featuredEvents}
              title="Sawtee in Media"
              showSawteeInMedia={true}
              showTwitterTimeline={true}
              showSubscriptionCard={true}
            />
          </SimpleGrid>
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(PublicationsArchive);
