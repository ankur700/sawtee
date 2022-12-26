import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import {
  fetchMedia,
  fetchData,
  fetchCategories,
} from "../../components/helpers";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const [events, setEvents] = useState([]);
  const [media, setMedia] = useState();
  const [publications, setPublications] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const categoriesApi =
      "https://sawtee.ankursingh.com.np/wp-json/wp/v2/categories?per_page=20";

    fetchCategories(categoriesApi, setCategories);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    // const controller = new AbortController();
    const eventsApi =
      "https://sawtee.ankursingh.com.np/wp-json/wp/v2/featured-events?per_page=6";
    const publicationsApi =
      "https://sawtee.ankursingh.com.np/wp-json/wp/v2/publications?per_page=9";

    if (categories.length > 0) {
      fetchData(publicationsApi, setPublications, state, categories);
      fetchData(eventsApi, setEvents, state, categories);
    }
    // return () => controller.abort();
  }, [categories]);

  useEffect(() => {
    // const controller = new AbortController();

    if (events.length > 0) {
      const id = events[0].featured_media;
      fetchMedia(id, setMedia);
    }
    // return () => controller.abort();
  }, [events]);
  return (
    <>
      <CarouselSection data={slides} />
      <AboutSection data={publications} />
      <InfoSection />
      <BlogSection data={events} media={media} />
      {/* <Section w="full">
        <Box h="500px" bg="orange">
          Multimedia Section(sawtee youtube videos
        </Box>
      </Section>
      <Section w="full">
        <Box h="500px" bg="orange">
          Latest Nesw section (In focus Section )
        </Box>
      </Section>
      <Section w="full">
        <Box h="500px" bg="orange">
          Upcoming Events section(Zoom meetings and physical programs info)
        </Box>
      </Section> */}
    </>
  );
};

export default connect(Home);
