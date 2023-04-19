import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";

const Home = ({ state, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const linkColor = state.theme.colors.linkColor;
  const introText = post.acf?.about_section_intro;
  const introImage = post.acf?.about_section_image;
  const Publication_categories = post.acf?.publication_sliders;

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
        categories={categories}
        Publication_categories={Publication_categories}
      />
      <InfoSection />
      <BlogSection linkColor={linkColor} categories={categories} />
    </>
  );
};

export default connect(Home);
