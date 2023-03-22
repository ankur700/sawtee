import {
  Flex,
  Box,
  Text,
  Image,
  useBreakpointValue,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "@frontity/components/link";

const MultiItemCarousel = ({ slides, gap }) => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `calc(-${
      currentSlide * (100 / useBreakpointValue([1, 2, 3], { ssr: false }))
    }%)`,
  };

  return (
    <Flex w="full" overflow="hidden" pos="relative" mb="6" mx="auto">
      <Flex
        // maxH={"350px"}
        rounded="xl"
        w={[
          "calc(100% - 10px)",
          "calc(50% - 20px) ",
          `calc(${100 / 3}% - 30px)`,
        ]}
        gap={gap ? gap : { base: "10px", sm: "20px", md: "30px" }}
        {...carouselStyle}
        className="wrapper"
      >
        {slides &&
          slides?.map((slide, sid) => {
            return (
              <LinkBox
                key={sid}
                boxSize="full"
                shadow="md"
                w="full"
                minHeight="310px"
                flex="none"
                pos={"relative"}
                title={slide.title || slide.alt}
                rounded="xl"
                ml={sid === 0 ? { base: "10px", md: "15px" } : "0"}
                _after={{
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.75rem",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bg: "rgba(0,0,0,0.3)",
                }}
                _hover={{ _after: { bg: "rgba(0,0,0,0.1)" } }}
              >
                <Text
                  color="white"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0"
                  zIndex="1"
                >
                  {sid + 1} / {slidesCount}
                </Text>
                <LinkOverlay href={slide.link}>
                  <Image
                    src={slide.src ? slide.src : slide.featured_media.src}
                    srcSet={
                      slide.srcSet ? slide.srcSet : slide.featured_media.srcSet
                    }
                    alt={slide.alt ? slide.alt : ""}
                    boxSize="full"
                    rounded="xl"
                    // objectFit="cover"
                  />
                </LinkOverlay>
              </LinkBox>
            );
          })}
      </Flex>
      <Text {...arrowStyles} left="0" onClick={prevSlide} zIndex={1}>
        &#10094;
      </Text>
      <Text {...arrowStyles} right="0" onClick={nextSlide} zIndex={1}>
        &#10095;
      </Text>
    </Flex>
  );
};

export default MultiItemCarousel;
