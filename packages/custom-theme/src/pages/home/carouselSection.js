import Section from "../../components/atoms/section";
import FullWidthCarousel from "../../components/molecules/fullWIdthCarousel";

const CarouselSection = ({ data }) => {
  return (
    <Section id="carousel-section" width="full">
      <FullWidthCarousel slides={data} loop={true} />
    </Section>
  );
};

export default CarouselSection;
