import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  HStack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { styled } from "frontity";

export const FullWidthCarousel = ({ slides, loop }) => {
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

export const MultiItemCarousel = (props) => {
  const { children, show, gap } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children?.length);

  const [touchPosition, setTouchPosition] = useState(null);

  const arrowStyles = {
    position: "absolute",
    zIndex: 10,
    top: "50%",
    transform: "translateY(-50%)",
    width: "48px",
    height: "48px",
    borderRadius: "24px",
    backgroundColor: "whiteAlpha",
    border: "1px solid #ddd",
  };
  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  return (
    <CarouselContainer>
      <Box className="carousel-wrapper">
        {/* You can alwas change the content of the button to other things */}
        {currentIndex > 0 && (
          <Button
            onClick={prev}
            className="left-arrow"
            left={"-21px"}
            {...arrowStyles}
            // colorScheme={useColorModeValue("primary")}
          >
            <HiOutlineArrowNarrowLeft />
          </Button>
        )}
        <Box
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <Box
            className={`carousel-content show-${show}`}
            //  w={`calc(100% / ${show} - 5% )`}
            transform={`translateX(-${(currentIndex * 100) / show}%)`}
            gap={gap}
          >
            {children}
          </Box>
        </Box>
        {/* You can alwas change the content of the button to other things */}
        {currentIndex < length - show && (
          <Button
            onClick={next}
            className="right-arrow"
            {...arrowStyles}
            right={0}
            // colorScheme={useColorModeValue("primary")}
          >
            <HiOutlineArrowNarrowRight />
          </Button>
        )}
      </Box>
    </CarouselContainer>
  );
};

const CarouselContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;

  & .carousel-wrapper {
    display: flex;
    width: 100%;
    position: relative;
  }

  & .carousel-content-wrapper {
    overflow: hidden;
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }

  & .carousel-content {
    position: relative;
    width: 100%;
    display: flex;
    transition: all 250ms linear;
    -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
    scrollbar-width: none; /* hide scrollbar in Firefox */
  }

  /* hide scrollbar in webkit browser */
  & .carousel-content::-webkit-scrollbar,
  .carousel-content::-webkit-scrollbar {
    display: none;
  }

  & .carousel-content > * {
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }
`;
