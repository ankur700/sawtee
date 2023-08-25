import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../../../organisms/archive/sidebar";
import PublicationFilter from "./publicationFilter";
import PublicationSliders from "./publicationSliders";
import GlassBox from "../../../atoms/glassBox";
import { useState, useEffect } from "react";
import { formatCPTData } from "../../../helpers";

const Publications = ({ state, linkColor, categories, news, inFocus }) => {
  const postData = state.source.get("get-publications-categories-posts");
  const [publicationCategories, setPublicationCategories] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const show = useBreakpointValue([1, 2, 3]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;


  useEffect(() => {
    categories
      .filter((cat) => cat.parent === 5)
      .map((item) => setPublicationCategories((prev) => [...prev, item]));
  }, []);

  useEffect(() => {
    if (
      postData.isReady &&
      postData.items &&
      publicationCategories.length !== 0
    ) {
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

  return (
    <Grid
      templateColumns={{ base: "1fr", xl: "repeat(5, 1fr)" }}
      gap={6}
      pos={"relative"}
    >
      <GridItem colSpan={{ base: 1, xl: 3 }} px={4}>
        <PublicationSliders
          linkColor={linkColor}
          sliderData={sliderData}
          show={show || 3}
          checkedItems={checkedItems}
        />
      </GridItem>
      <GridItem
        colSpan={{ base: 1, xl: 2 }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Sidebar
          posts={inFocus}
          news={news}
          categories={categories}
          linkColor={linkColor}
          postsLink={inFocus.link}
          newsLink={news.link}
          showTwitterTimeline={true}
          showSubscriptionBox={true}
        />
        <GlassBox
          mt={12}
          py="4"
          px="8"
          rounded="xl"
          height="max-content"
          position={"sticky"}
          top={"8.5rem"}
        >
          <PublicationFilter
            categories={publicationCategories}
            allChecked={allChecked}
            isIndeterminate={isIndeterminate}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        </GlassBox>
      </GridItem>
    </Grid>
  );
};

export default connect(Publications);
