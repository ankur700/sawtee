import { Grid, GridItem, Box, Link, Container, VStack } from "@chakra-ui/react";
import { connect } from "frontity";
import { FancyTitle } from "../../../atoms/fancyTitle";
import ViewAllBtn from "../../../atoms/ViewAllBtn";
import { formatCPTData } from "../../../helpers";
import { Card, ImageCard } from "../../../atoms/cards";

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
        <VStack spacing={6}>
          <Grid
            className="band"
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            templateRows={"auto"}
            placeItems="center"
            gap={6}
          >
            {eventsData.isReady &&
              eventsData.items.length > 0 &&
              eventsData.items.slice(0, 6).map((item, i) => {
                const article = formatCPTData(
                  state,
                  state.source[item.type][item.id],
                  categories
                );

                if (i === 0) {
                  return (
                    <GridItem
                      key={article.id}
                      colSpan={{ base: "1", md: "2", lg: "4" }}
                      rowSpan={2}
                      // maxW="6xl"
                    >
                      <ImageCard
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
                        date={article.publishDate}
                        imageHeight={"250px"}
                      />
                    </GridItem>
                  );
                } else {
                  return (
                    <GridItem
                      key={article.id}
                      colSpan={{ base: "1", md: "1", lg: "2" }}
                      rowSpan="auto"
                      // maxW="3xl"
                      // minH={"10rem"}
                    >
                      <Card
                        title={article.title}
                        categories={article.categories}
                        excerpt={article.excerpt}
                        target={article.link}
                        linkColor={linkColor}
                        date={article.publishDate}
                      />
                    </GridItem>
                  );
                }
              })}
          </Grid>
          <Link href={"/featured-events"} w="50%">
            <ViewAllBtn text="Explore All" w="full" mt={6} />
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};

export default connect(BlogSection);
