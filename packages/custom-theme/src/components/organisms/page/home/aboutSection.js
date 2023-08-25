import Title from "../../../atoms/title";
import { connect } from "frontity";
import {
  Text,
  Box,
  Skeleton,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import Link from "../../../atoms/link";
import { formatCPTData } from "../../../helpers";
import { MultiItemCarousel } from "../../../atoms/carousels";

const AboutSection = ({
  state,
  tradeInsight,
  books,
  categories,
  intro,
  image,
  show,
}) => {
  const ImageBorderColor = useColorModeValue("gray.900", "whiteAlpha.900");

  return (
    <Box width="full" overflow="hidden" id="about-section">
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

        <VStack
          rowGap={8}
          align="center"
          bg={"rgba(70,55,55, 0.85)"}
          bgBlendMode={"lighten"}
          _dark={{
            background: "rgba(70,55,55, 1)",
          }}
          p={6}
          overflow="hidden"
          w="full"
          minH="600px"
        >
          <Box px={6}>
            <Title
              py={["3", "6"]}
              text={"Trade Insight"}
              color="whiteAlpha.900"
            />

            {tradeInsight.isReady ? (
              <MultiItemCarousel show={show} gap={"30px"}>
                {tradeInsight.items.map(({ type, id }) => {
                  const slide = formatCPTData(
                    state,
                    state.source[type][id],
                    categories
                  );

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
                        style={{ width: "160px", height: "auto" }}
                      />
                    </Link>
                  );
                })}
              </MultiItemCarousel>
            ) : (
              <MultiItemCarousel>
                {[1, 2, 4, 5, 6].map((item) => {
                  return (
                    <MultiItemCarousel key={item}>
                      <Skeleton
                        h="auto"
                        w="160px"
                        rounded={"xl"}
                        bg={"rgba(255,255,255, 0.1)"}
                      ></Skeleton>
                    </MultiItemCarousel>
                  );
                })}
              </MultiItemCarousel>
            )}
          </Box>

          <Box px={6}>
            <Title py={["3", "6"]} text={"Books"} color="whiteAlpha.900" />
            {books.isReady ? (
              <MultiItemCarousel show={show} gap={"30px"}>
                {books.items.map(({ type, id }) => {
                  const slide = formatCPTData(
                    state,
                    state.source[type][id],
                    categories
                  );

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
                        style={{ width: "160px", height: "auto" }}
                      />
                    </Link>
                  );
                })}
              </MultiItemCarousel>
            ) : (
              <MultiItemCarousel>
                {[1, 2, 4, 5, 6].map((item) => {
                  return (
                    <MultiItemCarousel key={item}>
                      <Skeleton
                        h="auto"
                        w="160px"
                        rounded={"xl"}
                        bg={"rgba(255,255,255, 0.1)"}
                      ></Skeleton>
                    </MultiItemCarousel>
                  );
                })}
              </MultiItemCarousel>
            )}
          </Box>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default connect(AboutSection);
