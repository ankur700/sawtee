import React, { useEffect } from "react";
import HeroImage from "../../assets/hero-image.jpg";
import Title from "../../components/atoms/title";
import Section from "../../components/atoms/section";
import {
  Text,
  Box,
  Skeleton,
  Flex,
  SimpleGrid,
  VStack,
  SkeletonText,
} from "@chakra-ui/react";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import { connect } from "frontity";
import { getPublicationSliders } from "../../components/helpers";

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
  }, [publicationsData, categories, Publication_categories]);

  useEffect(() => {
    actions.source.fetch("/publications");
  }, []);

  return (
    <Section width="full" overflow="hidden" id="about-section" minH={80}>
      <SimpleGrid columns={2}>
        <Box
          w="full"
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          backgroundImage={`url(${HeroImage})`}
          backgroundColor="rgba(0,0,0,0.6)"
          backgroundBlendMode="multiply"
          backgroundSize="cover"
        >
          {/* <Box
            className="quote-wrapper"
            w="92%"
            height={20}
            zIndex={1}
            pos={"absolute"}
            inset={0}
            bg={"rgba(255,255,255,0.1)"}
            filter={"blur(5px)saturate(180%)"}
          /> */}
          {intro ? (
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
          ) : (
            <SkeletonText noOfLines={4} />
          )}
        </Box>

        {publicationsData.isFetching && (
          <VStack
            w="full"
            align="center"
            spacing={8}
            height={"100%"}
            bg={"rgba(70,55,55, 1)"}
          >
            <Box px={"4"} w="full" pb={3}>
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

            <Box px={"4"} pb={3} w="full">
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

        <VStack
          spacing={8}
          align="center"
          bg={"rgba(70,55,55, 1)"}
          px={6}
          overflow="hidden"
          w="full"
        >
          {publicationsData.isReady &&
            publicationsSlider.map((item) => {
              return (
                <Box key={item.slider_title}>
                  <Title
                    py={["3", "6"]}
                    text={item.slider_title}
                    color="whiteAlpha.900"
                  />
                  <MultiItemCarousel my="3" slides={item.slider} />
                </Box>
              );
            })}
        </VStack>
      </SimpleGrid>
    </Section>
  );
};

export default connect(AboutSection);
