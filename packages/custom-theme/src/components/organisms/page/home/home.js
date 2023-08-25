import { connect } from "frontity";
import { useEffect } from "react";
import { useBreakpointValue, Box } from "@chakra-ui/react";
import AboutSection from "./aboutSection";
import InfoSection from "./infoSection";
import BlogSection from "./blogSection";
import { FullWidthCarousel } from "../../../atoms/carousels";
import { InFocusSection } from "./infocusSection";

const Home = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const introText = post.acf?.about_section_intro;
  const introImage = post.acf?.about_section_image;
  const tradeInsight = state.source.get("/publications/trade-insight/");
  const books = state.source.get("/publications/books/");
  const eventsData = state.source.get("/events/");
  const infocus = state.source.get("/in-focus/");
  const linkColor = state.theme.colors.linkColor;
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  useEffect(() => {
    actions.source.fetch("/events/");
    actions.source.fetch("/in-focus/");
  }, []);

  /*

    ? Question
    TODO: Load webP image in About Section
  */

  return (
    <>
      <FullWidthCarousel id="carousel-section" slides={slides} loop={true} />

      <AboutSection
        tradeInsight={tradeInsight}
        books={books}
        categories={categories}
        intro={introText}
        image={introImage.sizes.large}
        show={show}
      />

      <InfoSection />

      <BlogSection
        linkColor={linkColor}
        eventsData={eventsData}
        categories={categories}
      />

      {infocus.isReady && (
        <InFocusSection
          articles={infocus.items}
          state={state}
          categories={categories}
        />
      )}
    </>
  );
};

export default connect(Home);


