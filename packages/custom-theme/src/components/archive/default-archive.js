import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { LightPatternBox } from "../styles/pattern-box";
import ArchiveHeader from "./archive-header";
import Section from "../styles/section";
import Pagination from "./pagination";
import { connect, decode } from "frontity";
import ArchiveItem from "./archive-item";

const DefaultArchive = ({ state }) => {
  const postData = state.source.get(state.router.link);
  const archiveWrapperColor = useColorModeValue("whiteAlpha.300", "gray.800");
  const gridWrapperColor = useColorModeValue("gray.200", "gray.700");
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
      // px={{ base: "16px", lg: "32px" }}
    >
      <Box bg={archiveWrapperColor} as="section">
        {postData.isTaxonomy && (
          <ArchiveHeader
            showPattern={state.theme.showBackgroundPattern}
            taxonomy={postData.taxonomy}
            title={decode(state.source[postData.taxonomy][postData.id].name)}
          />
        )}

        {postData.isAuthor && (
          <ArchiveHeader
            showPattern={state.theme.showBackgroundPattern}
            taxonomy="Posts By"
            title={decode(state.source.author[postData.id].name)}
          />
        )}

        <Section
          padding={{ base: "24px", lg: "40px" }}
          bg={gridWrapperColor}
          width={{ lg: "80%" }}
          size="huge"
          mx="auto"
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
            {postData.items.map(({ type, id }) => {
              const item = state.source[type][id];
              return <ArchiveItem key={item.id} item={item} />;
            })}
          </SimpleGrid>

          <Pagination mt="56px" />
        </Section>
      </Box>
    </LightPatternBox>
  );
};

export default connect(DefaultArchive);
