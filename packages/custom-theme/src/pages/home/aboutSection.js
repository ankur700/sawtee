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



const AboutSection = ({
  state,
  actions,
  intro,
  image,
  categories,
  Publication_categories,
}) => {
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });
  const [sliderCatName, setSliderCatName] = useState([]);
  const [catOnePosts, setCatOnePosts] = useState([]);
  const [catTwoPosts, setCatTwoPosts] = useState([]);

  const catOne =
    state.source.data[
      `/category/publications/${Publication_categories[0].category_slug}/`
    ].items;

  const catTwo =
    state.source.data[
      `/category/publications/${Publication_categories[1].category_slug}/`
    ].items;

  useEffect(() => {
    actions.source.fetch(
      `/category/publications/${Publication_categories[0].category_slug}`
    );
    actions.source.fetch(
      `/category/publications/${Publication_categories[1].category_slug}`
    );

    let array = [];

    Publication_categories.map((pub_cat) => {
      let categoryName = categories.filter(
        (cat) => cat.id === Number(pub_cat.category_id)
      )[0].name;
      array.push(categoryName);
      // setSliderCatName((prevValue) => [...prevValue, categoryName]);
    });

    if (array.length > 0) {
      setSliderCatName([...array]);
    }
  }, []);

  useEffect(() => {
    if (catOne && catTwo) {
      catOne.map((item) => {
        let data = state.source[item.type][item.id];
        data &&
          setCatOnePosts((prev) => [
            ...prev,
            getPublicationSliders(state, data, categories),
          ]);
      });

      catTwo.map((item) => {
        let data = state.source[item.type][item.id];
        data &&
          setCatTwoPosts((prev) => [
            ...prev,
            getPublicationSliders(state, data, categories),
          ]);
      });
    }
  }, [catOne, catTwo]);

  console.log(catOnePosts, catTwoPosts);

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
          backgroundImage={`url(${image})`}
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

        <VStack
          spacing={8}
          align="center"
          bg={"rgba(70,55,55, 1)"}
          p={6}
          overflow="hidden"
          w="full"
        >
          {sliderCatName.map((item) => {
            if (item === "Trade Insight") {
              return (
                <Box key={item}>
                  <Title py={["3", "6"]} text={item} color="whiteAlpha.900" />
                  <Carousel show={show}>
                    {catOnePosts.map((slide, idx) => {
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
            } else {
              return (
                <Box key={item}>
                  <Title py={["3", "6"]} text={item} color="whiteAlpha.900" />
                  <Carousel show={show}>
                    {catTwoPosts.map((slide, idx) => {
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
            }
          })}

          {/* <>
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
          </> */}
        </VStack>
      </SimpleGrid>
    </Section>
  );
};

export default connect(AboutSection);
