import { Grid, GridItem, Box, Flex } from "@chakra-ui/react";
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
      width="full"
      display="flex"
      py={{ base: "6", md: "12", lg: "16" }}
      px={{ base: "10", md: "16", lg: "20" }}
      flexDir="column"
      id="blog-section"
    >
      <FancyTitle title={"Policy Outreach"} />

      <CustomGrid
        className="band"
        templateColumns={{ base: "1fr", md: "2fr", lg: "repeat(3, 1fr)" }}
        templateRows={{ base: "auto", md: "auto", lg: "repeat(3, 1fr)" }}
      >
        {eventsData.items.length > 0 &&
          eventsData.items.slice(0, 6).map((item, i) => {
            const article = formatCPTData(
              state,
              state.source[item.type][item.id],
              categories
            );

            return (
              <GridItem key={article.id} id={"item-" + (i + 1)}>
                {i === 0 ? (
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
                ) : (
                  <NoImageCard
                    title={article.title}
                    categories={article.categories}
                    excerpt={article.excerpt}
                    target={article.link}
                    linkColor={linkColor}
                  />
                )}
              </GridItem>
            );
          })}
      </CustomGrid>

      <Flex
        as="a"
        justify={"center"}
        mt="1rem"
        py="6"
        href={"/featured-events"}
      >
        <ViewAllBtn text="View All" w="50%" />
      </Flex>
    </Box>
  );
};

export default connect(BlogSection);
