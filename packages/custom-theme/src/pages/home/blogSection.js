import React, { useEffect } from "react";
import { Stack, Show } from "@chakra-ui/react";
import Section from "../../components/atoms/section";
import ViewAllBtn from "../../components/atoms/ViewAllBtn";
import Title from "../../components/atoms/title";
import { styled } from "frontity";
import { Grid, GridItem } from "@chakra-ui/react";
import { TopImageCard, NoImageCard } from "../../components/molecules/cards";
import { connect } from "frontity";

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

const BlogSection = ({ state, actions, linkColor }) => {
  const eventsData = state.source.get("/featurd-events");

  useEffect(() => {
    actions.source.fetch("/featurd-events");
  }, []);

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
        <Title
          px={["6", "12", "16"]}
          py={["4", "6", "8"]}
          text="Policy Outreach"
        />
        {/* {data[0].categories[0] && (
          <Show above="md">
            <ViewAllBtn
              w="12em"
              link={data[0] ? data[0].categories[0].link : "#"}
              text={"View All"}
            />
          </Show>
        )} */}
      </Stack>
      <CustomGrid
        className="band"
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        templateRows={{ base: "auto", lg: "repeat(3, 1fr)" }}
      >
        {eventsData.isReady
          ? // data.map((article, i) => {
            //   return (
            //     <GridItem key={article.id} id={"item-" + (i + 1)}>
            //       {i === 0 ? (
            //         <TopImageCard
            //           title={article.title}
            //           categories={article.categories}
            //           featured_media={media}
            //           excerpt={article.excerpt}
            //           target={article.link}
            //           date={article.publishDate}
            //           author={article.author}
            //           linkColor={linkColor}
            //         />
            //       ) : (
            //         <NoImageCard
            //           title={article.title}
            //           categories={article.categories}
            //           excerpt={article.excerpt}
            //           target={article.link}
            //           date={article.publishDate}
            //           author={article.author}
            //           linkColor={linkColor}
            //         />
            //       )}
            //     </GridItem>
            //   );
            // })
            console.log(eventsData)
          : console.log("not ready")}
      </CustomGrid>
      <Show below="lg">
        <ViewAllBtn w="full" text={"View All"} mt="1rem" py="6" />
      </Show>
    </Section>
  );
};

export default connect(BlogSection);
