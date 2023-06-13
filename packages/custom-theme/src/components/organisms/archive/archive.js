import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect, decode } from "frontity";
import React from "react";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";

const Archive = ({ state, categories }) => {
  const archiveWrapperColor = useColorModeValue("whiteAlpha.300", "gray.800");
  const gridWrapperColor = useColorModeValue("whiteAlpha.700", "gray.700");
  // Get the data of the current list.
  const data = state.source.get(state.router.link);


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

export default connect(Archive);
