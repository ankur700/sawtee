import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect, decode } from "frontity";
import { useEffect } from "react";
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
import { LightPatternBox } from "../../styles/pattern-box";
import CoverImage from "../../../assets/COVID-19-South-Asia-and-LDCs.jpeg";
import PublicationImage from "../../../assets/publications-1-resized.jpg";
import Section from "../../styles/section";

const Archive = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const newsData = state.source.get("/sawtee-in-media/");
  const inFocus = state.source.get("/in-focus/");
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );
  const linkColor = state.theme.colors.linkColor;

  useEffect(() => {
    actions.source.fetch("/sawtee-in-media/");
    actions.source.fetch("/in-focus/");
  }, []);

  if (!data.isReady) return <Loading />;

  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        <Box
          as="figure"
          mt={4}
          height="350px"
          _after={{
            display: "block",
            content: '""',
            width: "100%",
            height: "350px",
            background: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Box
            as={Image}
            boxSize="100%"
            objectFit="cover"
            src={data.route === "/covid/" ? CoverImage : PublicationImage}
          />
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
            size={"2xl"}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="capitalize"
          >
            {data.type}
          </Heading>
        </Box>
      </Box>

      <Box
        as={Section}
        pb="80px"
        size={size || "huge"}
        px={{ base: "32px", md: "0" }}
        pt="50px"
        fontSize={["md", "lg", "xl"]}
        color={contentColor}
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
          {/* <SawteeInMedia
            when={data.isSawteeInMediaArchive}
            categories={categories}
            inFocus={inFocus}
            linkColor={linkColor}
          /> */}
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
      </Box>
    </LightPatternBox>
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
