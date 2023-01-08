import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import useSWR from "swr";
import { connect } from "frontity";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import PublicationFilter from "./publicationFilter";
import Sidebar from "../../components/organisms/archive/sidebar";
import PublicationSliders from "./publicationSliders";
import Loading from "../../components/atoms/loading";
import Publication1 from "../../assets/publications-1.jpg";
import { getCPTData, fetcher } from "../../components/helpers";

const Publications = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);
  const posts = Object.values(state.source.publications);
  const PublicationCategories = Object.keys(state.source.category);
  const linkColor = state.theme.colors.linkColor;
  const publications = getCPTData(posts, state);
  const { data: categories } = useSWR(
    `https://sawtee.ankursingh.com.np/wp-json/wp/v2/categories?per_page=20`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: news } = useSWR(
    `https://sawtee.ankursingh.com.np/wp-json/wp/v2/sawtee-in-media`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // Load the post, but only if the data is ready.
  if (!data.isReady) return null;

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        <Box
          as="figure"
          mt={4}
          height="500px"
          _after={{
            display: "block",
            content: '""',
            width: "100%",
            height: "500px",
            background: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Box as={Image} boxSize="100%" objectFit="cover" src={Publication1} />
        </Box>

        <Box
          textAlign="center"
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"3xl"}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="uppercase"
          >
            {data.type}
          </Heading>
        </Box>
      </Box>

      <PublicationFilter data={categories} linkColor={linkColor} />

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
            spacing="8"
            pos={"relative"}
          >
            {!publications.length ? (
              <Loading />
            ) : (
              <PublicationSliders
                data={publications}
                categories={categories}
                PublicationCategories={PublicationCategories}
              />
            )}
            <Sidebar
              data={news}
              title="Sawtee in Media"
              showSawteeInMedia={true}
              showTwitterTimeline={true}
              showSubscriptionCard={true}
            />
          </SimpleGrid>
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Publications);
