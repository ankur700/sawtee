import React from "react";
import MediaArticle from "./MediaArticle";
import { VStack } from "@chakra-ui/react";
import { connect } from "frontity";
import Loading from "../../components/atoms/loading";
import { formatCPTData } from "../../components/helpers";

const SawteeInMedia = ({ state, link, categories, linkColor }) => {
  const data = state.source.get(state.router.link);
  return (
    <VStack spacing={8}>
      {data.items.map(({ type, id }) => {
        const newsItem = formatCPTData(
          state,
          state.source[type][id],
          categories
        );
        return (
          <MediaArticle
            key={newsItem.id}
            newsItem={newsItem}
            linkColor={linkColor}
          />
        );
      })}
    </VStack>
  );
};

export default connect(SawteeInMedia);
