import React, { useState } from "react";
import { css, styled } from "frontity";
import ItemsCarousel from "react-items-carousel";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

export default ({ data, slidesToShow, title }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <Wrapper>
      {title ? <CarouselTitle>{title}</CarouselTitle> : null}
      <ItemsCarousel
        infiniteLoop={false}
        gutter={60}
        numberOfCards={slidesToShow || 3}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={setActiveItemIndex}
        leftChevron={
          <PrevButton>
            <AiFillCaretLeft className="icon" size="6rem" />
          </PrevButton>
        }
        rightChevron={
          <NextButton>
            <AiFillCaretRight className="icon" size="6rem" />
          </NextButton>
        }
        chevronWidth={60}
        slidesToScroll={3}
        activePosition={"center"}
        disableSwipe={false}
        alwaysShowChevrons={true}
        outsideChevron={true}
        showSlither={false}
        firstAndLastGutter={false}
      >
        {data.map((item, i) => {
          return (
            <CarouselItem key={i}>
              <CarouselImage src={item} alt={"image" + i} />
            </CarouselItem>
          );
        })}
      </ItemsCarousel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 3rem 3rem;
  max-width: 90%;
  margin: 0 2.5rem;
`;

const CarouselTitle = styled.h3`
  font-size: 3.5rem;
  color: #fff;
  margin: 2rem 0;
`;

const CarouselItem = styled.div`
  height: auto;
  color: #fff;
  //   width: ${(props) => props.width + "px" || "140px"};
  position: relative;
  margin-left: 1rem;
`;

const CarouselImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PrevButton = styled.button`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  cursor: pointer;

  & .icon {
    color: hsla(195, 100%, 25%, 0.6);
  }
  &:hover .icon {
    color: #fff;
  }
`;

const NextButton = styled.button`
  display: flex;
  background: transparent;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  cursor: pointer;
  & .icon {
    color: hsla(195, 100%, 25%, 0.6);
  }
  &:hover .icon {
    color: #fff;
  }
`;
