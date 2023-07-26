import Section from "../../../atoms/section";
import FullWidthCarousel from "../../../molecules/fullWIdthCarousel";

const CarouselSection = ({ data }) => {
  return (
    <Section id="carousel-section" width="full">
      <FullWidthCarousel slides={data} loop={true} />
    </Section>
  );
};

export default CarouselSection;
