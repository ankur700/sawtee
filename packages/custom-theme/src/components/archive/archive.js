import { useColorModeValue, Box, SimpleGrid } from "@chakra-ui/react";
import { connect, decode } from "frontity";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import Pagination from "./pagination";
import BlogArchive from "./blog-archive";
import PublicationsArchive from "./publications-archive";
import NewsletterArchive from "./newsletter-archive";
import { LightPatternBox } from "../styles/pattern-box";
import CovidArchive from "./covid-archive";
import { useEffect } from "react";
import ProgrammesArchive from "./programmes-archive";

const Archive = ({ state, actions, categories }) => {
  const postData = state.source.get(state.router.link);
  const archiveWrapperColor = useColorModeValue("whiteAlpha.300", "gray.800");
  const gridWrapperColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const news = state.source.get("/category/sawtee-in-media/");
  const infocus = state.source.get("/category/infocus/");
  // const linkColor = state.theme.colors.linkColor;
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");

  useEffect(() => {
    actions.source.fetch("/category/sawtee-in-media/");
    actions.source.fetch("/category/infocus/");
  }, []);

  if (postData.route === "/blog") {
    return <BlogArchive />;
  } else if (postData.isPublicationsArchive) {
    return (
      <PublicationsArchive
        categories={categories}
        news={news.isReady ? news : []}
        inFocus={infocus.isReady ? infocus : []}
      />
    );
  } else if (postData.isNewslettersArchive) {
    return (
      <NewsletterArchive
        news={news.isReady ? news : []}
        inFocus={infocus.isReady ? infocus : []}
        postData={postData}
        categories={categories}
      />
    );
  } else if (postData.route.replace("/category", "") === "/covid/") {
    return (
      <CovidArchive
        news={news.isReady ? news : []}
        inFocus={infocus.isReady ? infocus : []}
        postData={postData}
      />
    );
  } else if (postData.route.replace("/category", "") === "/programme/") {
    return (
      <ProgrammesArchive
        news={news.isReady ? news : []}
        inFocus={infocus.isReady ? infocus : []}
        postData={postData}
      />
    );
  }
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

        <Box
          padding={{ base: "24px", lg: "40px" }}
          bg={gridWrapperColor}
          width={{ lg: "80%" }}
          maxWidth="1200px"
          mx="auto"
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
            {postData.items.map(({ type, id }) => {
              const item = state.source[type][id];
              return <ArchiveItem key={item.id} item={item} />;
            })}
          </SimpleGrid>

          <Pagination mt="56px" />
        </Box>
      </Box>
    </LightPatternBox>
  );
};

export default connect(Archive);
