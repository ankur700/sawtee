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
import Carousel from "../../components/molecules/Carousel";
import Link from "../../components/atoms/link";

const AboutSection = ({ intro, image, PublicationSlider }) => {
  const show = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  return (
    <Section width="full" overflow="hidden" id="about-section">
      <SimpleGrid columns={{ base: 1, lg: 2 }}>
        <Box
          w="full"
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          overflow="hidden"
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
              alignSelf={"center"}
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
        {PublicationSlider.length > 1 ? (
          <VStack
            spacing={8}
            align="center"
            bg={"rgba(70,55,55, 1)"}
            p={6}
            overflow="hidden"
            w="full"
          >
            {PublicationSlider.map((item) => {
              return (
                <Box key={item.slider_title}>
                  <Title
                    py={["3", "6"]}
                    text={item.slider_title}
                    color="whiteAlpha.900"
                  />
                  <Carousel show={show} gap={"30px"}>
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
                          w={`calc(100% / ${show} - 30px )`}
                          _before={{
                            content: `''`,
                            position: "absolute",
                            top: 0,
                            left: "unset",
                            width: `175px`,
                            height: "100%",
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
                            style={{ width: "175px", height: "230px" }}
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
                  h="230px"
                  w="175px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
                <Skeleton
                  h="230px"
                  w="175px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
                <Skeleton
                  h="230px"
                  w="175px"
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
                  h="230px"
                  w="175px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
                <Skeleton
                  h="230px"
                  w="175px"
                  rounded={"xl"}
                  bg={"rgba(255,255,255, 0.1)"}
                ></Skeleton>
                <Skeleton
                  h="230px"
                  w="175px"
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

export default AboutSection;
