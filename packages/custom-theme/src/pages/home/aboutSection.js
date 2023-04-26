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
  const [publicationsSlider, setPublicationsSlider] = useState([]);
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });
  const [sliderCatName, setSliderCatName] = useState([]);
  const [catOnePosts, setCatOnePosts] = useState([]);
  const [catTwoPosts, setCatTwoPosts] = useState([]);

  const catOne = state.source.get(
    `/category/publications/${Publication_categories[0].category_slug}`
  );

  const catTwo = state.source.get(
    `/category/publications/${Publication_categories[1].category_slug}`
  );

  useEffect(() => {
    if (Publication_categories.length > 0) {
      Publication_categories.map((pub_cat) => {
        let categoryName = categories.filter(
          (cat) => cat.id === Number(pub_cat.category_id)
        )[0].name;
        actions.source.fetch(`/category/publications/${pub_cat.category_slug}`);
        setSliderCatName((prevValue) => [...prevValue, categoryName]);
      });
    }
  }, [Publication_categories]);

  useEffect(() => {
    let posts = [];
    if (catOne.isReady) {
      catOne.items.map((item) => {
        let post = state.source[item.type][item.id];
        posts.push(getPublicationSliders(state, post, categories));
      });
      if (posts.length === catOne.items.length) {
        setCatOnePosts([...posts]);
      }
    }
  }, [catOne.isReady]);

  useEffect(() => {
    let posts = [];
    if (catTwo.isReady) {
      catTwo.items.map((item) => {
        let post = state.source[item.type][item.id];
        posts.push(getPublicationSliders(state, post, categories));
      });
      if (posts.length === catTwo.items.length) {
        setCatTwoPosts([...posts]);
      }
    }
  }, [catTwo.isReady]);

  // useEffect(() => {
  //   if (catOnePosts.length > 0 && catTwoPosts.length > 0) {
  //     if (sliderCatName.length > 0) {
  //       sliderCatName.map((name, idx) => {
  //         setPublicationsSlider((prevValue) => [
  //           ...prevValue,
  //           {
  //             slider_title: name,
  //             slider: idx === 0 ? catOnePosts : catTwoPosts,
  //           },
  //         ]);
  //       });
  //     }
  //   }
  // }, [catOnePosts, catTwoPosts, sliderCatName]);

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
          {publicationsSlider.length > 0 ? (
            publicationsSlider.map((item) => {
              return (
                <Box key={item.slider_title}>
                  <Title
                    py={["3", "6"]}
                    text={item.slider_title}
                    color="whiteAlpha.900"
                  />
                  <Carousel show={show}>
                    {item.slider.length > 0 &&
                      item.slider.map((slide, idx) => {
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
            })
          ) : (
            <>
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
            </>
          )}
        </VStack>
      </SimpleGrid>
    </Section>
  );
};

export default connect(AboutSection);
