import React from "react";
import {
  useColorModeValue,
  Stack,
  Checkbox,
  Button,
  Text,
} from "@chakra-ui/react";
import Section from "../../components/styles/section";
import Link from "../../components/atoms/link";

const PublicationFilter = ({ categories, linkColor }) => {
  return (
    <Section
      bg={useColorModeValue("transparent")}
      size="xl"
      mb="8"
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
        {categories &&
          categories
            .filter((category) => category.parent === 5)
            .map(({ name, id, link }) => {
              return (
                <Button
                  key={id}
                  colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
                  variant="outline"
                >
                  <Text
                    color={useColorModeValue("gray.700", "whiteAlpha.700")}
                    __hover={{ color: linkColor }}
                  >
                    <Link link={link}>{name}</Link>
                  </Text>
                </Button>
              );
            })}
      </Stack>
    </Section>
  );
};

export default PublicationFilter;
