import Section from "../../components/atoms/section";
import FullWidthCarousel from "../../components/molecules/fullWIdthCarousel";

const CarouselSection = ({ data }) => {
  return (
    <Section
      id="carousel-section"
      width="full"
      mt={{ base: "5.5rem", md: "6.5rem" }}
    >
      <FullWidthCarousel slides={data} loop={true} />
    </Section>
  );
};

export default CarouselSection;
