import React, { useEffect } from "react";
import HeroImage from "../../assets/hero-image.jpg";
import Title from "../../components/atoms/title";
import Section from "../../components/atoms/section";
import { Grid, GridItem, useColorModeValue, Text, Box, Center } from "@chakra-ui/react";
import { styled } from "frontity";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import { connect } from "frontity";
import { getPublicationSliders } from "../../components/helpers";
import Loading from "../../components/atoms/loading";

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

const AboutSection = ({
  state,
  actions,
  intro,
  categories,
  Publication_categories,
}) => {

  const publicationsData = state.source.get("/publications");
  const [publicationsSlider, setPublicationsSlider] = React.useState([]);



  useEffect(() => {
    if (publicationsData.isReady && Publication_categories.length > 0) {
      let array1 = [];
      let array2 = [];

      publicationsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        post.categories.forEach((category) => {
          if (category == Publication_categories[0].category_id) {
            array1.push(getPublicationSliders(state, post, categories));
          }
          if (category == Publication_categories[1].category_id) {
            array2.push(getPublicationSliders(state, post, categories));
          }
        });
      });

      if ((array1.length && array2.length) > 0) {
        setPublicationsSlider([
          {
            slider_title: array1[0].categories.filter(
              (cat) => cat.parent !== 0
            )[0].name,
            slider: [...array1],
          },
          {
            slider_title: array2[0].categories.filter(
              (cat) => cat.parent !== 0
            )[0].name,
            slider: [...array2],
          },
        ]);
      }
    }
  }, [publicationsData.isReady, categories, Publication_categories]);

    useEffect(() => {
      actions.source.fetch("/publications");
    }, []);

  return (
    <Section width="full" overflow="hidden" id="about-section" display="flex">
      <Grid
        templateColumns={{ base: "auto", lg: "repeat(2, 1fr)" }}
        templateRows="auto"
      >
        <CustomGridItem
          colSpan={1}
          rowSpan={{ base: "1", lg: "2" }}
          bg={"transparent"}
        >
          <Box id="image-wrapper" />
          <blockquote>
            {intro && (
              <Text
                fontSize={["1.25rem", "1.5rem", "2rem"]}
                color={"whiteAlpha.800"}
                m="0"
                maxW="xl"
                margin={{ base: "1rem 20px", lg: "1rem auto" }}
                fontFamily="Open Sans"
              >
                {intro}
              </Text>
            )}
          </blockquote>
        </CustomGridItem>

        {publicationsData.isFetching && (
          <GridItem
            colSpan={1}
            bg={useColorModeValue("rgb(254, 245, 232)", "rgb(65, 49, 42)")}
            px={"4"}
            overflow="hidden"
          >
            <Center>
              <Loading />
            </Center>
          </GridItem>
        )}
        {publicationsData.isReady &&
          publicationsSlider.map((item) => {
            return (
              <GridItem
                key={item.slider_title}
                colSpan={1}
                bg={useColorModeValue("rgb(254, 245, 232)", "rgb(65, 49, 42)")}
                px={"4"}
                overflow="hidden"
              >
                <Title py={["4", "6", "8"]} text={item.slider_title} />
                <MultiItemCarousel my="6" slides={item.slider} />
              </GridItem>
            );
          })}
      </Grid>
    </Section>
  );
};

export default connect(AboutSection);
