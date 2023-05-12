import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { styled } from "frontity";
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

const Carousel = (props) => {
  const { children, show, gap } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children?.length);

  const [touchPosition, setTouchPosition] = useState(null);

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
            transform={`translateX(-${currentIndex * (100 / show)}%)`}
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

export default Carousel;

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
    gap: 20px;
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