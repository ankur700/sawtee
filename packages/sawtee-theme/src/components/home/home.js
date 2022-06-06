import { styled, connect } from "frontity";
import Slider from "../slider/slider";
import Carousel from "../carousel/carousel";
import HeroImage from "../../assets/hero-image.jpg";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const postdata = [
    "https://www.sawtee.org/page_gallery/big/329ti-vol-17-no-3-4-2022.jpg",
    "https://www.sawtee.org/page_gallery/big/700ti-cover-vol-17-01-2021.jpg",
    "https://www.sawtee.org/page_gallery/big/79volume-16-no-3-2020.jpg",
    "https://www.sawtee.org/page_gallery/big/921discussion.jpg",
    "https://www.sawtee.org/page_gallery/big/752greeneconomy.jpg",
    "https://www.sawtee.org/page_gallery/big/969disussionpaper17.jpg",
  ];

  return (
    <>
      <HeroSection>
        <Slider slides={slides} />
      </HeroSection>
      <Content>
        <AboutSection>
          <AboutImage src={HeroImage} alt="" />
          <Overlay className="after" />
          <AboutContent>
            Dedicated to fair, equitable, inclusive, and sustainable growth and
            development in South Asia, SAWTEE is working towards poverty
            reduction, food and livelihood security, gender equity, and
            biodiversity conservation and environmental sustainability.
          </AboutContent>
        </AboutSection>
        <PublicationSlider>
          <Carousel data={postdata} slides={3} title={"Publications"} />
        </PublicationSlider>
        <MediaSlider>
          <Carousel data={postdata} slides={3} title={"Sawtee in Media"} />
        </MediaSlider>
      </Content>
    </>
  );
};

export default connect(Home);

const HeroSection = styled.section`
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.section`
  width: 100%;
  display: grid;
  grid-auto-rows: minmax(300px, auto);
  grid-template-columns: repeat(2, 1fr);
`;

const AboutSection = styled.div`
  grid-column: 1/2;
  grid-row: 1/3;
  color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 50vw;
  position: relative;

  & .after {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    content: "";
    background: transparent;
  }

  & .after:hover {
    background: hsl(0, 0%, 0%, 0.4);
  }
`;

const AboutImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AboutContent = styled.p`
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  word-break: break-word;
  margin: 0 auto;
  position: absolute;
  padding: 0 3em;
`;

const PublicationSlider = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  background: #463737;
  padding: 1rem 3rem;
  margin: 0 auto;
  border-bottom: 1px solid #707070;
  overflow: hidden;
`;

const MediaSlider = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  background: #463737;
  padding: 1rem 3rem;
  margin: 0 auto;
  color: #fff;
  border-top: 1px solid #707070;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  color: #fff;
`;
