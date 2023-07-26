import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect, decode } from "frontity";
import React from "react";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";
import HomeArchive from "./home-archive";
import Publications from "../../../pages/publication";
import Events from "../../../pages/events";
import Newsletters from "../../../pages/newsletters";
import Programme from "../../../pages/programme";
import Research from "../../../pages/research";
import SawteeInMedia from "../../../pages/sawteeInMedia";
import Covid from "../../../pages/covid";

const Archive = ({ state, categories }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  console.log(data);

  if (data.isFeaturedEventsArchive) {
    return (
      <Events when={data.isFeaturedEventsArchive} categories={categories} />
    );
  } else if (data.isPublicationsArchive) {
    return <Publications categories={categories} />;
  } else if (data.isSawteeInMediaArchive) {
    return <SawteeInMedia categories={categories} />;
  } else if (data.isProgrammeArchive) {
    return <Programme categories={categories} />;
  } else if (data.isNewslettersArchive) {
    return <Newsletters />;
  } else if (data.isResearchArchive) {
    return <Research categories={categories} />;
  } else if (data.isCovidArchive) {
    return <Covid categories={categories} />;
  } else if (data.isPostArchive) {
    return <DefaultArchive data={data} state={state} />;
  } else {
    return <HomeArchive />;
  }
};

export default connect(Archive);

const DefaultArchive = ({ data, state }) => {
  const archiveWrapperColor = useColorModeValue("whiteAlpha.300", "gray.800");
  const gridWrapperColor = useColorModeValue("whiteAlpha.700", "gray.700");
  return (
    <Box bg={archiveWrapperColor} as="section">
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
        bg={gridWrapperColor}
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
