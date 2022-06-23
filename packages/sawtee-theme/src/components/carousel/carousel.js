import React, { useState, useEffect } from "react";
import { css, styled } from "frontity";
import ItemsCarousel from "react-items-carousel";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BsDot } from "react-icons/bs";

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!paused) {
  //       updateIndex(activeItemIndex + 1);
  //       if (activeItemIndex === data.length - 1) {
  //         updateIndex(0);
  //       } else {
  //         updateIndex(activeItemIndex + 1);
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
    <Wrapper
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {title ? <CarouselTitle>{title}</CarouselTitle> : ""}
      <ItemsCarousel
        infiniteLoop={false}
        gutter={12}
        numberOfCards={slidesToShow || 1}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={setActiveItemIndex}
        leftChevron={
          <PrevButton className="leftChevronWrapper">
            <HiChevronLeft className="icon" size="6rem" />
          </PrevButton>
        }
        rightChevron={
          <NextButton>
            <HiChevronRight className="icon" size="6rem" />
          </NextButton>
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
        {data.map((item, i) => {
          return (
            <CarouselItem key={i}>
              <div className="after"></div>
              <CarouselImage src={item.slide_image} alt={"image" + i} />
              {enableCaption === true ? (
                <Content>
                  <Title>{item.slide_title}</Title>
                  <Caption>{item.slide_caption}</Caption>
                </Content>
              ) : null}
            </CarouselItem>
          );
        })}
      </ItemsCarousel>
      <Indicators>
        {data.map((slide, index) => {
          return (
            <RoundButtons
              index={index}
              activeIndex={activeItemIndex}
              key={index + Math.random()}
              onClick={() => {
                updateIndex(index);
              }}
            />
          );
        })}
      </Indicators>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
  width: 100%;
  margin: 0 auto;
`;

const CarouselTitle = styled.h3`
  font-size: 3.5rem;
  color: #fff;
  margin: 2rem 0;

  @media (max-width: 762px) {
    font-size: 2rem;
  }
`;

const CarouselItem = styled.div`
  height: auto;
  color: #fff;
  position: relative;
  height: calc(100vh - 10.25rem);
  display: flex;
  justify-content: center;

  & .after {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    content: "";
    background: hsl(0, 0%, 0%, 0.4);
  }
`;

const CarouselImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PrevButton = styled.button`
  position: absolute;
  // margin-left: 2rem;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: hsla(195, 100%, 25%, 0.4);
  }
  &:hover .icon {
    color: #fff;
  }
`;

const NextButton = styled.button`
  position: absolute;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.3);
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

const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 15%;
  // z-index: 99;
  word-break: break-word;
  padding: 0 2.5rem;
  width: 100%;
  color: #fff;
  & p {
    width: fit-content;
    margin: 0 auto;
  }
`;

const Title = styled.p`
  font-size: 2.5rem;
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
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 992px) {
    font-size: 1.65rem;
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 5%;
  gap: 1rem;

  @media (max-width: 762px) {
    display: none;
  }
`;

const RoundButtons = styled.button`
  height: 5px;
  width: 5px;
  border-radius: 50%;
  color: #fff;
  padding: 0.25rem;
  display: flex;
  cursor: pointer;
  border: ${(props) =>
    props.index === props.activeIndex
      ? "6px solid rgba(255, 255, 255, 0.3)"
      : "6px solid hsla(195, 100%, 25%, 0.6)"};
  justify-content: center;
  align-items: center;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background: ${(props) =>
    props.index === props.activeIndex
      ? "	hsla(195, 100%, 25%, 1)"
      : "rgba(255, 255, 255, 1)"};
`;
