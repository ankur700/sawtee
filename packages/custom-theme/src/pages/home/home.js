import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import {
  getPublicationSliders,
  formatCPTData,
  getSrcSet,
  fetcher,
} from "../../components/helpers";
import useSWR from "swr";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const linkColor = state.theme.colors.linkColor;
  const introText = post.acf.about_section_intro;

  // const [eventsList, setEventsList] = useState([]);
  // const [mediaImage, setMediaImage] = useState({});
  // const [publicationSliders, setPublicationSliders] = useState([]);

  const { data: categories } = useSWR(
    "https://sawtee.org/backend/wp-json/wp/v2/categories?per_page=25",
    fetcher
  );
  // const { data: events } = useSWR(
  //   "https://sawtee.org/backend/wp-json/wp/v2/featured-events?per_page=6&order=asc",
  //   fetcher
  // );
  // const { data: media } = useSWR(
  //   () =>
  //     `https://sawtee.org/backend/wp-json/wp/v2/media/` +
  //     events[0].featured_media,
  //   fetcher
  // );

  // const { data: cat1 } = useSWR(
  //   "https://sawtee.org/backend/wp-json/wp/v2/publications?categories=8&per_page=6",
  //   fetcher
  // );
  // const { data: cat2 } = useSWR(
  //   "https://sawtee.org/backend/wp-json/wp/v2/publications?categories=9&per_page=6",
  //   fetcher
  // );

  // useEffect(() => {
  //   setTimeout(() => {
  //     const array = [...eventsList];

  //     events?.forEach((post) => {
  //       array.push(formatCPTData(state, post, categories));
  //     });

  //     media
  //       ? setMediaImage({
  //           id: media.id,
  //           alt: media.alt_text,
  //           src: media.source_url,
  //           srcSet: getSrcSet(media),
  //         })
  //       : setMediaImage({});

  //     if (array.length.length > 0) {
  //       setEventsList([...array]);
  //     }

  //     // if (cat1 && cat2) {
  //     //   let array1 = [];
  //     //   let array2 = [];

  //     //   cat1.forEach((item) => {
  //     //     array1.push(getPublicationSliders(state, item, categories));
  //     //   });
  //     //   cat2.forEach((item) => {
  //     //     array2.push(getPublicationSliders(state, item, categories));
  //     //   });

  //     //   setPublicationSliders([
  //     //     {
  //     //       slider_title: array1[0].categories.filter((cat) => cat.id !== 5)[0]
  //     //         .name,
  //     //       slider: [...array1],
  //     //     },
  //     //     {
  //     //       slider_title: array2[0].categories.filter((cat) => cat.id !== 5)[0]
  //     //         .name,
  //     //       slider: [...array2],
  //     //     },
  //     //   ]);
  //     // }
  //   }, 1000);

  //   return () => {
  //     clearTimeout();
  //   };
  // }, [events, categories]);

  // console.log(eventsList, categories);

  function truthy(value) {
    return value !== undefined && value !== null && value.length > 0;
  }
  return (
    <>
      <CarouselSection data={slides} />

      <AboutSection intro={introText} categories={categories} />

      <InfoSection />

      <BlogSection linkColor={linkColor} />
    </>
  );
};

export default connect(Home);
