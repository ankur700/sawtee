import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import { postdata, featuredEvents } from "../../data";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;

  return (
    <>
      <CarouselSection data={slides} />
      <AboutSection postdata={postdata} />
      <InfoSection />
      <BlogSection data={featuredEvents} />
    </>
  );
};

export default connect(Home);
