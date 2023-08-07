import { Grid, GridItem, Box, Flex, Container } from "@chakra-ui/react";
import { connect, styled } from "frontity";
import { TopImageCard, NoImageCard } from "../../../molecules/cards";
import { FancyTitle } from "../../../atoms/fancyTitle";
import ViewAllBtn from "../../../atoms/ViewAllBtn";
import { formatCPTData } from "../../../helpers";

const CustomGrid = styled(Grid)`
  margin: 0 auto;
  display: grid;
  grid-gap: 20px;
  align-items: center;

  @media (min-width: 80em) {
    & #item-1 {
      grid-column: 1 / span 2;
      grid-row: 1 / span 2;
    }
    & #item-2 {
      grid-row: 1 / span 1;
    }
    & #item-3 {
      grid-row: 2 / span 1;
    }
  }
`;

const BlogSection = ({ state, eventsData, linkColor, categories }) => {
  return (
    <Box
      maxW="full"
      display="flex"
      py={{ base: "6", md: "12", lg: "16" }}
      px={{ base: "10", md: "16", lg: "20" }}
      flexDir="column"
      id="blog-section"
    >
      <FancyTitle title={"Policy Outreach"} />
      <Container maxW="8xl">
        <Grid
          className="band"
          templateColumns={{
            base: "1fr",
            lg: "repeat(7, 1fr)",
          }}
          templateRows={"auto"}
          placeItems="center"
          gap={6}
        >
          {eventsData.isReady &&
            eventsData.items.length > 0 &&
            eventsData.items.slice(0, 5).map((item, i) => {
              const article = formatCPTData(
                state,
                state.source[item.type][item.id],
                categories
              );

              if (i === 0) {
                return (
                  <GridItem
                    colSpan={{ base: "1", lg: "3" }}
                    rowSpan={2}
                    maxW="6xl"
                  >
                    <TopImageCard
                      title={article.title}
                      categories={article.categories}
                      featured_media={{
                        alt: article.featured_media.alt,
                        src: article.featured_media.src,
                        srcSet: article.featured_media.srcSet,
                      }}
                      excerpt={article.excerpt}
                      target={article.link}
                      linkColor={linkColor}
                    />
                  </GridItem>
                );
              } else {
                return (
                  <GridItem
                    colSpan={{ base: "1", lg: "2" }}
                    rowSpan="auto"
                    maxW="3xl"
                    minH={"10rem"}
                  >
                    <NoImageCard
                      title={article.title}
                      categories={article.categories}
                      excerpt={article.excerpt}
                      target={article.link}
                      linkColor={linkColor}
                    />
                  </GridItem>
                );
              }
            })}
        </Grid>
        <Flex
          as="a"
          justify={"center"}
          mt="1rem"
          py="6"
          href={"/featured-events"}
        >
          <ViewAllBtn text="View All" w="50%" />
        </Flex>
      </Container>
    </Box>
  );
};

export default connect(BlogSection);
