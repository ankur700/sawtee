import React from "react";
import { Stack } from "@chakra-ui/react";
import Title from "../../atoms/title";
import { postdata } from "../../../data";
import MultiItemCarousel from "../../molecules/multiItemCarousel";

const PublicationSliders = ({ data, categories }) => {
  const slides = [];

  return (
    <Stack spacing={8}>
      {data.map(({ name, id }, i) => {
        data.filter((item) =>
          Object.values(categories).forEach((category) => {
            if (category.id === item.id) {
              slides.push(item);
            }
          })
        );
        console.log(slides);

        return (
          <Stack key={id} spacing="4">
            <Title text={name} mb="3" />

            {}
            <MultiItemCarousel slides={slides} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default PublicationSliders;
