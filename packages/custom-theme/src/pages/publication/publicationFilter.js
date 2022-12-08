import React from "react";
import {
  useColorModeValue,
  Stack,
  CheckboxGroup,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import Section from "../../components/styles/section";

const PublicationFilter = (props) => {
  const { list, handleChange, handleClickAll } = props;
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
        <Button colorScheme={"primary"} variant="outline">
          <Checkbox value="all" onChange={(event) => handleClickAll(event)}>
            All
          </Checkbox>
        </Button>
        {list.map(({ title, checked }) => {
          console.log(list);
          return (
            <Button key={title} colorScheme={"primary"} variant="outline">
              <Checkbox
                value={title}
                defaultChecked={checked}
                onChange={(event) => handleChange(event)}
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
