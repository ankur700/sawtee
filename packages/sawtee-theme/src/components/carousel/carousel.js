import { styled, css } from "frontity";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Carousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= data.length) {
      newIndex = data.length - 1;
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
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <>
      <CarouselWrapper {...handlers}>
        <CarouselInner
          css={css`
            transform: translateX(-${activeIndex * 100}%);
          `}
        >
          {data.map((item, i) => {
            return (
              <CarouselItem width="30%" key={i}>
                <CarouselImage src={item} alt={"image" + i} />
              </CarouselItem>
            );
          })}
        </CarouselInner>
        <PrevButton
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <HiChevronLeft className="icon" size="6rem" />
        </PrevButton>
        <NextButton
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <HiChevronRight className="icon" size="6rem" />
        </NextButton>
      </CarouselWrapper>
    </>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const CarouselInner = styled.div`
  white-space: wrap;
  transition: transform 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
`;

const CarouselItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #fff;
  width: ${(props) => props.width || "30%"};
  position: relative;
  overflow: hidden;
  gap: 1rem;
`;

const CarouselImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 5%;
  background: hsla(195, 100%, 25%, 0.3);
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

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 5%;
  background: hsla(195, 100%, 25%, 0.3);
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
