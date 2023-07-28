// import HeroImage from "../../assets/hero-image.jpg";
import Title from "../../../atoms/title";
import Section from "../../../atoms/section";
import { connect } from "frontity";
import {
  Text,
  Box,
  Skeleton,
  Flex,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Carousel from "../../../molecules/Carousel";
import Link from "../../../atoms/link";
import { formatCPTData } from "../../../helpers";

const AboutSection = ({
  state,
  intro,
  image,
  PublicationSlider,
  show,
  categories,
}) => {
  const ImageBorderColor = useColorModeValue("gray.900", "whiteAlpha.900");

  return (
    <Section width="full" overflow="hidden" id="about-section">
      <SimpleGrid columns={{ base: 1, lg: 2 }}>
        <Box
          w="full"
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          backgroundImage={`url(${image})`}
          backgroundColor="rgba(0,0,0,0.6)"
          backgroundBlendMode="multiply"
          backgroundSize="cover"
          minH="500px"
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
              fontFamily="body"
              _before={{
                content: '"“"',
                marginLeft: "-1rem",
              }}
              _after={{
                content: '"”"',
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
                    {item.slider.map(({ type, id }) => {
                      const slide = formatCPTData(
                        state,
                        state.source[type][id],
                        categories
                      );

                      console.log(slide);
                      return (
                        <Link
                          key={slide.id}
                          title={slide.title}
                          maxHeight={"250px"}
                          link={slide.acf.pub_link}
                          pos={"relative"}
                          w={`calc(100% / ${show} - 30px )`}
                          _before={{
                            content: `''`,
                            position: "absolute",
                            top: 0,
                            left: "unset",
                            width: `100%`,
                            height: "auto",
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
                            src={slide.featured_media.src}
                            srcSet={
                              slide.srcSet
                                ? slide.srcSet
                                : slide.featured_media.srcSet
                            }
                            alt={slide.title}
                            title={slide.title}
                            rounded="xl"
                            border={`1px solid`}
                            borderColor={ImageBorderColor}
                            objectFit="cover"
                            style={{ width: "190px", height: "250px" }}
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

export default connect(AboutSection);
