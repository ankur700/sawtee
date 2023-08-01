import {
  Box,
  Heading,
  Image,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Publication1 from "../../../../assets/publications-1-resized.jpg";
import Sidebar from "../../../organisms/archive/sidebar";
import { LightPatternBox } from "../../../styles/pattern-box";
import Section from "../../../styles/section";
import PublicationFilter from "./publicationFilter";
import PublicationSliders from "./publicationSliders";
import GlassBox from "../../../atoms/glassBox";
import { useState, useEffect } from "react";
import { formatCPTData, formatPostData } from "../../../helpers";
import Loading from "../../../atoms/loading";

const Publications = ({ state, categories, news }) => {
  const data = state.source.get(state.router.link);
  const postData = state.source.get("get-publications-categories-posts");
  const [publicationCategories, setPublicationCategories] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const linkColor = state.theme.colors.linkColor;
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );
  const size = useBreakpointValue(["sm", "md", "lg", "huge", "max"]);
  const show = useBreakpointValue([1, 2, 3]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  useEffect(() => {
    categories
      .filter((cat) => cat.parent === 5)
      .map((item) => setPublicationCategories((prev) => [...prev, item]));
  }, []);

  useEffect(() => {
    if (postData.isReady && publicationCategories.length !== 0) {
      postData.items.forEach((item) => {
        let category = publicationCategories.filter((pc) => pc.id === item.id);
        let array = [];
        item.posts.map((post) => {
          let slide = state.source[post.type][post.id];
          let link = formatCPTData(state, slide, categories).acf.pub_link;
          slide &&
            array.push({
              ...formatCPTData(state, slide, categories).featured_media,
              link: link,
            });
        });

        if (array.length > 0) {
          setSliderData((prev) => [
            ...prev,
            {
              id: item.id,
              name: category[0].name,
              link: category[0].link,
              slides: [...array],
            },
          ]);
        }
      });
    }
  }, [postData, publicationCategories]);

  useEffect(() => {
    publicationCategories.map((_, idx) => {
      setCheckedItems((prev) => [...prev, idx < 7]);
    });
  }, [publicationCategories]);

  // Load the post, but only if the data is ready.
  if (!data.isReady) return <Loading />;
  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pos="relative">
        <Box
          as="figure"
          mt={4}
          height="350px"
          _after={{
            display: "block",
            content: '""',
            width: "100%",
            height: "350px",
            background: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Box as={Image} boxSize="100%" objectFit="cover" src={Publication1} />
        </Box>

        <Box
          textAlign="center"
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            as="h2"
            fontWeight="bold"
            color={"whiteAlpha.900"}
            size={"2xl"}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="capitalize"
          >
            {data.type}
          </Heading>
        </Box>
      </Box>
      {publicationCategories.length > 0 ? (
        <GlassBox
          as={Section}
          mt={"6"}
          size={"lg"}
          px={{ base: "32px", md: "16px" }}
          py="6"
          display="flex"
          // pos={"sticky"}
          // top={"8rem"}
        >
          <PublicationFilter
            categories={publicationCategories}
            allChecked={allChecked}
            isIndeterminate={isIndeterminate}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        </GlassBox>
      ) : null}

      {
        <Box
          as={Section}
          px={{ base: "32px", md: 16 }}
          w="full"
          size={size}
          pt="50px"
          pb={"80px"}
          fontSize={["md", "lg", "xl"]}
          color={contentColor}
        >
          <Grid
            templateColumns={{ base: "1fr", xl: "repeat(5, 1fr)" }}
            gap={6}
            pos={"relative"}
          >
            <GridItem colSpan={{ base: 1, xl: 3 }} px={4}>
              <PublicationSliders
                linkColor={linkColor}
                sliderData={sliderData}
                show={show ? show : 3}
                checkedItems={checkedItems}
              />
            </GridItem>
            <GridItem
              colSpan={{ base: 1, xl: 2 }}
              display={"flex"}
              justifyContent={"center"}
            >
              <Sidebar
                news={news}
                categories={categories}
                linkColor={linkColor}
                newsLink={news.link}
                showTwitterTimeline={true}
                showSubscriptionBox={true}
              />
            </GridItem>
          </Grid>
        </Box>
      }
    </LightPatternBox>
  );
};

export default connect(Publications);
