import { styled } from "frontity";

const Slider = ({ slides }) => {
  return (
    <>
      <SliderWrapper>
        {slides?.map((slide, i) => {
          return (
            <SliderInner key={i} style={{}}>
              <SliderImage src={slide.slide_image} alt="" />
            </SliderInner>
          );
        })}
      </SliderWrapper>
    </>
  );
};

const SliderWrapper = styled.div`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  height: calc(100vh - 12.5rem);
  background: hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
`;

const SliderInner = styled.div`
  display: inline-block;
  width: 100%;
`;

const SliderImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
  display: block;
`;

export default Slider;
