import React from "react";
import { Stack } from "@chakra-ui/react";
import Title from "../../atoms/title";
import MultiItemCarousel from "../../molecules/multiItemCarousel";

const PublicationSliders = ({ data, categories }) => {
  let slider = [];
  (() => {
    let slides = [];
    categories.map((cat) => {
      return slider.push({ id: cat.id, name: cat.name, slides: slides });
    });
    console.log(slider);
  })();

  function getSlides(cat) {
    data.filter((pub) =>
      pub.categories.forEach((catId) => {
        if (catId === cat.id) {
          let index = slider.indexOf(slider[cat]);
          console.log(slider[index].slides.push(pub.featured_media));
          slider[index].slides.push(pub.featured_media);
        }
      })
    );
  }

  return (
    <Stack spacing={8}>
      {slider.map((cat, i) => {
        const slides = getSlides(cat);
        console.log(slides);
        return (
          <Stack key={cat.name} spacing="4">
            <Title text={cat.name} mb="3" />
            <MultiItemCarousel slides={slides} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default PublicationSliders;
