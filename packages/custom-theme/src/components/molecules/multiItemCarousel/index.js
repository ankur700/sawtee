import { Flex, Box, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "@frontity/components/link";

const MultiItemCarousel = ({ slides, gap = 2 }) => {
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
    }% - ${currentSlide * 3}px)`,
  };
  return (
    <Flex w="full" overflow="hidden" pos="relative" mb="6" px={"2"} mx="auto">
      <Flex
        h={["400px", "400px", "300px"]}
        rounded="xl"
        w={["100%", "50%", `calc(${100 / 3}% - 5px)`]}
        gap={gap}
        {...carouselStyle}
      >
        {slides.map((slide, sid) => (
          <Box
            key={`slide-${sid}`}
            boxSize="full"
            shadow="md"
            flex="none"
            pos={"relative"}
            maxW="300px"
            rounded="xl"
            _after={{
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "0.75rem",
              position: "absolute",
              top: 0,
              left: 0,
              bg: "rgba(0,0,0,0.4)",
            }}
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
            <Link link="#">
              <Image
                src={slide}
                alt="carousel image"
                boxSize="full"
                rounded="xl"
                backgroundSize="cover"
              />
            </Link>
          </Box>
        ))}
      </Flex>
      <Text {...arrowStyles} left="0" onClick={prevSlide}>
        &#10094;
      </Text>
      <Text {...arrowStyles} right="0" onClick={nextSlide}>
        &#10095;
      </Text>
    </Flex>
  );
};

export default MultiItemCarousel;
