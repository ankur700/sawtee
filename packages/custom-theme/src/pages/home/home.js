import { connect } from "frontity";
import CarouselSection from "./carouselSection";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { fetcher } from "../../components/helpers";
import useSWR from "swr";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const linkColor = state.theme.colors.linkColor;
  const introText = post.acf.about_section_intro;
  const Publication_categories = post.acf.publication_sliders;

  const { data: categories } = useSWR(
    "https://sawtee.org/backend/wp-json/wp/v2/categories?per_page=25",
    fetcher
  );

  return (
    <>
      <CarouselSection data={slides} />
      <AboutSection
        intro={introText}
        categories={categories}
        Publication_categories={Publication_categories}
      />
      <InfoSection />
      <BlogSection linkColor={linkColor} categories={categories} />
    </>
  );
};

export default connect(Home);
