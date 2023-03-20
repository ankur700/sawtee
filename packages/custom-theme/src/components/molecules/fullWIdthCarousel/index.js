import React, { useState, useEffect } from "react";
import { Box, Flex, Stack, HStack, Text, Image } from "@chakra-ui/react";

const FullWidthCarousel = ({ slides, loop }) => {
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
  const [paused, setPaused] = useState(false);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && loop) {
        nextSlide();
      }
    }, 3000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <Flex
      w="full"
      pos="relative"
      overflow="hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Flex
        h={{ base: "auto", md: "calc(100vh - 5rem)" }}
        w="full"
        {...carouselStyle}
        _after={{
          display: "block",
          width: "100%",
          height: "100%",
          content: '""',
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        {slides.map((slide, sid) => (
          <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
            {/* <Text
              color="white"
              fontSize="xs"
              p="8px 12px"
              pos="absolute"
              top="0"
              zIndex={1}
            >
              {sid + 1} / {slidesCount}
            </Text> */}
            <Image
              src={slide.slide_image}
              alt="carousel image"
              sx={{ aspectRatio: "16/9" }}
              boxSize="full"
              backgroundSize="cover"
            />
            <Stack
              p="8px 12px"
              pos="absolute"
              bottom="24px"
              textAlign="center"
              w="full"
              mb="8"
              color="white"
              zIndex={1}
            >
              <Text fontSize="2xl">{slide.slide_title}</Text>
              <Text fontSize="lg">{slide.slide_caption}</Text>
            </Stack>
          </Box>
        ))}
      </Flex>
      <Text {...arrowStyles} left="0" onClick={prevSlide}>
        &#10094;
      </Text>
      <Text {...arrowStyles} right="0" onClick={nextSlide}>
        &#10095;
      </Text>
      <HStack justify="center" pos="absolute" bottom="8px" w="full">
        {Array.from({
          length: slidesCount,
        }).map((_, slide) => (
          <Box
            key={`dots-${slide}`}
            cursor="pointer"
            boxSize={["7px", null, "15px"]}
            m="0 2px"
            bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
            rounded="50%"
            display="inline-block"
            transition="background-color 0.6s ease"
            _hover={{
              bg: "blackAlpha.800",
            }}
            onClick={() => setSlide(slide)}
          ></Box>
        ))}
      </HStack>
    </Flex>
  );
};

export default FullWidthCarousel;
