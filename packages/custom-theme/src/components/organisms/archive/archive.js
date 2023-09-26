import {
  useSafeLayoutEffect,
  useColorModeValue,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { connect } from "frontity";
import CoverImage from "../../../assets/COVID-19-South-Asia-and-LDCs.jpeg";
import PublicationImage from "../../../assets/publications-1-resized.jpg";
import { ArchiveLayout } from "../layouts/archiveLayout";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";

const Archive = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  // const newsData = state.source.get("/sawtee-in-media/");
  // const inFocus = state.source.get("/in-focus/");
  // const linkColor = state.theme.colors.linkColor;
  const archiveWrapperColor = useColorModeValue("whiteAlpha.300", "gray.800");
  const gridWrapperColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const posts = state.source.get(`/category${data.route}`);

  useSafeLayoutEffect(() => {
    actions.source.fetch(`/category${data.route}`);
  }, []);

  console.log(data, posts);

  return (
    <ArchiveLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      category={data.type}
      image={data.route !== "covid" ? PublicationImage : CoverImage}
    >
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
    </ArchiveLayout>
  );
};

export default connect(Archive);
