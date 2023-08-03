import { Grid, GridItem, Box, Flex } from "@chakra-ui/react";
import Section from "../../../atoms/section";
import ViewAllBtn from "../../../atoms/ViewAllBtn";
import { styled } from "frontity";
import { TopImageCard, NoImageCard } from "../../../molecules/cards";
import { FancyTitle } from "../../../atoms/fancyTitle";

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

const BlogSection = ({ events, media, linkColor }) => {
  return (
    <Section
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
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        templateRows={{ base: "auto", lg: "repeat(3, 1fr)" }}
      >
        {events
          ? events.map((article, i) => {
              return (
                <GridItem key={article.id} id={"item-" + (i + 1)}>
                  {i === 0 ? (
                    <TopImageCard
                      title={article.title}
                      categories={article.categories}
                      featured_media={media}
                      excerpt={article.excerpt}
                      target={article.link}
                      // date={article.publishDate}
                      linkColor={linkColor}
                    />
                  ) : (
                    <NoImageCard
                      title={article.title}
                      categories={article.categories}
                      excerpt={article.excerpt}
                      target={article.link}
                      // date={article.publishDate}
                      // author={article.author}
                      linkColor={linkColor}
                    />
                  )}
                </GridItem>
              );
            })
          : null}
      </CustomGrid>
      {/* <Show below="lg"> */}
      <Flex justify={"center"} mt="1rem" py="6">
        <ViewAllBtn w="50%" py="4" mx="auto" text={"View All"} />
      </Flex>
      {/* </Show> */}
    </Section>
  );
};

export default BlogSection;
