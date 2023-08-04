import FullWidthCarousel from "../../../molecules/fullWIdthCarousel";

const CarouselSection = ({ data }) => {
  return (
    <Box id="carousel-section" width="full">
      <FullWidthCarousel slides={data} loop={true} />
    </Box>
  );
};

export default CarouselSection;
