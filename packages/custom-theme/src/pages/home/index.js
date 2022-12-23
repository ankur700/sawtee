import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import { postdata } from "../../data";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { formatEventData } from "../../components/helpers";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const eventsApi =
      "https://sawtee.ankursingh.com.np/wp-json/wp/v2/featured-events?per_page=6";

    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const results = await response.json();
        let eventsArray = [];
        results.forEach((result) => {
          eventsArray.push(formatEventData(state, result));
        });
        if (mounted) {
          setEvents([...eventsArray]);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchData(eventsApi);
    return () => controller.abort();
  }, []);

  return (
    <>
      <CarouselSection data={slides} />
      <AboutSection postdata={postdata} />
      <InfoSection />
      <BlogSection data={events} />
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
