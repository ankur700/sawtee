import HeroImage from "../../assets/hero-image.jpg";
import ItemsCarousel from "../../components/molecules/itemsCarousel/itemsCarousel";
import Image from "../../components/atoms/image/image";
import Title from "../../components/atoms/Title/title";
import Section from "../../components/atoms/section/section";
import { Grid, GridItem, useColorModeValue, Text } from "@chakra-ui/react";
import { styled } from "frontity";

const AboutSection = ({ postdata }) => {
  const CustomGridItem = styled(GridItem)`
    cursor: pointer;
    min-height: 500px;

    &:after {
      width: 100%;
      height: 100%;
      background-color: hsla(0, 0%, 0%, 0.3);
      content: "";
      display: block;
      position: absolute;
    }

    &:hover blockquote {
      backdrop-filter: blur(5px);
    }
    & blockquote {
      background-color: hsla(0, 0%, 0%, 0.2);
      content: "";
      display: block;
      position: absolute;
      border-radius: 5%;
      padding: 20px 30px;
    }
    & blockquote p {
      &:before {
        content: "“";
        position: absolute;
        margin-left: -1rem;
      }

      &:after {
        content: "”";
        margin-right: -1rem;
      }
    }
  `;
  return (
    <Section width="full" overflow="hidden" id="about-section" display="flex">
      <Grid
        templateColumns={{ base: "100vw", lg: "repeat(2, 50vw)" }}
        templateRows="auto"
        h="auto"
      >
        <CustomGridItem
          colSpan={1}
          rowSpan={{ base: "1", lg: "2" }}
          bg={"transparent"}
          h="100%"
          pos={"relative"}
          display="flex"
          overflow={"hidden"}
          justifyContent="center"
          alignItems="center"
        >
          {/* <div className="overlay"></div> */}

          <Image loading="lazy" src={HeroImage} alt="Hero Image" />
          <blockquote>
            <Text
              fontSize={["1.25rem", "1.5rem", "2rem"]}
              zIndex="50"
              color={"gray.50"}
              maxW="xl"
              margin={{ base: "1rem 20px", lg: "1rem auto" }}
              fontFamily="heading"
            >
              Dedicated to fair, equitable, inclusive, and sustainable growth
              and development in South Asia, SAWTEE is working towards poverty
              reduction, food and livelihood security, gender equity, and
              biodiversity conservation and environmental sustainability.
            </Text>
          </blockquote>
        </CustomGridItem>
        <GridItem
          colSpan={1}
          bg={useColorModeValue("whiteAlpha.600", "#463737")}
        >
          <Title
            px={["6", "12", "16"]}
            py={["4", "6", "8"]}
            text="Publication"
          />
          <ItemsCarousel data={postdata} slidesToShow={3} slidesToScroll={3} />
        </GridItem>
        <GridItem
          colSpan={1}
          bg={useColorModeValue("whiteAlpha.600", "#463737")}
        >
          <Title
            px={["6", "12", "16"]}
            py={["4", "6", "8"]}
            text="Sawtee in Media"
          />

          <ItemsCarousel data={postdata} slidesToShow={3} slidesToScroll={3} />
        </GridItem>
      </Grid>
    </Section>
  );
};

export default AboutSection;
