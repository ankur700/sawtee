import { useColorModeValue, Stack, Button } from "@chakra-ui/react";
import Section from "../../components/styles/section";
import Link from "../../components/atoms/link";

const PublicationFilter = ({ categories }) => {
  return (
    <Section
      bg={useColorModeValue("transparent")}
      size="2xl"
      h="auto"
      px={{ base: "32px", md: "0" }}
      py="6"
      display="flex"
    >
      <Stack
        spacing={[1, 5]}
        rowGap="4"
        direction={["column", "row"]}
        wrap="wrap"
        alignItems={"center"}
        justifyContent="center"
      >
        {categories.map(({ name, id, link, slug }) => {
          return (
            <Link
              link={`/category/publications/${slug.toLowerCase()}`}
              key={id}
            >
              <Button
                colorScheme={"primary"}
                color={useColorModeValue("gray.700", "whiteAlpha.700")}
                variant="outline"
                size="sm"
                fontWeight={"normal"}
              >
                {name}
              </Button>
            </Link>
          );
        })}
      </Stack>
    </Section>
  );
};

export default PublicationFilter;
