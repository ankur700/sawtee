import React from "react";
import { useColorModeValue, Stack, Checkbox, Button } from "@chakra-ui/react";
import Section from "../../components/styles/section";

const PublicationFilter = (props) => {
  const { data, filterCategory, checkedItems } = props;

  return (
    <Section
      bg={useColorModeValue("transparent")}
      size="lg"
      mb="8"
      h="auto"
      px={{ base: "32px", md: "0" }}
      py="6"
      display="flex"
      gap="4"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        spacing={[1, 5]}
        rowGap="4"
        direction={["column", "row"]}
        wrap="wrap"
        alignItems={"center"}
        justifyContent="center"
      >
        {data.map(({ title }, i) => {
          return (
            <Button key={i} colorScheme={"primary"} variant="outline">
              <Checkbox
                colorScheme={"blue"}
                value={title}
                checked={checkedItems[i]}
                defaultChecked={checkedItems[i]}
                onChange={(e) => filterCategory(e, title)}
              >
                {title}
              </Checkbox>
            </Button>
          );
        })}
      </Stack>
    </Section>
  );
};

export default PublicationFilter;
