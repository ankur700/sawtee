import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { formatCPTData } from "../../../helpers";
import React, { useEffect, useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

const Home = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const linkColor = state.theme.colors.linkColor;
  const introText = post.acf?.about_section_intro;
  const introImage = post.acf?.about_section_image;
  const [PublicationSlider, setPublicationSlider] = useState([]);

  const [eventsList, setEvetnsList] = useState([]);
  const [media, setMedia] = useState(null);

  const eventsData = state.source.get("/featured-events/");
  const tradeInsight = state.source.get("/publications/trade-insight/");
  const books = state.source.get("/publications/books/");
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  useEffect(() => {
    if (tradeInsight.isReady && books.isReady) {
      setPublicationSlider([
        {
          slider_title: post.acf.publication_slider[0].category_name,
          slider: tradeInsight.items,
        },
        {
          slider_title: post.acf.publication_slider[1].category_name,
          slider: books.items,
        },
      ]);
    }
  }, [tradeInsight, books]);

  useEffect(() => {
    eventsData.isReady &&
      eventsData.items.forEach((item, idx) => {
        const post = state.source[item.type][item.id];
        idx < 6 &&
          setEvetnsList((prev) => [
            ...prev,
            formatCPTData(state, post, categories),
          ]);
      });
  }, [eventsData]);

  useEffect(() => {
    if (eventsList.length > 0) {
      setMedia({
        alt: eventsList[0].featured_media.alt,
        src: eventsList[0].featured_media.src,
        srcSet: eventsList[0].featured_media.srcSet,
      });
    }
  }, [eventsList]);


  /*

    ? Question
    TODO: Load webP image in About Section
  */

  return (
    <>
      <CarouselSection data={slides} />
      {PublicationSlider && (
        <AboutSection
          intro={introText}
          image={introImage.sizes.medium_large}
          PublicationSlider={PublicationSlider}
          show={show}
          categories={categories}
        />
      )}
      <InfoSection />
      <BlogSection linkColor={linkColor} media={media} events={eventsList} />
      {/* <Newsletter /> */}
    </>
  );
};

export default connect(Home);
