import React, { useEffect, useState } from "react";
// import HeroImage from "../../assets/hero-image.jpg";
import Title from "../../components/atoms/title";
import Section from "../../components/atoms/section";
import {
  Text,
  Box,
  Skeleton,
  Flex,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { getPublicationSliders } from "../../components/helpers";
import Carousel from "../../components/molecules/Carousel";
import Link from "../../components/atoms/link";
import AboutImage from '../../assets/hero-image.jpg';

const AboutSection = ({ state, intro, image, categories, Publication_categories }) => {
  const publicationsData = state.source.get("/publications");
  const [publications, setPublications] = useState([]);
  const [publicationsSlider, setPublicationsSlider] = useState([]);
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });


  useEffect(() => {
    let array = [];
    if (publicationsData.isReady) {
      publicationsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        array.push(getPublicationSliders(state, post, categories));
      });
    }

    if (array.length > 0) {
      setPublications(array);
    }
  }, [publicationsData]);

  useEffect(() => {
    let array1 = [];
    let array2 = [];
    if (publications.length > 0) {
      publications.forEach((publication) => {
        publication.categories.forEach((category) => {
          if (category.id == Number(Publication_categories[0].category_id)) {
            array1.push(publication);
          }
          if (category.id == Number(Publication_categories[1].category_id)) {
            array2.push(publication);
          }
        });
      });
    }

    if (array1.length > 0 && array2.length > 0) {
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
  }, [publications, Publication_categories]);

  return (
    <Section width="full" overflow="hidden" id="about-section" minH={80}>
      <SimpleGrid columns={{ base: 1, lg: 2 }}>
        <Box
          w="full"
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          minH={"580px"}
          backgroundImage={`url(${AboutImage})`}
          backgroundColor="rgba(0,0,0,0.6)"
          backgroundBlendMode="multiply"
          backgroundSize="cover"
        >
          {intro && (
            <Text
              as="blockquote"
              fontSize={["xl", "2xl", "3xl"]}
              color={"whiteAlpha.800"}
              m="0"
              zIndex={10}
              px={{ base: "2rem", md: "4rem" }}
              margin={{ base: "1rem 20px", lg: "1rem auto" }}
              fontFamily="Open Sans"
              _before={{ content: '"“"', marginLeft: "-1rem" }}
              _after={{
                content: '"”"',
                marginRight: "-1rem",
              }}
            >
              {intro}
            </Text>
          )}
        </Box>

        {publicationsSlider.length > 0 ? (
          <VStack
            spacing={8}
            align="center"
            bg={"rgba(70,55,55, 1)"}
            p={6}
            overflow="hidden"
            w="full"
          >
            {publicationsSlider.map((item) => {
              return (
                <Box key={item.slider_title}>
                  <Title
                    py={["3", "6"]}
                    text={item.slider_title}
                    color="whiteAlpha.900"
                  />
                  <Carousel show={show}>
                    {item.slider.map((slide, idx) => {
                      return (
                        <Link
                          key={slide.id + idx}
                          title={
                            slide.featured_media.alt
                              ? slide.featured_media.alt
                              : ""
                          }
                          link={slide.acf.pub_link}
                          pos={"relative"}
                          w={`calc(100% / ${show} - 5% )`}
                          _before={{
                            content: `''`,
                            position: "absolute",
                            top: 0,
                            left: "unset",
                            width: "220px",
                            height: "280px",
                            borderRadius: "15px",
                            background: "rgba(0,0,0,0.3)",
                            backgroundBlendMode: "overlay",
                          }}
                          _hover={{
                            _before: {
                              background: "transparent",
                            },
                          }}
                        >
                          <Image
                            src={
                              slide.src ? slide.src : slide.featured_media.src
                            }
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
                            style={{ width: "220px", height: "280px" }}
                          />
                        </Link>
                      );
                    })}
                  </Carousel>
                </Box>
              );
            })}
          </VStack>
        ) : (
          <VStack
            spacing={8}
            align="center"
            bg={"rgba(70,55,55, 1)"}
            padding={6}
            overflow="hidden"
            w="full"
          >
            <Box px={"4"} pb={3}>
              <Skeleton width="150px" height="30px" marginBlock={8} />
              <Flex
                mt="3"
                rounded="xl"
                flexDir="row"
                gap={{ base: "10px", sm: "20px", md: "30px" }}
                className="wrapper"
              >
                <Skeleton
                  h="280px"
                  w="220px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
                <Skeleton
                  h="280px"
                  w="220px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
                <Skeleton
                  h="280px"
                  w="220px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
              </Flex>
            </Box>

            <Box px={"4"} pb={3}>
              <Skeleton width="150px" height="30px" marginBlock={8} />
              <Flex
                mt="3"
                rounded="xl"
                flexDir="row"
                gap={{ base: "10px", sm: "20px", md: "30px" }}
                className="wrapper"
              >
                <Skeleton
                  h="280px"
                  w="220px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
                <Skeleton
                  h="280px"
                  w="220px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
                <Skeleton
                  h="280px"
                  w="220px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
              </Flex>
            </Box>
          </VStack>
        )}
      </SimpleGrid>
    </Section>
  );
};

export default connect(AboutSection);
