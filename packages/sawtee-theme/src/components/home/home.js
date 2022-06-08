import { styled, connect, css } from "frontity";
import Slider from "../slider/slider";
import Carousel from "../carousel/carousel";
import HeroImage from "../../assets/hero-image.jpg";
import TwitterTimeline from "../twitterTimeline/twitterTimeline";
import ItemsCarousel from "../itemsCarousel/itemsCarousel";

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
        {/* <Carousel data={slides} slidesToShow={1} /> */}
      </HeroSection>
      <Grid
        columns="repeat(2, 50vw)"
        rows="minmax(300px, auto)"
        overflow="hidden"
      >
        <AboutSection>
          <Overlay className="after" />
          <AboutImage src={HeroImage} alt="" />
          <AboutFirstSection>
            Dedicated to fair, equitable, inclusive, and sustainable growth and
            development in South Asia, SAWTEE is working towards poverty
            reduction, food and livelihood security, gender equity, and
            biodiversity conservation and environmental sustainability.
          </AboutFirstSection>
        </AboutSection>
        <PostSlider>
          <ItemsCarousel
            data={postdata}
            slidesToShow={3}
            title={"Publications"}
          />
        </PostSlider>
        <PostSlider
          css={css`
            grid-row: 2/3;
            border-top: 2px solid #707070;
            border-bottom: none;
          `}
        >
          <ItemsCarousel
            data={postdata}
            slidesToShow={3}
            title={"Sawtee in Media"}
          />
        </PostSlider>
      </Grid>
      <Grid
        columns="repeat(2, 50vw)"
        rows="minmax(500px, auto)"
        overflow="hidden"
      >
        <Visualizer />
        <TwitterBox>
          <TwitterTimeline height="700px" width="100%" handle="sawteenp" />
        </TwitterBox>
      </Grid>
    </>
  );
};

export default connect(Home);

const HeroSection = styled.section`
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-firstsection: center;
  align-items: center;
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
    transition: all 0.3s;
  }
`;

const AboutImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AboutFirstSection = styled.p`
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  word-break: break-word;
  margin: 0 auto;
  position: absolute;
  padding: 0 3em;
`;

const PostSlider = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  background: #463737;
  margin: 0 auto;
  border-bottom: 2px solid #707070;
  width: 100%;

  @media (max-width: 992px) {
    grid-column: unset;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  color: #fff;
  z-index: 10;
`;

const Visualizer = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  background: aqua;
`;

const TwitterBox = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  padding: 2rem 4rem;
`;

const Grid = styled.section`
  display: grid;
  overflow: ${(props) => props.overflow || "hidden"};
  grid-template-columns: ${(props) => props.columns};
  grid-auto-rows: ${(props) => props.rows || "auto"};

  @media (max-width: 992px) {
    // grid-template-columns: repeat(1, minmax(max-content, auto));
    display: flex;
    flex-direction: column;
  }
`;
