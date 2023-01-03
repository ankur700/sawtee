import { Stack, Show } from "@chakra-ui/react";
import Section from "../../components/atoms/section";
import GridBlog from "../../components/organisms/GridBlog";
import ViewAllBtn from "../../components/atoms/ViewAllBtn";
import Title from "../../components/atoms/title";
import { splitPosts } from "../../components/helpers";

const BlogSection = ({ data, media }) => {
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
        <Show above="lg">
          <ViewAllBtn w="12em" text={"View All"} />
        </Show>
      </Stack>
      <GridBlog data={data} media={media} />
      <Show below="lg">
        <ViewAllBtn w="full" text={"View All"} mt="1rem" py="6" />
      </Show>
    </Section>
  );
};

export default BlogSection;
