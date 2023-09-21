import {
  Box,
  SimpleGrid,
  useColorModeValue,
  useSafeLayoutEffect,
} from "@chakra-ui/react";
import { connect, decode } from "frontity";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";
import Publications from "./publication";
import Events from "./events";
import Programme from "./programme";
import Newsletters from "./newsletters";
import Research from "./research";
import SawteeInMedia from "./sawteeInMedia";
import Covid from "./covid";
import Switch from "@frontity/components/switch";
import CoverImage from "../../../assets/COVID-19-South-Asia-and-LDCs.jpeg";
import PublicationImage from "../../../assets/publications-1-resized.jpg";
import { ArchiveLayout } from "../layouts/archiveLayout";

const Archive = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const newsData = state.source.get("/sawtee-in-media/");
  const inFocus = state.source.get("/in-focus/");
  const linkColor = state.theme.colors.linkColor;

  useSafeLayoutEffect(() => {
    actions.source.fetch("/sawtee-in-media/");
    actions.source.fetch("/in-focus/");
  }, []);

  return (
    <ArchiveLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      category={data.type}
      image={data.route !== "covid" ? PublicationImage : CoverImage}
    >
      <Switch>
        <Events
          when={data.isFeaturedEventsArchive}
          categories={categories}
          news={newsData}
          inFocus={inFocus}
          postData={data}
          linkColor={linkColor}
        />
        <Publications
          when={data.isPublicationsArchive}
          categories={categories}
          news={newsData}
          inFocus={inFocus}
          linkColor={linkColor}
        />
        <SawteeInMedia
          when={data.isSawteeInMediaArchive}
          categories={categories}
          inFocus={inFocus}
          linkColor={linkColor}
        />
        <Newsletters
          when={data.isNewslettersArchive}
          news={newsData}
          inFocus={inFocus}
          postData={data}
          linkColor={linkColor}
        />
        <Research
          when={data.isResearchArchive}
          categories={categories}
          news={newsData}
          inFocus={inFocus}
          linkColor={linkColor}
        />
        <Covid
          when={data.isCovidArchive}
          categories={categories}
          news={newsData}
          inFocus={inFocus}
          data={data}
          linkColor={linkColor}
        />

        <Programme
          when={data.isProgrammeArchive}
          categories={categories}
          news={newsData}
          inFocus={inFocus}
          postData={data}
          linkColor={linkColor}
        />
        <DefaultArchive
          when={data.isArchive && data.isCategory}
          data={data}
          state={state}
        />
      </Switch>
    </ArchiveLayout>
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
