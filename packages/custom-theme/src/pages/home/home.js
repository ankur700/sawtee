import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { fetcher, formatCPTData, getSrcSet } from "../../components/helpers";
import useSWR from "swr";

const Home = ({ state, events, media, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const publicationSliders = post.acf?.publication_sliders;
  const linkColor = state.theme.colors.linkColor;
  const introText = post.acf.about_section_intro;

  const [eventsList, setEventsList] = useState([]);
  const [mediaImage, setMediaImage] = useState({});

  useEffect(() => {
    setTimeout(() => {
      const array = [...eventsList];

      events?.forEach((post) => {
        array.push(formatCPTData(state, post, categories));
      });

      media
        ? setMediaImage({
            id: media.id,
            alt: media.alt_text,
            src: media.source_url,
            srcSet: getSrcSet(media),
          })
        : setMediaImage({});

      if (array.length.length > 0) {
        setEventsList([...array]);
      }
    }, 1000);

    return () => {
      clearTimeout();
    };
  }, [events, categories]);

  console.log(publicationSliders);

  function truthy(value) {
    return value !== undefined && value !== null && value.length > 0;
  }
  return (
    <>
      {truthy(slides) && <CarouselSection data={slides} />}
      {truthy(publicationSliders) && truthy(introText) && (
        <AboutSection data={publicationSliders} intro={introText} />
      )}
      <InfoSection />
      {truthy(eventsList) && (
        <BlogSection
          data={eventsList}
          media={mediaImage}
          linkColor={linkColor}
        />
      )}
    </>
  );
};

export default connect(Home);
