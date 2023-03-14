import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { formatCPTData, getSrcSet } from "../../components/helpers";

const Home = ({ state, events, media, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const publicationSliders = post.acf?.publication_sliders;
  const introText = post.acf.about_section_intro;

  const linkColor = state.theme.colors.linkColor;
  console.log(data, post);

  const [eventsList, setEventsList] = useState([]);
  const [mediaImage, setMediaImage] = useState({});

  useEffect(() => {
    try {
      if (events) {
        let array = [];
        events.forEach((event) =>
          array.push(formatCPTData(state, event, categories))
        );
        setEventsList([...array]);
      }
      if (media) {
        const srcSet = getSrcSet(media);
        setMediaImage({
          id: media.id,
          alt: media.alt_text,
          src: media.source_url,
          srcSet,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [events, categories]);

  return (
    <>
      {slides && slides !== undefined && <CarouselSection data={slides} />}
      <AboutSection data={publicationSliders} intro={introText} />
      <InfoSection />
      <BlogSection data={eventsList} media={mediaImage} linkColor={linkColor} />
      <Box as="section" w="full">
        <Box h="500px" bg="orange">
          Upcoming Events section(Zoom meetings and physical programs info)
        </Box>
      </Box>
    </>
  );
};

export default connect(Home);
