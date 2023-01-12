import React from "react";
import { connect } from "frontity";
import { Stack } from "@chakra-ui/react";
import Title from "../../components/atoms/title";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import { getCPTData } from "../../components/helpers";

const PublicationSliders = ({ state, link, categories }) => {
  const data = state.source.get(link);
  const posts = () => {
    let array = [];
    data.items.map(({ type, id }) => {
      array.push(state.source[type][id]);
    });
    if (array.length > 0) {
      return array;
    }
  };
  const PublicationCategories = Object.keys(state.source.category);
  const publications = getCPTData(posts(), state);

  let sliderData = [];
  (() => {
    categories
      ? categories.map((cat) => {
          if (cat.parent === 217)
            return sliderData.push({ id: cat.id, name: cat.name, slides: [] });
        })
      : null;
  })();

  // const results = React.useMemo()

  function getSlides(cat) {
    publications.forEach((pub) =>
      pub.categories.map((category) => {
        if (category.id === cat.id && cat.id !== 217) {
          let index = sliderData.indexOf(cat);
          sliderData[index].slides.push({
            ...pub.featured_media,
            link: pub.link,
          });
        }
      })
    );
  }

  return (
    <Stack spacing={8}>
      {sliderData.map((cat) => {
        if (PublicationCategories.includes(`${cat.id}`)) {
          getSlides(cat);
          return (
            <Stack key={cat.name} spacing="4">
              <Title text={cat.name} mb="3" />
              <MultiItemCarousel slides={cat.slides} />
            </Stack>
          );
        }
      })}
    </Stack>
  );
};

export default connect(PublicationSliders);
