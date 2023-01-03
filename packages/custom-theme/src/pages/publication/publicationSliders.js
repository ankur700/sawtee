import React from "react";
import { Stack } from "@chakra-ui/react";
import Title from "../../components/atoms/title";
import { postdata } from "../../data";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";

const PublicationSliders = ({ data }) => {
  return (
    <Stack spacing={8}>
      {data.map((title, id, featured_media) => {
        return (
          <Stack key={id} spacing="4">
            <Title text={title} mb="3" />
            <MultiItemCarousel slides={featured_media} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default PublicationSliders;
