import { styled, css } from "frontity";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Carousel = ({ data, slides, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const CarouselItemNum = data.length / slides;

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!paused) {
  //       if (activeIndex === data.length - 1) {
  //         updateIndex(0);
  //       } else {
  //         updateIndex(activeIndex + 1);
  //       }
  //     }
  //   }, 3000);

  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // });

  return (
    <>
      <CarouselWrapper {...handlers}>
        {title ? <CarouselTitle>{title}</CarouselTitle> : null}

        <CarouselInner
          css={css`
            transform: translateX(-${activeIndex * 100}%);
          `}
        >
          {data.map((item, i) => {
            return (
              <CarouselItem width="150" key={i}>
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
  width: 50%;
`;

const CarouselTitle = styled.h3`
  font-size: 2.5rem;
  color: #fff;
  margin: 1rem auto 2rem;
`;

const CarouselInner = styled.div`
  transition: transform 0.5s;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6rem;
  margin: 0 3em;
`;

const CarouselItem = styled.div`
  height: 190px;
  color: #fff;
  width: ${(props) => props.width + "px" || "30%"};
  position: relative;
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
  left: -3%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  cursor: pointer;
  &:hover .icon {
    color: #fff;
  }
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: -3%;
  display: flex;
  background: transparent;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  cursor: pointer;
  &:hover .icon {
    color: #fff;
  }
`;
