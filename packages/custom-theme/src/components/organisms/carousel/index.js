import React, { useState, useEffect } from "react";
import { styled } from "frontity";
import ItemsCarousel from "react-items-carousel";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
  Box,
  Center,
  Circle,
  HStack,
  IconButton,
  Image,
  Show,
  Text,
} from "@chakra-ui/react";

export default ({ data, slidesToShow, title, enableCaption, dots }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex <= 0) {
      newIndex = 0;
    } else if (newIndex >= data.length) {
      newIndex = data.length - 1;
    }

    setActiveItemIndex(newIndex);
  };

  const Dots = styled(IconButton)((props) => ({
    border:
      props.index === props.activeindex
        ? "3px solid rgba(255, 255, 255, 0.3)"
        : "3px solid hsla(195, 100%, 25%, 0.6)",
    background:
      props.index === props.activeindex
        ? "	hsla(195, 100%, 25%, 1)"
        : "rgba(255, 255, 255, 1)",
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeItemIndex + 1);
        if (activeItemIndex === data.length - 1) {
          updateIndex(0);
        } else {
          updateIndex(activeItemIndex + 1);
        }
      }
    }, 3000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });
  return (
    <Box
      w="100%"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      id={"wrapper"}
      pos="relative"
    >
      {title ? (
        <Text
          id="carousel-title"
          fontSize={{ base: "1.25rem", sm: "1.75rem", md: "2rem" }}
        >
          {title}
        </Text>
      ) : (
        ""
      )}
      <ItemsCarousel
        id="carousel"
        infiniteLoop={false}
        gutter={12}
        numberOfCards={slidesToShow || 1}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={setActiveItemIndex}
        leftChevron={
          <Circle
            w={{ base: "3rem", sm: "6rem" }}
            h={{ base: "3rem", sm: "6rem" }}
            py="5px"
          >
            <IconButton
              id="previous"
              size={{ base: "3rem", sm: "6rem" }}
              borderRadius={"50%"}
              variant="outline"
              color="white"
              colorScheme={"white"}
              fontSize={{ base: "2rem", sm: "4rem" }}
              icon={<HiChevronLeft />}
              display={{ base: "hidden", sm: "block" }}
            />
          </Circle>
        }
        rightChevron={
          <Circle
            w={{ base: "3rem", sm: "6rem" }}
            h={{ base: "3rem", sm: "6rem" }}
            py="5px"
          >
            <IconButton
              id="next"
              size={{ base: "3rem", sm: "6rem" }}
              borderRadius={"50%"}
              variant="outline"
              color="white"
              colorScheme={"white"}
              fontSize={{ base: "2rem", sm: "4rem" }}
              icon={<HiChevronRight />}
            />
          </Circle>
        }
        chevronWidth={120}
        slidesToScroll={1}
        activePosition={"center"}
        disableSwipe={false}
        alwaysShowChevrons={false}
        outsideChevron={false}
        showSlither={false}
        firstAndLastGutter={false}
      >
        {data?.map((item, i) => {
          return (
            <Center key={i}>
              <Box
                id={`slide + ${i}`}
                pos="relative"
                h={{ base: "25rem", sm: "40rem" }}
                width="100%"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                alignContent={"center"}
                _after={{
                  display: "block",
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  content: `""`,
                  background: "hsl(0, 0%, 0%, 0.6)",
                }}
                key={i}
              >
                <Image
                  src={item.slide_image}
                  w="100%"
                  h="100%"
                  objectFit={"cover"}
                  alt={"image" + i}
                />
                {enableCaption === true ? (
                  <Box
                    display={"flex"}
                    flexDir="column"
                    pos="absolute"
                    bottom={"15%"}
                    textAlign="center"
                    wordBreak="break-word"
                    padding={"0 2.5rem"}
                    width="100%"
                  >
                    <Text
                      id="caption-title"
                      zIndex={"50"}
                      fontSize={{ base: "1.5rem", sm: "2.5rem", md: "3rem" }}
                      color="whiteAlpha.700"
                    >
                      {item.slide_title}
                    </Text>
                    {item.slide_caption && (
                      <Text
                        id="caption-subtitle"
                        zIndex={"50"}
                        fontSize={{ base: "0.75rem", sm: "1rem", md: "1.5rem" }}
                        color="whiteAlpha.700"
                      >
                        {item.slide_caption}
                      </Text>
                    )}
                  </Box>
                ) : null}
              </Box>
            </Center>
          );
        })}
      </ItemsCarousel>
      <Show above="sm">
        <Center w="full" zIndex={"50"} pos="absolute" bottom={"5%"}>
          <HStack>
            {data.map((slide, index) => {
              return (
                <Dots
                  padding="6px"
                  borderRadius="50%"
                  size="6px"
                  colorScheme="praimary.500"
                  cursor="pointer"
                  backdropFilter="blur(5px)"
                  index={index}
                  activeindex={activeItemIndex}
                  key={index + Math.random()}
                  onClick={() => {
                    updateIndex(index);
                  }}
                />
              );
            })}
          </HStack>
        </Center>
      </Show>
    </Box>
  );
};
