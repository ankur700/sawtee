import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import { postdata, policyOutreach } from "../../data";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { Box } from "@chakra-ui/react";
import Section from "../../components/atoms/section";
import { formatPostData } from "../../components/helpers";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsurl =
      "https://sawtee.ankursingh.com.np/wp-json/wp/v2/featured-events?per_page=6";

    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        setEvents(result);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchData(eventsurl);
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
