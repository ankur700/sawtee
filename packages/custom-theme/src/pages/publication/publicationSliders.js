import { useMemo, useEffect, useState } from "react";
import { connect } from "frontity";
import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Title from "../../components/atoms/title";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import { formatCPTData } from "../../components/helpers";
import Link from "@frontity/components/link";

const PublicationSliders = ({ state, link, categories }) => {
  const data = state.source.get(link);
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
    <Stack spacing={8}>
      {sliderData &&
        sliderData.map((cat) => {
          if (PublicationCategories.includes(`${cat.id}`)) {
            getSlides(cat);
            return (
              <Stack key={cat.name} spacing="4">
                <Text
                  as="h3"
                  m="0"
                  fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                  fontFamily="heading"
                  color={useColorModeValue("gray.800", "whiteAlpha.800")}
                >
                  <Link link={cat.link}>{cat.name}</Link>
                </Text>
                <MultiItemCarousel slides={cat.slides} />
              </Stack>
            );
          }
        })}
    </Stack>
  );
};

export default connect(PublicationSliders);
