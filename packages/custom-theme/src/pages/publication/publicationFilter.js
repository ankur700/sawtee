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
  const { data, filterCategory, allChecked, checkedItems, setCheckedItems } =
    props;

  const defaultValues = () => {
    let array = [];
    data.map((item, i) => {
      if (i <= 4) {
        array.push(item.title);
      }
    });
    return array;
  };

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
          <Checkbox
            value="all"
            isChecked={allChecked}
            onChange={() => setCheckedItems(...checkedItems)}
          >
            All
          </Checkbox>
        </Button>
        {data.map(({ title }, i) => {
          return (
            <Button key={i} colorScheme={"primary"} variant="outline">
              <Checkbox
                value={title}
                isChecked={checkedItems[i]}
                defaultChecked={checkedItems[i]}
                onChange={(e) => {
                  let newArray = [...checkedItems];
                  newArray[i] = true ? false : true;
                  setCheckedItems([...newArray]);
                  filterCategory(e, title);
                }}
              >
                {title}
              </Checkbox>
              {console.log(checkedItems[i])}
            </Button>
          );
        })}
      </Stack>
    </Section>
  );
};

export default PublicationFilter;
