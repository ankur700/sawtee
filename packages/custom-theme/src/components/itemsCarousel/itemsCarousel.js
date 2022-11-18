import React, { useState } from "react";
import { styled } from "frontity";
import ItemsCarousel from "react-items-carousel";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

export default ({ data, slidesToShow, slidesToScroll }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <Wrapper>
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
        slidesToScroll={slidesToScroll}
        activePosition={"center"}
        disableSwipe={false}
        alwaysShowChevrons={false}
        outsideChevron={true}
        showSlither={false}
        firstAndLastGutter={false}
      >
        {data.map((item, i) => {
          return (
            <CarouselItem key={i}>
              <a href={"#"}>
                <CarouselImage src={item} alt={"image" + i} />
              </a>
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

const CarouselItem = styled.div`
  height: auto;
  color: #fff;
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
    color: hsla(195, 100%, 25%, 1);
  }
  &:hover .icon {
    color: #333;
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
    color: hsla(195, 100%, 25%, 1);
  }
  &:hover .icon {
    color: #333;
  }
`;
