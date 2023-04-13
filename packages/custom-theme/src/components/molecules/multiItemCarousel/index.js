import {
  Box,
  Text,
  Image,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const MultiItemCarousel = ({ slides, noOfItems }) => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(slides.length);

  // Set the length to match slides children from props
  useEffect(() => {
    if (slides) {
      setLength(slides.length);
    }
  }, [slides]);

  const prevSlide = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  return (
    <Box
      display="flex"
      className="mic-container"
      w="full"
      flexDir={"column"}
      overflow="hidden"
      pos="relative"
      mb="6"
    >
      <Box className="mic-wrapper" display="flex" w="100%" pos="relative">
        <Box
          rounded="xl"
          className="mic-content-wrapper"
          w="100%"
          height={"100%"}
        >
          <Box
            className="mic-content"
            display="flex"
            gap={{ base: "10px", sm: "20px", md: "30px" }}
            transform={`translateX(-${currentIndex * (100 / noOfItems)}%)`}
            transition={"all 250ms linear"}
          >
            {slides &&
              slides?.map((slide, sid) => {
                return (
                  <LinkBox
                    key={sid}
                    shadow="md"
                    flexShrink={0}
                    flexGrow={1}
                    w={`calc(100% / ${noOfItems})`}
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
                      {sid + 1} / {length}
                    </Text>
                    <LinkOverlay href={slide.link}>
                      <Image
                        src={slide.src ? slide.src : slide.featured_media.src}
                        srcSet={
                          slide.srcSet
                            ? slide.srcSet
                            : slide.featured_media.srcSet
                        }
                        alt={slide.alt ? slide.alt : ""}
                        boxSize="full"
                        title={slide.alt}
                        rounded="xl"
                        border={`1px solid`}
                        borderColor={useColorModeValue(
                          "gray.900",
                          "whiteAlpha.900"
                        )}
                        objectFit="cover"
                        style={{ width: "220px", height: "auto" }}
                      />
                    </LinkOverlay>
                  </LinkBox>
                );
              })}
          </Box>
          {currentIndex > 0 && (
            <Text {...arrowStyles} left="0" onClick={prevSlide} zIndex={1}>
              &#10094;
            </Text>
          )}
          {currentIndex < length - noOfItems && (
            <Text {...arrowStyles} right="0" onClick={nextSlide} zIndex={1}>
              &#10095;
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MultiItemCarousel;
