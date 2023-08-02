import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect, decode } from "frontity";
import { useEffect } from "react";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";
import HomeArchive from "./home-archive";
import Publications from "../page/publication";
import Events from "../page/events";
import Programme from "../page/programme";
import Newsletters from "../page/newsletters";
import Research from "../page/research";
import SawteeInMedia from "../page/sawteeInMedia";
import Covid from "../page/covid";
import Switch from "@frontity/components/switch";

const Archive = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const newsData = state.source.get("/sawtee-in-media/");

  useEffect(() => {
    actions.source.fetch("/sawtee-in-media/");
  }, []);
  return (
    <Switch>
      <Events
        when={data.isFeaturedEventsArchive}
        categories={categories}
        news={newsData}
      />
      <Publications
        when={data.isPublicationsArchive}
        categories={categories}
        news={newsData}
      />
      <SawteeInMedia
        when={data.isSawteeInMediaArchive}
        categories={categories}
      />
      <Newsletters when={data.isNewslettersArchive} news={newsData} />
      <Research
        when={data.isResearchArchive}
        categories={categories}
        news={newsData}
      />
      <Covid
        when={data.isCovidArchive}
        categories={categories}
        news={newsData}
      />

      <Programme
        when={data.isProgrammeArchive}
        categories={categories}
        news={newsData}
      />
      <DefaultArchive
        when={data.isArchive && data.isCategory}
        data={data}
        state={state}
      />
    </Switch>
  );
};

export default connect(Archive);

const DefaultArchive = ({ data, state }) => {
  const archiveWrapperColor = useColorModeValue("whiteAlpha.300", "gray.800");
  const gridWrapperColor = useColorModeValue("whiteAlpha.700", "gray.700");
  return (
    <Box bg={archiveWrapperColor} as="section">
      {data.isTaxonomy && (
        <ArchiveHeader
          showPattern={state.theme.showBackgroundPattern}
          taxonomy={data.taxonomy}
          title={decode(state.source[data.taxonomy][data.id].name)}
        />
      )}

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
