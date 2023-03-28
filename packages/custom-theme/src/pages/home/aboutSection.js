import React, { useEffect } from "react";
import HeroImage from "../../assets/hero-image.jpg";
import Title from "../../components/atoms/title";
import Section from "../../components/atoms/section";
import {
  Grid,
  GridItem,
  Text,
  Box,
  Skeleton,
  Flex,
  Image,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { styled } from "frontity";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import { connect } from "frontity";
import { getPublicationSliders } from "../../components/helpers";
// import Loading from "../../components/atoms/loading";
import Carousel from "../../components/molecules/Carousel";

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
    bgcolor: "gray.800";
    background-blend-mode: saturation;
    background-size: cover;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // transform: scale(1.1);
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
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        templateRows="auto"
      >
        <CustomGridItem
          colSpan={1}
          w="full"
          rowSpan={{ base: "1", lg: "2" }}
          bg={"transparent"}
        >
          <Box id="image-wrapper" />
          <blockquote>
            {intro && (
              <Text
                fontSize={["xl", "2xl", "3xl", "4xl"]}
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
          <>
            <GridItem colSpan={1} bg={"#463737"} px={"4"} w="full">
              <Skeleton width="150px" height="30px" marginBlock={3} />
              <Flex
                mt="3"
                maxH={"350px"}
                rounded="xl"
                flexDir="row"
                gap={{ base: "10px", sm: "20px", md: "30px" }}
                className="wrapper"
              >
                <Skeleton h="350px" w="300px" rounded={"xl"}></Skeleton>
                <Skeleton h="350px" w="300px" rounded={"xl"}></Skeleton>
                <Skeleton h="350px" w="300px" rounded={"xl"}></Skeleton>
              </Flex>
            </GridItem>

            <GridItem colSpan={1} bg={"#463737"} px={"4"} w="full">
              <Skeleton width="150px" height="30px" marginBlock={3} />
              <Flex
                mt="3"
                maxH={"350px"}
                rounded="xl"
                flexDir="row"
                gap={{ base: "10px", sm: "20px", md: "30px" }}
                className="wrapper"
              >
                <Skeleton h="350px" w="300px" rounded={"xl"}></Skeleton>
                <Skeleton h="350px" w="300px" rounded={"xl"}></Skeleton>
                <Skeleton h="350px" w="300px" rounded={"xl"}></Skeleton>
              </Flex>
            </GridItem>
          </>
        )}
        {publicationsData.isReady &&
          publicationsSlider.map((item) => {
            return (
              <GridItem
                key={item.slider_title}
                colSpan={1}
                bg={"#463737"}
                px={"4"}
                overflow="hidden"
              >
                <Title
                  py={["3", "6"]}
                  text={item.slider_title}
                  color="whiteAlpha.900"
                />
                <MultiItemCarousel my="3" slides={item.slider} />

                {/* <Carousel show={3}>
                  {item.slider.map((slide, idx) => {
                    return (
                      <LinkOverlay
                        key={idx}
                        title={slide.alt}
                        href={slide.link}
                      >
                        <Image
                          src={slide.src ? slide.src : slide.featured_media.src}
                          srcSet={
                            slide.srcSet
                              ? slide.srcSet
                              : slide.featured_media.srcSet
                          }
                          alt={slide.alt}
                          title={slide.alt}
                          rounded="xl"
                          border={`1px solid`}
                          borderColor={useColorModeValue(
                            "gray.900",
                            "whiteAlpha.900"
                          )}
                          objectFit="cover"
                          style={{ width: "220px", height: "300px" }}
                        />
                      </LinkOverlay>
                    );
                  })}
                </Carousel> */}
              </GridItem>
            );
          })}
      </Grid>
    </Section>
  );
};

export default connect(AboutSection);
