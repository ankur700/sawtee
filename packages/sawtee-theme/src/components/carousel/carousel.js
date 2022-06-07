import { styled, css } from "frontity";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const Carousel = ({ data, slides, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalItems = data.length;

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
          <Inner total={totalItems}>
            {data.map((item, i) => {
              return (
                <CarouselItem width="140" key={i}>
                  <CarouselImage src={item} alt={"image" + i} />
                </CarouselItem>
              );
            })}
          </Inner>
        </CarouselInner>
        <PrevButton
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <AiFillCaretLeft className="icon" size="6rem" />
        </PrevButton>
        <NextButton
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <AiFillCaretRight className="icon" size="6rem" />
        </NextButton>
      </CarouselWrapper>
    </>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 95%;
`;

const CarouselTitle = styled.h3`
  font-size: 2.5rem;
  color: #fff;
  margin: 2rem 5rem;
`;

const CarouselInner = styled.div`
  transition: transform 0.5s;
  white-space: nowrap;
  padding: 0 7rem;
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.total}, 1fr)`};
  gap: 8rem;
`;

const CarouselItem = styled.div`
  height: 190px;
  color: #fff;
  width: ${(props) => props.width + "px" || "140px"};
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
  left: -1%;
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
  right: -1%;
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
