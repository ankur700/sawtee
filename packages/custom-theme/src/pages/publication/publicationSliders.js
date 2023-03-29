import { useMemo, useEffect, useState } from "react";
import { connect } from "frontity";
import {
  LinkOverlay,
  Stack,
  Text,
  useColorModeValue,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
// import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import { formatCPTData } from "../../components/helpers";
import Link from "@frontity/components/link";
import Carousel from "../../components/molecules/Carousel";
// import Image from "@frontity/components/image";
// import Image from "../../components/atoms/image";

const PublicationSliders = ({ state, link, categories }) => {
  const data = state.source.get(link);

  const show = useBreakpointValue([1, 2, 3]);

  const publications = useMemo(() => {
    let array = [];
    data?.items.map((item) => {
      const post = state.source[item.type][item.id];
      array.push(formatCPTData(state, post, categories));
    });
    if (array.length > 0) {
      return [...array];
    }
  }, [data.isReady, categories]);

  const [sliderData, setSliderData] = useState([]);

  const PublicationCategories = Object.keys(state.source.category);

  useEffect(() => {
    let array = [];
    if (categories) {
      categories.map((cat) => {
        if (cat.parent !== 0) {
          array.push({
            id: cat.id,
            name: cat.name,
            link: cat.link,
            slides: [],
          });
        }
      });
    }
    if (array.length > 0) {
      setSliderData([...array]);
    }
  }, [categories]);

  const getSlides = (cat) => {
    publications.forEach((pub) =>
      pub.categories.map((category) => {
        if (category.id === cat.id && cat.name !== "Publications") {
          let index = sliderData.indexOf(cat);
          sliderData[index].slides.push({
            ...pub.featured_media,
            link: pub.link,
          });
        }
      })
    );
  };

  return (
    <Stack
      spacing={8}
      style={{
        rowGap: "60px",
      }}
    >
      {sliderData &&
        sliderData.map((cat) => {
          if (PublicationCategories.includes(`${cat.id}`)) {
            getSlides(cat);
            return (
              <Stack key={cat.name} spacing="4">
                <Text
                  as="h3"
                  m="0"
                  fontSize={{ base: "xl", lg: "3xl" }}
                  fontFamily="heading"
                  color={useColorModeValue("gray.800", "whiteAlpha.800")}
                >
                  <Link link={cat.link}>{cat.name}</Link>
                </Text>
                <Carousel show={show}>
                  {cat.slides.map((slide, idx) => {
                    return (
                      <LinkOverlay
                        key={slide.alt + idx}
                        title={sliderData.alt}
                        href={slide.link}
                        w={`calc(100% / ${show} - 30px)`}
                      >
                        <Image
                          src={slide.src ? slide.src : slide.featured_media.src}
                          srcSet={
                            slide.srcSet
                              ? slide.srcSet
                              : slide.featured_media.srcSet
                          }
                          alt={slide.alt}
                          title={slide.alt}
                          rounded="xl"
                          border={`1px solid`}
                          borderColor={useColorModeValue(
                            "gray.900",
                            "whiteAlpha.900"
                          )}
                          objectFit="cover"
                          style={{ width: "220px", height: "280px" }}
                        />
                      </LinkOverlay>
                    );
                  })}
                </Carousel>
              </Stack>
            );
          }
        })}
    </Stack>
  );
};

export default connect(PublicationSliders);
