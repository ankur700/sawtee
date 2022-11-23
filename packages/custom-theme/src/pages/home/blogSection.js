import { Stack, Show } from "@chakra-ui/react";
import Section from "../../components/atoms/section";
import GridBlog from "../../components/organisms/GridBlog";
import ViewAllBtn from "../../components/atoms/ViewAllBtn";
import Link from "../../components/atoms/link";
import Title from "../../components/atoms/title";

const BlogSection = ({ data }) => {
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
          <Link href="#">
            <ViewAllBtn w="12em" text={"View All"} />
          </Link>
        </Show>
      </Stack>
      <GridBlog data={data} />
      <Show below="lg">
        <Link href="#">
          <ViewAllBtn w="full" text={"View All"} mt="1rem" py="6" />
        </Link>
      </Show>
    </Section>
  );
};

export default BlogSection;
