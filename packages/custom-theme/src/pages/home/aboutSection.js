import React, { useEffect } from "react";
import HeroImage from "../../assets/hero-image.jpg";
import Title from "../../components/atoms/title";
import Section from "../../components/atoms/section";
import { Grid, GridItem, useColorModeValue, Text, Box } from "@chakra-ui/react";
import { styled } from "frontity";
import MultiItemCarousel from "../../components/molecules/multiItemCarousel";
import { connect } from "frontity";
import { formatCPTData, getPublicationSliders } from "../../components/helpers";
import Loading from "../../components/atoms/loading";
import { postdata } from "../../data";

const CustomGridItem = styled(GridItem)`
  position: relative;
  min-height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & #image-wrapper {
    background-image: url(${HeroImage});
    background-blend-mode: saturation;
    background-size: cover;
    filter: grayscale(100%);
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scale(1.1);
    transition: all 0.3s ease;
    z-index: 1;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 35, 52, 0.75);
      z-index: 0;
    }

    &:hover {
      transform: scale(1);
    }
  }

  & blockquote {
    width: 100%;
    margin: 0 auto;
    padding: 0 14%;
    z-index: 1;
  }
  & blockquote p {
    &:before {
      content: "“";
      position: absolute;
      margin-left: -1rem;
    }

    &:after {
      content: "”";
      margin-right: -1rem;
    }
  }
`;

const AboutSection = ({ state, actions, intro, categories }) => {
  const publicationsData = state.source.get("/publications");

  const [publicationsSlider, setPublicationsSlider] = React.useState([]);

  useEffect(() => {
    actions.source.fetch("/publications");
  }, []);

  useEffect(() => {
    if (publicationsData.isReady) {
      const publications = [];
      publicationsData.items.forEach((item) => {
        let post = state.source[item.type][item.id];
        publications.push(getPublicationSliders(state, post, categories));
      });

      console.log(postdata.items);

      if (publications.length > 0) {
        // const slider = publications.filter((pub) => pub.)

        // let array1 = [];
        // let array2 = [];

        // publications.forEach((item) => {
        //   if (item.cate) array1.push();
        // });

        const children = publications[0].categories.filter(
          (cat) => cat.parent !== 0
        )[0];

        setPublicationsSlider([
          {
            slider_title: children.name,
            slider: [
              ...publications.filter((pub) =>
                pub.categories.filter((cat) => cat.parent === parent.id)
              ),
            ],
          },
        ]);
      }
    }
  }, [publicationsData.isReady, categories]);

  return (
    <Section width="full" overflow="hidden" id="about-section" display="flex">
      <Grid
        templateColumns={{ base: "auto", lg: "repeat(2, 1fr)" }}
        templateRows="auto"
      >
        <CustomGridItem
          colSpan={1}
          rowSpan={{ base: "1", lg: "2" }}
          bg={"transparent"}
        >
          <Box id="image-wrapper" />
          <blockquote>
            {intro && (
              <Text
                fontSize={["1.25rem", "1.5rem", "2rem"]}
                color={"whiteAlpha.800"}
                m="0"
                maxW="xl"
                margin={{ base: "1rem 20px", lg: "1rem auto" }}
                fontFamily="Open Sans"
              >
                {intro}
              </Text>
            )}
          </blockquote>
        </CustomGridItem>

        {publicationsData.isFetching && (
          <GridItem
            colSpan={1}
            bg={useColorModeValue("rgb(254, 245, 232)", "rgb(65, 49, 42)")}
            px={"4"}
            overflow="hidden"
          >
            <Loading />
          </GridItem>
        )}
        {publicationsData.isReady
          ? console.log(publicationsSlider)
          : // publicationsData.items.map((item) => {
            //     return (
            //       <GridItem
            //         key={item.slider_title}
            //         colSpan={1}
            //         bg={useColorModeValue(
            //           "rgb(254, 245, 232)",
            //           "rgb(65, 49, 42)"
            //         )}
            //         px={"4"}
            //         overflow="hidden"
            //       >
            //         <Title py={["4", "6", "8"]} text={item.slider_title} />
            //         <MultiItemCarousel my="6" slides={item.slider} />
            //       </GridItem>
            //     );
            //   })
            console.log("something went wrong")}
      </Grid>
    </Section>
  );
};

export default connect(AboutSection);
