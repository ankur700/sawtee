import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import { postdata, policyOutreach } from "../../data";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { Box } from "@chakra-ui/react";
import Section from "../../components/atoms/section";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;

  return (
    <>
      <CarouselSection data={slides} />
      <AboutSection postdata={postdata} />
      <InfoSection />
      <BlogSection data={policyOutreach} />
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
