import React, { useState, useEffect } from "react";
import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import {
  fetcher,
  formatCPTData,
  getSrcSet,
} from "../../components/helpers";
import useSWR from "swr";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const publicationSliders = post.acf.publication_sliders;
  const eventsApi =
    "https://sawtee.ankursingh.com.np/wp-json/wp/v2/featured-events?per_page=6";
  const introText = post.acf.about_section_intro;
  const { data: categories } = useSWR(
    `https://sawtee.ankursingh.com.np/wp-json/wp/v2/categories?per_page=20`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: events } = useSWR(eventsApi, fetcher, {
    revalidateOnFocus: false,
  });

  const { data: media } = useSWR(
    () =>
      `https://sawtee.ankursingh.com.np/wp-json/wp/v2/media/` +
      events[0].featured_media,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [eventsList, setEventsList] = useState([]);
  const [mediaImage, setMediaImage] = useState({});

  useEffect(() => {
    if (categories && events) {
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
  }, [events, media, categories]);

  return (
    <>
      <CarouselSection data={slides} />
      <AboutSection data={publicationSliders} intro={introText} />
      <InfoSection />
      <BlogSection data={eventsList} media={mediaImage} />
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
