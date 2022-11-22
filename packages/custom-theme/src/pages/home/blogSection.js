import { Stack, Show } from "@chakra-ui/react";
import Section from "../../components/atoms/section/section";
import GridBlog from "../../components/organisms/GridBlog/gridBlog";
import ViewAllBtn from "../../components/atoms/ViewAllBtn/ViewAllBtn";
import Link from "../../components/atoms/link";
import Title from "../../components/atoms/Title/title";

const BlogSection = ({ data }) => {
  return (
    <Section
      width="full"
      display="flex"
      py={["6", "12", "16"]}
      px={["10", "16", "20"]}
      flexDir="column"
      id="blog-section"
    >
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "center", "space-between"]}
        alignItems="center"
      >
        <Title text="Policy Outreach" />
        <Show above="lg">
          <Link href="#">
            <ViewAllBtn text={"View All"} />
          </Link>
        </Show>
      </Stack>
      <GridBlog data={data} />
      <Show below="lg">
        <Link href="#">
          <ViewAllBtn text={"View All"} mt="1rem" w="full" py="6" />
        </Link>
      </Show>
    </Section>
  );
};

export default BlogSection;
