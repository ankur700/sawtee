import {
  Grid,
  GridItem,
  Stack,
  Text,
  Image,
  LinkBox,
  LinkOverlay,
  StackDivider,
  SkeletonText,
  Skeleton,
  Box,
  CheckboxGroup,
  Checkbox,
  SimpleGrid,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { connect } from "frontity";
import Sidebar from "../archive/sidebar";
import { GlassBox } from "../atoms";
import { useState, useEffect } from "react";
import { formatCPTData } from "../helpers";
import { MultiItemCarousel } from "../atoms/carousels";
import Link from "../atoms/link";
import { ArchiveLayout } from "../layouts/archiveLayout";
import PublicationImage from "../../assets/publications-1-resized.jpg";
import SidebarWidget from "../atoms/sidebarWidget";

const PublicationsArchive = ({ state, categories, news, infocus }) => {
  const postData = state.source.get("get-publications-categories-posts");
  const [publicationCategories, setPublicationCategories] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const show = useBreakpointValue([1, 2, 3]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const linkColor = state.theme.colors.linkColor;
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );
  useEffect(() => {
    categories
      .filter((cat) => cat.parent === 5)
      .map((item) => setPublicationCategories((prev) => [...prev, item]));
  }, [categories]);

  useEffect(() => {
    if (publicationCategories.length !== 0) {
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

      publicationCategories.map((_, idx) => {
        setCheckedItems((prev) => [...prev, idx < 5]);
      });
    }
  }, [postData, publicationCategories]);

  return (
    <ArchiveLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      category={postData.items[0].posts[0].type}
      image={PublicationImage}
    >
      <Grid
        templateColumns={{ base: "1fr", xl: "repeat(5, 1fr)" }}
        gap={6}
        pos={"relative"}
      >
        <GridItem colSpan={{ base: 1, xl: 3 }} px={4}>
          {sliderData.length >= 5 ? (
            <PublicationSliders
              linkColor={linkColor}
              sliderData={sliderData}
              show={show || 3}
              checkedItems={checkedItems}
            />
          ) : (
            checkedItems.map((_, idx) => {
              if (idx < 5)
                return (
                  <VStack
                    key={`0 + ${idx.toString()}`}
                    gap={8}
                    mt={idx === 0 ? 0 : 10}
                  >
                    <Skeleton textAlign={"left"} w={"200px"} h={"20px"} />
                    <MultiItemCarousel show={show} gap={"20px"}>
                      {[1, 2, 3].map((item) => {
                        return (
                          <Box
                            w={
                              show
                                ? `calc(100% / ${show} - 20px)`
                                : `calc(100% - 20px)`
                            }
                            key={`100 + ${item.toString()}`}
                          >
                            <Skeleton
                              w={"175px"}
                              height={"230px"}
                              rounded={"xl"}
                            />
                          </Box>
                        );
                      })}
                    </MultiItemCarousel>
                  </VStack>
                );
            })
          )}
        </GridItem>

        <GridItem
          colSpan={{ base: 1, xl: 2 }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Sidebar showTwitterTimeline={false} showSubscriptionBox={true} />
          {news
            ? news.items !== undefined && (
                <SidebarWidget
                  array={news.items.slice(0, 5)}
                  title={news.route.split("/")[2].toLocaleUpperCase()}
                  link={news.link}
                  mt={12}
                />
              )
            : null}
          {infocus
            ? infocus.items !== undefined && (
                <SidebarWidget
                  array={infocus.items.slice(0, 5)}
                  title={infocus.route.split("/")[2].toLocaleUpperCase()}
                  link={infocus.link}
                  mt={12}
                />
              )
            : null}
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
              contentColor={contentColor}
            />
          </GlassBox>
        </GridItem>
      </Grid>
    </ArchiveLayout>
  );
};

export default connect(PublicationsArchive);

const PublicationFilter = ({
  categories,
  allChecked,
  isIndeterminate,
  checkedItems,
  setCheckedItems,
  contentColor,
}) => {
  return (
    <CheckboxGroup colorScheme="primary" size="md" w="full" variant="outline">
      <SimpleGrid spacingX="20px" spacingY="10px" columns={[1, 2]}>
        <Checkbox
          isChecked={allChecked}
          color={contentColor}
          isIndeterminate={isIndeterminate}
          onChange={(e) =>
            setCheckedItems(() => {
              let array = [];
              categories.map((_) => {
                array.push(e.target.checked);
              });

              return array;
            })
          }
        >
          All
        </Checkbox>
        {categories.map(({ name, id }, idx) => {
          return (
            <Checkbox
              key={id}
              color={contentColor}
              isChecked={checkedItems[idx]}
              onChange={(e) => {
                let array = [...checkedItems];
                array[idx] = e.target.checked;
                setCheckedItems([...array]);
              }}
            >
              {name}
            </Checkbox>
          );
        })}
      </SimpleGrid>
    </CheckboxGroup>
  );
};

const PublicationSliders = ({ sliderData, show, checkedItems }) => {
  return (
    <Stack divider={<StackDivider borderColor="gray.200" />} spacing={"60px"}>
      {sliderData.map((item, idx) => {
        return (
          checkedItems[idx] && (
            <Stack key={item.name} spacing="4">
              <Text
                as="h3"
                id={`#${item.name}`}
                m="0 0 2rem 0"
                fontSize={{ base: "xl", lg: "2xl" }}
                fontFamily="heading"
                color={"var(--color-text)"}
              >
                {
                  <Link title={`View All ${item.name}`} link={item.link}>
                    {item.name}
                  </Link>
                }
              </Text>
              <MultiItemCarousel show={show} gap={"20px"}>
                {item.slides.map((slide, idx) => {
                  return (
                    <LinkBox
                      key={slide.alt + `${idx}`}
                      w={
                        show
                          ? `calc(100% / ${show} - 20px)`
                          : `calc(100% - 20px)`
                      }
                      pos={"relative"}
                      _before={{
                        content: `''`,
                        position: "absolute",
                        top: 0,
                        left: "unset",
                        right: "unset",
                        width: "175px",
                        height: "100%",
                        borderRadius: "15px",
                        background: "rgba(0,0,0,0.3)",
                        backgroundBlendMode: "overlay",
                      }}
                      _hover={{
                        _before: {
                          background: "transparent",
                        },
                      }}
                    >
                      {
                        <LinkOverlay href={slide.link}>
                          <Image
                            src={slide.src}
                            srcSet={slide.srcSet}
                            alt={slide.alt}
                            rounded="xl"
                            border={`1px solid`}
                            borderColor={"var(--color-border)"}
                            objectFit="cover"
                            style={{ width: "175px", height: "230px" }}
                          />
                        </LinkOverlay>
                      }
                    </LinkBox>
                  );
                })}
              </MultiItemCarousel>
            </Stack>
          )
        );
      })}
    </Stack>
  );
};
