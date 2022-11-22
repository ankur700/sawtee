import { styled } from "frontity";
import { Grid, GridItem } from "@chakra-ui/react";
import { TopImageCard, NoImageCard } from "../../molecules/cards/cards";

const GridBlog = ({ data }) => {
  return (
    <>
      <Band
        className="band"
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        templateRows={{ base: "auto", lg: "repeat(3, 1fr)" }}
      >
        {data?.map((article, i) => {
          return (
            <GridItem key={article.id} id={"item-" + (i + 1)}>
              {article.id === 1 ? (
                <TopImageCard
                  id={"item-" + (i + 1)}
                  title={article.title}
                  imageUrl={article.imageUrl}
                  content={article.excerpt}
                  href={article.href}
                  avatar={article.avatar}
                  date={article.date}
                  author={article.author}
                />
              ) : (
                <NoImageCard
                  title={article.title}
                  avatar={article.avatar}
                  content={article.excerpt}
                  href={article.href}
                  date={article.date}
                  categoryLink={"#"}
                />
              )}
            </GridItem>
          );
        })}
      </Band>
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

const Band = styled(Grid)`
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
