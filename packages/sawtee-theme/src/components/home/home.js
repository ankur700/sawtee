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
import Image1 from "../../assets/1.jpg";
import Image2 from "../../assets/2.jpg";
import Image3 from "../../assets/3.jpg";
import Image4 from "../../assets/4.jpg";
import Image5 from "../../assets/5.jpg";
import Image6 from "../../assets/6.jpg";
import Image7 from "../../assets/7.jpg";
import Image8 from "../../assets/8.jpg";
import Image9 from "../../assets/9.jpg";
import Image10 from "../../assets/10.jpg";
import Image11 from "../../assets/11.jpg";
import Image12 from "../../assets/12.jpg";

import FE1 from "../../assets/FE-1.jpg";
import FE2 from "../../assets/FE-2.jpg";
import FE3 from "../../assets/FE-3.jpg";
import FE4 from "../../assets/FE-4.jpg";
import FE5 from "../../assets/FE-5.jpg";
import FE6 from "../../assets/FE-6.jpg";
import FE7 from "../../assets/FE-7.jpg";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const slides = post.acf?.slides;
  const postdata = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
    Image11,
    Image12,
  ];
  const featuredEvents = [
    {
      id: 1,
      title: "SAWTEE and FNCCI interaction on Nepal’s LDC graduation",
      imageUrl: FE1,
      // excerpt:
      //   "SAWTEE and the Export Promotion Committee (EPC) at the Federation of Nepalese Chambers of Commerce and Industry (FNCCI) held a virtual dialogue on 23 February 2022 to discuss the implications of Nepal’s graduation from the least developed country (LDC) category.",
      date: "2022-02-23",
    },
    {
      id: 2,
      title:
        "SAWTEE participates in private sector dialogue to discuss Nepal’s LDC graduation",
      imageUrl: FE2,
      excerpt:
        "SAWTEE participated in a dialogue with the private sector in an interaction event virtually organized by the National Planning Commission (NPC) on 15 February 2022.",
      date: "2022-02-16",
    },
    {
      id: 3,
      title: "SAWTEE-NCC dialogue on Nepal’s LDC graduation",
      imageUrl: FE3,
      date: "2022-02-06",
      excerpt:
        "SAWTEE and Nepal Chamber of Commerce (NCC) on 6 February 2022 held a virtual dialogue on the implications of Nepal’s LDC graduation with the objective of informing the government of the concerns of the private sector to ensure a smooth transition out of the LDC category for Nepal.",
    },
    {
      id: 4,
      title:
        "Building Local Resilient Food Systems to end Hunger- Leaving no one behind",
      imageUrl: FE4,
      date: "2021-12-07",
      excerpt:
        "SDPI Pakistan organized a session: Building Local Resilient Food Systems to end Hunger- Leaving no one behind in partnership with World Food Programme, Pakistan, and SAWTEE at their 24th annual International Conference.",
    },
    {
      id: 5,
      title:
        "International Support Measures for the Graduating LDCs: Perspectives from South Asia",
      imageUrl: FE5,
      date: "2021-12-02",
      excerpt:
        "Perspectives from South Asia” with Citizen’s Platform for SDGs (CPD), Bangladesh, and Centre for Research on Bhutanese Society, Bhutan at International Institute for Sustainable Development(IISD)’s inaugural Trade and Sustainability Hub on 2nd December 2021.  ",
    },
    {
      id: 6,
      title: "Industrial Policy in the Age of the Fourth Industrial Revolution",
      imageUrl: FE6,
      date: "2021-12-02",
      excerpt:
        "SAWTEE co-organized a session “Industrial Policy in the Age of the Fourth Industrial Revolution” at International Institute for Sustainable Development (IISD)’s inaugural Trade and Sustainability Hub on 2nd December 2021.",
    },
    {
      id: 7,
      title: "Awareness workshop on gender dimensions of entrepreneurship",
      imageUrl: FE7,
      date: "2021-09-23",
      excerpt:
        "SAWTEE, in partnership with the Federation of Women Entrepreneurs Association of Nepal (FWEAN), organized an awareness generation workshop for the women entrepreneurs in Gandaki and Lumbini Provinces on 23 September 2021. ",
    },
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
      justify-content: space-between;
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
          rowsauto={"repeat(500px, auto)"}
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
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </GridItem>
          <GridItem row={"2/3"} column={"2/3"} bg={"#463737"} top>
            <Title>{"Sawtee in Media"}</Title>

            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </GridItem>
        </Grid>
      </Section>
      <Section styles={TwitterSectionStyles}>
        <Grid
          columns="repeat(3, 1fr)"
          rowsauto="minmax(500px, auto)"
          styles={InfoSectionStyles}
        >
          <GridItem
            column={"1/3"}
            row={"1/2"}
            bg={"transparent"}
            styles={Visualizer}
          >
            <Chart />
          </GridItem>
          <GridItem
            column={"3/4"}
            row={"1/2"}
            bg={"transparent"}
            styles={TwitterBox}
          >
            {/* <Title>{"Track SAWTEE on TWITTER"}</Title> */}
            <TwitterTimeline height="600px" width="100%" handle="sawteenp" />
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
        <GridBlog data={featuredEvents} />
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
