// Import Swiper React components
import { styled } from "frontity";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { BsDot } from "react-icons/bs";

const Slide = ({ slides, width, updateIndex, activeIndex }) => {
  return (
    <>
      {slides?.map((slide, i) => {
        return (
          <SliderItem key={i} width={width}>
            <SliderImage src={slide.imgPath} alt={slide.title} />
            <div className={styles.content}>
              <p className={styles.title}>{slide.title}</p>
              <p className={styles.subtitle}>{slide.subtitle}</p>
            </div>
            <div className={cn(styles.navigation)}>
              <ul className={styles.list}>
                {slides?.map((slide, i) => {
                  return (
                    <li
                      key={i}
                      className={`${
                        i === activeIndex ? styles.active : styles.listItem
                      }`}
                    >
                      <span
                        className="trigger cursor-pointer"
                        onClick={() => {
                          updateIndex(i);
                        }}
                      >
                        {slide.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SliderItem>
        );
      })}
    </>
  );
};

const Slider = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = slides.length - 1;
    } else if (newIndex > slides.length - 1) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
    setActiveImageLink(slides[newIndex].imgPath);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && activeIndex < slides.length - 1) {
        updateIndex(activeIndex + 1);
      } else if (!paused && activeIndex === slides.length - 1) {
        updateIndex(0);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...handlers}
      className={cn(styles.container)}
      style={{ backgroundColor: Hex }}
    >
      <div
        className={styles.wrapper}
        onMouseEnter={() => {
          setPaused(true);
        }}
        onMouseLeave={() => {
          setPaused(false);
        }}
      >
        <div
          className={styles.inner}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <Slide
            slides={slides}
            width="100%"
            updateIndex={updateIndex}
            activeIndex={activeIndex}
          />
        </div>
      </div>
      <div className={styles.indicators}>
        <button
          onClick={() => {
            if (activeIndex <= 0) {
              updateIndex(slides.length - 1);
            } else if (activeIndex <= slides.length - 1) {
              updateIndex(activeIndex - 1);
            }
          }}
        >
          <HiArrowNarrowLeft />
        </button>
        <button
          onClick={() => {
            if (activeIndex === slides.length - 1) {
              updateIndex(0);
            } else {
              updateIndex(activeIndex + 1);
            }
          }}
        >
          <HiArrowNarrowRight />
        </button>
      </div>

      <ul>
        {slides?.map((slide, i) => {
          return (
            <li
              key={i}
              className={`${i === activeIndex ? "active" : "text-gray-300"}`}
            >
              <span
                className="cursor-pointer shadow-lg"
                onClick={() => {
                  updateIndex(i);
                }}
              >
                <BsDot />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Slider;

const Sliderr = styled.div`
  overflow: hidden;
`;

const SliderInner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`;

const SliderItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: white;
`;

const SliderImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.7;
  filter: alpha(opacity=70);
  & :hover {
    opacity: 0.9;
    filter: alpha(opacity=90);
  }
`;
