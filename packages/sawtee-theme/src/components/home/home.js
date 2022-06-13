import { styled, connect, css } from "frontity";
import Carousel from "../carousel/carousel";
import HeroImage from "../../assets/hero-image.jpg";
import TwitterTimeline from "../twitterTimeline/twitterTimeline";
import ItemsCarousel from "../itemsCarousel/itemsCarousel";
import Section from "../reusable/section/section";
import Image from "../reusable/image/image";
import Grid, { GridItem } from "../reusable/grid/grid";
import Chart from "../chart/chart";
import GridBlog from "../GridBlog/gridBlog";
import { HiArrowRight } from "react-icons/hi";

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

  const TwitterSectionStyles = `
    border-bottom: 2px solid #707070;

  `;

  const AboutSectionGridSyles = `
    position: relative;
    display: flex;
    align-items: center;

    & .overlay {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        content: "";
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
        // backdrop-filter: blur(2px);

      }

      &:hover .overlay {
        background: hsl(0, 0%, 0%, 0.4);
        transition: all 0.3s;
        backdrop-filter: blur(5px);
      }
  `;

  const InfoSectionStyles = `
      justify-content: center;
  `;

  const Visualizer = `
    // write custom css tyles for visualizer
    min-width: 700px;
`;

  const TwitterBox = `
  display: flex;
  padding: 2rem 4rem;
`;

  const OutreachStyles = `
    padding: 2rem 4rem;
    border-top: 2px solid #707070;
    flex-direction: column;

    & h3 {
      font-size: 4rem;
      color: #333;
    }
  `;

  return (
    <>
      <SliderSection>
        <Carousel
          data={slides}
          slidesToShow={1}
          enableCaption={true}
          dots={true}
        />
      </SliderSection>
      <Section>
        <Grid
          columns="repeat(2, 50vw)"
          overflow="hidden"
          css={css`
            justify-content: center;
          `}
        >
          <GridItem
            column={"1/2"}
            row={"1/3"}
            bg={"transparent"}
            styles={AboutSectionGridSyles}
          >
            <div className="overlay"></div>
            <Image src={HeroImage} alt="Hero Image" />
            <AboutText>
              Dedicated to fair, equitable, inclusive, and sustainable growth
              and development in South Asia, SAWTEE is working towards poverty
              reduction, food and livelihood security, gender equity, and
              biodiversity conservation and environmental sustainability.
            </AboutText>
          </GridItem>
          <GridItem row={"1/2"} column={"2/3"} bg={"#463737"} bottom>
            <Title>{"Publication"}</Title>
            <ItemsCarousel data={postdata} slidesToShow={3} />
          </GridItem>
          <GridItem row={"2/3"} column={"2/3"} bg={"#463737"} top>
            <Title>{"Sawtee in Media"}</Title>

            <ItemsCarousel data={postdata} slidesToShow={3} />
          </GridItem>
        </Grid>
      </Section>
      <Section styles={TwitterSectionStyles}>
        <Grid
          columns="repeat(5, 1fr)"
          rows="minmax(500px, auto)"
          overflow="hidden"
          styles={InfoSectionStyles}
        >
          <GridItem
            column={"1/4"}
            row={"1/2"}
            bg={"transparent"}
            styles={Visualizer}
          >
            <Chart />
          </GridItem>
          <GridItem
            column={"4/6"}
            row={"1/2"}
            bg={"transparent"}
            styles={TwitterBox}
          >
            {/* <Title>{"Track SAWTEE on TWITTER"}</Title> */}
            <TwitterTimeline height="700px" width="100%" handle="sawteenp" />
          </GridItem>
        </Grid>
      </Section>
      <Section styles={OutreachStyles}>
        <SectionTop>
          <h3>Policy Outreach</h3>
          <a href="#">
            <ViewButton>
              {`View all `}
              <HiArrowRight className="icon" />
            </ViewButton>
          </a>
        </SectionTop>
        <GridBlog />
      </Section>
    </>
  );
};

export default connect(Home);

const SliderSection = styled(Section)`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const AboutText = styled.p`
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  word-break: break-word;
  margin: 0 auto;
  position: absolute;
  padding: 0 3em;
  z-index: 99;

  @media (max-width: 762px) {
    font-size: 1.5rem;
  }
`;

const Title = styled.h3`
  font-size: 4rem;
  color: #fff;
  margin: 2rem 0;
  padding: 0 2rem;

  @media (max-width: 762px) {
    font-size: 2rem;
  }
`;

const SectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 4rem;
  align-items: center;
  margin-bottom: 3rem;

  & a {
    text-decoration: none;
  }

  & h3 {
    margin: 0;
    padding: 2rem 3rem;
    font-size: 4rem;
    color: #000;
  }
`;

const ViewButton = styled.button`
  padding: 1rem 3rem;
  font-size: 1.75rem;
  font-weight: 600;
  display: flex;
  height: 4rem;
  line-height: 2rem;
  gap: 1rem;
  backdrop-filter: blur(5px);
  background-color: hsla(195, 100%, 25%, 0.6);
  &:hover {
    cursor: pointer;
  }

  &:hover .icon {
    transform: translateX(10px);
  }
`;
