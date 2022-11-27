import HeroImage from "../../assets/hero-image.jpg";
import Title from "../../components/atoms/title";
import Section from "../../components/atoms/section";
import { Grid, GridItem, useColorModeValue, Text, Box } from "@chakra-ui/react";
import { styled } from "frontity";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";

const AboutSection = ({ postdata }) => {
  const CustomGridItem = styled(GridItem)`
    position: relative;
    min-height: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    & #image-wrapper {
      background-image: url(${HeroImage});
      background-blend-mode: saturation;
      background-size: cover;
      filter: grayscale(100%);
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transform: scale(1.1);
      transition: all 0.3s ease;
      z-index: 1;

      &:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 35, 52, 0.75);
        z-index: 0;
      }

      &:hover {
        transform: scale(1);
      }
    }

    & blockquote {
      width: 100%;
      margin: 0 auto;
      padding: 0 14%;
      z-index: 1;
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
      >
        <CustomGridItem
          colSpan={1}
          rowSpan={{ base: "1", lg: "2" }}
          bg={"transparent"}
        >
          <Box id="image-wrapper" />
          <blockquote>
            <Text
              fontSize={["1.25rem", "1.5rem", "2rem"]}
              color={"whiteAlpha.800"}
              m="0"
              maxW="xl"
              margin={{ base: "1rem 20px", lg: "1rem auto" }}
              fontFamily="Open Sans"
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
          px={"4"}
        >
          <Title
            px={["6", "12", "16"]}
            py={["4", "6", "8"]}
            text="Publication"
          />
          <MultiItemCarousel my="6" slides={postdata} />
        </GridItem>
        <GridItem
          colSpan={1}
          bg={useColorModeValue("whiteAlpha.600", "#463737")}
          px={"4"}
        >
          <Title
            px={["6", "12", "16"]}
            py={["4", "6", "8"]}
            text="Sawtee in Media"
          />

          <MultiItemCarousel my="6" slides={postdata} />
        </GridItem>
      </Grid>
    </Section>
  );
};

export default AboutSection;
