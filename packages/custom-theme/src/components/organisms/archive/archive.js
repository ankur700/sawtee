import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import React from "react";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";
import { decode } from "frontity";
import Programme from "../../../pages/programme";
import Publications from "../../../pages/publication";
import Events from "../../../pages/events";
import SawteeInMedia from "../../../pages/sawteeInMedia";
import Research from "../../../pages/research";
import Newsletters from "../../../pages/newsletters";

const Archive = ({ state, categories }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  if (data.isFeaturedEventsArchive) return <Events categories={categories} />;
  if (data.isPublicationsArchive)
    return <Publications categories={categories} />;
  if (data.isSawteeInMediaArchive)
    return <SawteeInMedia categories={categories} />;
  if (data.isProgrammeArchive) return <Programme categories={categories} />;
  if (data.isNewslettersArchive) return <Newsletters />;
  if (data.isResearchArchive) return <Research categories={categories} />;

  return (
    <Box bg={useColorModeValue("whiteAlpha.300", "gray.800")} as="section">
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <ArchiveHeader
          showPattern={state.theme.showBackgroundPattern}
          taxonomy={data.taxonomy}
          title={decode(state.source[data.taxonomy][data.id].name)}
        />
      )}

      {/* If the list is an author, we render a title. */}
      {data.isAuthor && (
        <ArchiveHeader
          showPattern={state.theme.showBackgroundPattern}
          taxonomy="Posts By"
          title={decode(state.source.author[data.id].name)}
        />
      )}

      <Box
        padding={{ base: "24px", lg: "40px" }}
        bg={useColorModeValue("whiteAlpha.700", "gray.700")}
        width={{ lg: "80%" }}
        maxWidth="1200px"
        mx="auto"
      >
        {/* Iterate over the items of the list. */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
          {data.items.map(({ type, id }) => {
            const item = state.source[type][id];
            return <ArchiveItem key={item.id} item={item} />;
          })}
        </SimpleGrid>

        <Pagination mt="56px" />
      </Box>
    </Box>
  );
};

export default connect(Archive);
