import { Stack, Show } from "@chakra-ui/react";
import Section from "../../../atoms/section";
import ViewAllBtn from "../../../atoms/ViewAllBtn";
import Title from "../../../atoms/title";
import { styled } from "frontity";
import { Grid, GridItem } from "@chakra-ui/react";
import { TopImageCard, NoImageCard } from "../../../molecules/cards";

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
      <Stack
        direction={{ base: "column", lg: "row" }}
        justifyContent={{ base: "center", lg: "space-between" }}
        alignItems="center"
      >
        <Title py={["4", "6", "8"]} text="Policy Outreach" />
        {events.length > 0 && (
          <Show above="lg">
            <ViewAllBtn
              px={["4", "6", "8"]}
              link={
                events[0]
                  ? `/category/` + events[0].categories[0].slug
                  : "/category/events"
              }
              text={"View All"}
              size="sm"
            />
          </Show>
        )}
      </Stack>
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
      <Show below="lg">
        <ViewAllBtn w="full" text={"View All"} mt="1rem" py="6" />
      </Show>
    </Section>
  );
};

export default BlogSection;
