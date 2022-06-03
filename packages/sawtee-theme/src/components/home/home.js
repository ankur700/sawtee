import { styled, connect } from "frontity";
import Slider from "../slider/slider";
import Carousel from "../carousel/carousel";

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
    "https://www.sawtee.org/page_gallery/big/752greeneconomy.jpg",
  ];

  return (
    <>
      <HeroSection>
        <Slider slides={slides} />
      </HeroSection>
      <Content>
        <AboutSection>
          <h3>Here goes about section text</h3>
        </AboutSection>
        <PublicationSlider>
          <Carousel data={postdata} />
        </PublicationSlider>
        <MediaSlider>
          <h3>Here goes SawteeinMedia Carousel.</h3>
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
  grid-auto-rows: minmax(500px, auto);
  grid-template-coumns: repeat(2, 1fr);
`;

const AboutSection = styled.div`
  grid-column: 1/2;
  grid-row: 1/3;
  background: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const PublicationSlider = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  background: aqua;
`;

const MediaSlider = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  background: navy;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
