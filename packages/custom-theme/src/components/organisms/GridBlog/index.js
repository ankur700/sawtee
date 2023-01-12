import { styled } from "frontity";
import { Grid, GridItem } from "@chakra-ui/react";
import { TopImageCard, NoImageCard } from "../../molecules/cards";

const GridBlog = ({ data, media, linkColor }) => {
  return (
    <>
      <CustomGrid
        className="band"
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        templateRows={{ base: "auto", lg: "repeat(3, 1fr)" }}
      >
        {data?.map((article, i) => {
          return (
            <GridItem key={article.id} id={"item-" + (i + 1)}>
              {i === 0 ? (
                <TopImageCard
                  title={article.title}
                  categories={article.categories}
                  featured_media={media}
                  excerpt={article.excerpt}
                  target={article.link}
                  date={article.publishDate}
                  author={article.author}
                  linkColor={linkColor}
                />
              ) : (
                <NoImageCard
                  title={article.title}
                  categories={article.categories}
                  excerpt={article.excerpt}
                  target={article.link}
                  date={article.publishDate}
                  author={article.author}
                  linkColor={linkColor}
                />
              )}
            </GridItem>
          );
        })}
      </CustomGrid>
    </>
  );
};

export default GridBlog;

// const breakpoints = {
//   sm: "30em",
//   md: "48em",
//   lg: "62em",
//   xl: "80em",
//   "2xl": "96em",
// };

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
