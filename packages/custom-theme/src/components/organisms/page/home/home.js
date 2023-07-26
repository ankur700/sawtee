import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { formatCPTData, getPublicationSliders } from "../../../helpers";
import React, { useEffect, useState } from "react";

const Home = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const linkColor = state.theme.colors.linkColor;
  const introText = post.acf?.about_section_intro;
  const introImage = post.acf?.about_section_image;
  const Publication_categories = post.acf?.publication_slider;
  const [PublicationSlider, setPublicationSlider] = useState([]);
  const [CategoryOnePosts, setCategoryOnePosts] = useState([]);
  const [CategoryTwoPosts, setCategoryTwoPosts] = useState([]);

  const eventsData = state.source.get("/events");
  const [eventsList, setEvetnsList] = useState([]);
  const [media, setMedia] = useState(null);

  const CategoryOne = state.source.get(
    `/publications/${Publication_categories[0].category_slug}/`
  );
  const CategoryTwo = state.source.get(
    `/publications/${Publication_categories[1].category_slug}/`
  );

  useEffect(() => {
    Publication_categories.map((cat) => {
      actions.source.fetch(`/publications/${cat.category_slug}`);
    });
  }, [Publication_categories]);

  useEffect(() => {
    if (eventsData.isReady) {
      eventsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        setEvetnsList((prev) => [
          ...prev,
          formatCPTData(state, post, categories),
        ]);
      });
    }
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

  useEffect(() => {
    if (CategoryOne.isReady) {
      CategoryOne.items.map((item) => {
        let post = state.source["publications"][item.id];
        setCategoryOnePosts((prev) => [
          ...prev,
          getPublicationSliders(state, post, categories),
        ]);
      });
    }
  }, [CategoryOne.isReady]);

  useEffect(() => {
    if (CategoryTwo.isReady) {
      CategoryTwo.items.map((item) => {
        let post = state.source["publications"][item.id];
        setCategoryTwoPosts((prev) => [
          ...prev,
          getPublicationSliders(state, post, categories),
        ]);
      });
    }
  }, [CategoryTwo.isReady]);

  useEffect(() => {
    if (CategoryOnePosts.length > 0 && CategoryTwoPosts.length > 0) {
      Publication_categories.map((cat, idx) => {
        setPublicationSlider((prev) => [
          ...prev,
          {
            slider_title: cat.category_name,
            slider: idx === 0 ? CategoryOnePosts : CategoryTwoPosts,
          },
        ]);
      });
    }
  }, [CategoryOnePosts, CategoryTwoPosts]);

  /*

    ? Question
    TODO: Load webP image in About Section
  */

  return (
    <>
      <CarouselSection data={slides} />
      <AboutSection
        intro={introText}
        image={introImage.sizes.medium_large}
        PublicationSlider={PublicationSlider}
      />
      <InfoSection />
      <BlogSection linkColor={linkColor} media={media} events={eventsList} />
      {/* <Newsletter /> */}
    </>
  );
};

export default connect(Home);
