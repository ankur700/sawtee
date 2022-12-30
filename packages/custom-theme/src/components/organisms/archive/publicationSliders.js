import React from "react";
import { Stack } from "@chakra-ui/react";
import Title from "../../atoms/title";
import MultiItemCarousel from "../../molecules/multiItemCarousel";

const PublicationSliders = ({ data, categories, PublicationCategories }) => {
  let sliderData = [];
  (() => {
    categories.map((cat) => {
      return sliderData.push({ id: cat.id, name: cat.name, slides: [] });
    });
  })();

  function getSlides(cat) {
    data.forEach((pub) =>
      pub.categories.map((category) => {
        if (category.id === cat.id) {
          let index = sliderData.indexOf(cat);
          sliderData[index].slides.push(pub.featured_media);
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

export default PublicationSliders;
