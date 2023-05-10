import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { Newsletter } from "../../components/atoms/newsletter";
import { formatCPTData, getPublicationSliders } from "../../components/helpers";
import React, { useEffect, useState } from "react";

const Home = ({ state, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const linkColor = state.theme.colors.linkColor;
  const introText = post.acf?.about_section_intro;
  const introImage = post.acf?.about_section_image;
  const Publication_categories = post.acf?.publication_slider;
  const [PublicationSlider, setPublicationSlider] = useState([]);

  const eventsData = state.source.get("/featured-events");
  const [eventsList, setEvetnsList] = useState([]);
  const [media, setMedia] = useState(null);

  // useEffect(() => {
  //   actions.source.fetch("/featured-events");
  // }, []);

  useEffect(() => {
    if (eventsData.isReady) {
      let eventsArray = [];
      eventsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        eventsArray.push(formatCPTData(state, post, categories));
      });

      if (eventsArray.length > 0) {
        setEvetnsList([...eventsArray]);
      }
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

  const getCategoryPost = (item) => {
    let data = state.source["publications"][item];
    let post = getPublicationSliders(state, data, categories);
    return post;
  };

  useEffect(() => {
    let array1 = [];
    let array2 = [];
    if (Publication_categories.length > 1) {
      Publication_categories[0].category_posts.map((item) => {
        let post = getCategoryPost(item);
        array1.push(post);
      });
      Publication_categories[1].category_posts.map((item) => {
        let post = getCategoryPost(item);
        array2.push(post);
      });
    }

    if (array1.length > 0) {
      setPublicationSlider((prevValue) => [
        ...prevValue,
        {
          slider_title: Publication_categories[0].category_name,
          slider: [...array1],
        },
      ]);
    }
    if (array2.length > 0) {
      setPublicationSlider((prevValue) => [
        ...prevValue,
        {
          slider_title: Publication_categories[1].category_name,
          slider: [...array2],
        },
      ]);
    }
  }, [Publication_categories]);

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
