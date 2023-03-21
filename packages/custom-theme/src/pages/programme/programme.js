import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Image,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Section from "../../components/styles/section";
import Sidebar from "../../components/organisms/archive/sidebar";
import Loading from "../../components/atoms/loading";
import ProgrammesList from "./programmesList";
import Publication1 from "../../assets/publications-1.jpg";
import { useArchiveInfiniteScroll } from "@frontity/hooks";

const Programmes = ({ state, categories }) => {
  const postData = state.source.get(state.router.link);
  const { pages, isLimit, isFetching, isError, fetchNext } =
    useArchiveInfiniteScroll({ limit: 2 });

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

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
            {postData.type}
          </Heading>
        </Box>
      </Box>
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
            <Box>
              {pages.map(({ key, link, isLast, Wrapper }) => (
                <Wrapper key={key}>
                  <ProgrammesList link={link} categories={categories} />
                  {isLast && <Divider h="10px" mt="10" />}
                  <Box w="full" mb="40px" textAlign={"center"}>
                    {isFetching && <Loading />}
                    {isLimit && (
                      <Button onClick={fetchNext}>Load Next Page</Button>
                    )}
                    {isError && (
                      <Button onClick={fetchNext}>
                        Something failed - Retry
                      </Button>
                    )}
                  </Box>
                </Wrapper>
              ))}
            </Box>
            <Sidebar
              showSawteeInMedia={true}
              showTwitterTimeline={true}
              showSubscriptionCard={true}
              categories={categories}
            />
          </SimpleGrid>
          {/* <Pagination mt="56px" /> */}
        </Box>
      </Section>
    </LightPatternBox>
  );
};

export default connect(Programmes);
