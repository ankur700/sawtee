import { styled, connect, css } from "frontity";
import Slider from "../slider/slider";
import Carousel from "../carousel/carousel";
import HeroImage from "../../assets/hero-image.jpg";
import TwitterTimeline from "../twitterTimeline/twitterTimeline";
import ItemsCarousel from "../itemsCarousel/itemsCarousel";
import Section from "../reusable/Section/section";
import Image from "../reusable/image/image";
import Grid, { GridItem } from "../reusable/grid/grid";
import Chart from "../chart/chart";

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

  const AboutSectionStyles = `
    position: relative;
    display: flex;
    align-items: center;

    & .overlay {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        content: "";
        background: transparent;
        z-index: 10;
      }

      &:hover .overlay {
        background: hsl(0, 0%, 0%, 0.4);
        transition: all 0.3s;
      }
  `;

  const Visualizer = `
  // background: aqua;
`;

  const TwitterBox = `
  display: flex;
  padding: 2rem 4rem;
`;

  return (
    <>
      <Section>
        <Slider slides={slides} />
        {/* <Carousel data={slides} slidesToShow={1} /> */}
      </Section>
      <Section>
        <Grid columns="repeat(2, 50vw)" overflow="hidden">
          <GridItem
            column={"1/2"}
            row={"1/3"}
            bg={"transparent"}
            styles={AboutSectionStyles}
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
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              title={"Publications"}
            />
          </GridItem>
          <GridItem row={"2/3"} column={"2/3"} bg={"#463737"} top>
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              title={"Sawtee in Media"}
            />
          </GridItem>
        </Grid>
      </Section>
      <Section>
        <Grid
          columns="repeat(2, 50vw)"
          rows="minmax(500px, auto)"
          overflow="hidden"
        >
          <GridItem
            column={"1/2"}
            row={"1/2"}
            bg={"transparent"}
            styles={Visualizer}
          >
            <Chart />
          </GridItem>
          <GridItem
            column={"2/3"}
            row={"1/2"}
            bg={"transparent"}
            styles={TwitterBox}
          >
            <TwitterTimeline height="700px" width="100%" handle="sawteenp" />
          </GridItem>
        </Grid>
      </Section>
      <Section title={"Policy Outreach"}></Section>
    </>
  );
};

export default connect(Home);

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
