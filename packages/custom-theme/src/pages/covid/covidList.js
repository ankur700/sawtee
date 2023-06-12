import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { connect } from "frontity";
import { formatCPTData } from "../../components/helpers";
import PulseLoadingCards from "../../components/atoms/pulseLoadingCards";
import CovidItemCard from "./covidItemCard";

const CovidList = ({ state, link, categories }) => {
  const data = state.source.get(link);
  if (!data.isReady) return <PulseLoadingCards />;
  return (
    <SimpleGrid columns={2} spacing={6} rowGap={12}>
      {data.items.map(({ type, id }) => {
        const post = formatCPTData(state, state.source[type][id], categories);
        return <CovidItemCard key={post.id} post={post} />;
      })}
    </SimpleGrid>
  );
};

export default connect(CovidList);

