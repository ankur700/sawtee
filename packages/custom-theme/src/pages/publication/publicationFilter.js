import React from "react";
import {
  useColorModeValue,
  Stack,
  Checkbox,
  Button,
  Text,
} from "@chakra-ui/react";
import Section from "../../components/styles/section";

const PublicationFilter = (props) => {
  const { data, linkColor } = props;

  console.log(data);

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
            <Button
              key={i}
              colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
              variant="outline"
            >
              <Checkbox colorScheme={"blue"} value={title}>
                <Text color={linkColor}>{title}</Text>
              </Checkbox>
            </Button>
          );
        })}
      </Stack>
    </Section>
  );
};

export default PublicationFilter;
