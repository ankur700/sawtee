import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import Section from "../../components/styles/section";
import Sidebar from "../../components/organisms/archive/sidebar";
import Loading from "../../components/atoms/loading";
import useSWR from "swr";
import { getCPTData, fetcher } from "../../components/helpers";
import MediaArticles from "./MediaArticles";

const SawteeInMedia = ({ state, link }) => {
  const data = state.source.get(link);
  const posts = Object.values(state.source["sawtee-in-media"]);
  const news = getCPTData(posts, state);
  const linkColor = state.theme.colors.linkColor;

  const { data: snews } = useSWR(
    `https://sawtee.ankursingh.com.np/wp-json/wp/v2/sawtee-in-media`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // Load the post, but only if the data is ready.
  if (!data.isReady) return null;

  return (
    <Section
      bg={useColorModeValue("whiteAlpha.700", "gray.700")}
      pb="80px"
      size="xl"
    >
      <Box
        as={Section}
        px={{ base: "32px", md: "0" }}
        size="xl"
        pt="50px"
        fontSize={["md", "lg", "xl"]}
        color={useColorModeValue("rgba(12, 17, 43, 0.8)", "whiteAlpha.800")}
      >
        <SimpleGrid
          templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
          spacing="10"
          pos={"relative"}
        >
          {!news.length ? (
            <Loading />
          ) : (
            <MediaArticles news={news} linkColor={linkColor} />
          )}

          <Sidebar
            data={snews}
            title="Sawtee in Media"
            showSawteeInMedia={true}
            showTwitterTimeline={true}
            showSubscriptionCard={true}
            linkColor={linkColor}
          />
        </SimpleGrid>
        {/* <Pagination mt="56px" /> */}
      </Box>
    </Section>
  );
};

export default connect(SawteeInMedia);
