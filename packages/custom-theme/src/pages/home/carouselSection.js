import Carousel from "../../components/organisms/carousel/carousel";
import Section from "../../components/atoms/reusable/section/section";

const CarouselSection = ({ data }) => {
  return (
    <Section id="carousel-section" width="full" mt="6.5rem">
      <Carousel data={data} slidesToShow={1} enableCaption={true} dots={true} />
    </Section>
  );
};

export default CarouselSection;
