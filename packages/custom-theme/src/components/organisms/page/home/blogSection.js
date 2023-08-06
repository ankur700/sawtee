import { Grid, GridItem, Box, Flex, Button } from "@chakra-ui/react";
import { styled } from "frontity";
import { TopImageCard, NoImageCard } from "../../../molecules/cards";
import { FancyTitle } from "../../../atoms/fancyTitle";
import ViewAllBtn from "../../../atoms/ViewAllBtn";
import React, { useEffect, useState } from "react";

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

const BlogSection = ({ eventsData, media, linkColor, categories }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    eventsData.isReady &&
      eventsData.items.forEach((item, idx) => {
        const post = state.source[item.type][item.id];
        idx < 6 &&
          setEvents((prev) => [
            ...prev,
            formatCPTData(state, post, categories),
          ]);
      });
  }, [eventsData]);

  console.log(events);

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
            })
          : null}
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

export default BlogSection;
