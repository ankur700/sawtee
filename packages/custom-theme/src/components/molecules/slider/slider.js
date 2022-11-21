import { css, styled } from "frontity";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BsDot } from "react-icons/bs";

const Slider = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex <= 0) {
      newIndex = 0;
    } else if (newIndex >= slides.length) {
      newIndex = slides.length - 1;
    }

    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
        if (activeIndex === slides.length - 1) {
          updateIndex(0);
        } else {
          updateIndex(activeIndex + 1);
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
    <Carousel
      {...handlers}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Inner
        css={css`
          transform: translateX(-${activeIndex * 100}%);
        `}
      >
        {slides?.map((slide, index) => {
          return (
            <CarouselItem key={index} width="100%">
              <CarouselImage src={slide.slide_image} alt={slide.slide_title} />
              <div className="after"></div>
              <Content>
                <Title>{slide.slide_title}</Title>
                <Caption>{slide.slide_caption}</Caption>
              </Content>
            </CarouselItem>
          );
        })}
      </Inner>
      <PrevButton
        onClick={() => {
          if (activeIndex === 0) {
            updateIndex(slides.length - 1);
          } else {
            updateIndex(activeIndex - 1);
          }
        }}
      >
        <HiChevronLeft className="icon" size="6rem" />
      </PrevButton>
      <Indicators
        css={css`
          @media (max-width: 576px) {
            display: none;
          }
        `}
      >
        {slides.map((slide, index) => {
          return (
            <RoundButtons
              css={css`
                cursor: pointer;
              `}
              index={index}
              activeIndex={activeIndex}
              key={index + Math.random()}
              onClick={() => {
                updateIndex(index);
              }}
            >
              <BsDot className="dots" size="3rem" />
            </RoundButtons>
          );
        })}
      </Indicators>
      <NextButton
        onClick={() => {
          if (activeIndex === slides.length - 1) {
            updateIndex(0);
          } else {
            updateIndex(activeIndex + 1);
          }
        }}
      >
        <HiChevronRight className="icon" size="6rem" />
      </NextButton>
    </Carousel>
  );
};

export default Slider;

const Carousel = styled.div`
  overflow: hidden;
  position: relative;
`;

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`;

const CarouselItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 10.25rem);
  color: #fff;
  width: ${(props) => props.width || "100%"};
  position: relative;
  overflow: hidden;

  & .after {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    content: "";
    background: hsl(0, 0%, 0%, 0.4);
  }
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  bottom: 5%;
  left: 45%;
  gap: 1rem;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 5%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: hsla(195, 100%, 25%, 0.8);
  }
  &:hover .icon {
    color: #fff;
  }
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 5%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: hsla(195, 100%, 25%, 0.8);
    border-radius: 50%;
  }
  &:hover .icon {
    color: #fff;
  }
`;

const RoundButtons = styled.button`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  color: #fff;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.index === props.activeIndex
      ? "	hsla(195, 100%, 25%, 0.6)"
      : "hsla(0, 0%, 0%, 0.6)"};
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 15%;
  z-index: 99;
  width: 60%;
  word-break: break-word;
  padding: 0 2.5rem;
`;

const Title = styled.p`
  font-size: 4rem;
  color: #fff;
  text-align: center;
  padding: 0.5rem 1.5rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 992px) {
    font-size: 2.5rem;
  }
`;

const Caption = styled.p`
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  padding: 0.5rem 1.5rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 992px) {
    font-size: 1.65rem;
  }
`;
