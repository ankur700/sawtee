import {
  useColorModeValue,
  Stack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";

const PublicationFilter = ({
  categories,
  allChecked,
  isIndeterminate,
  checkedItems,
  setCheckedItems,
}) => {
  return (
    <>
      <CheckboxGroup colorScheme="primary" size="md" variant="outline">
        <Stack
          spacing={[1, 5]}
          direction={["column", "row"]}
          wrap="wrap"
          justifyContent="center"
          alignItems={"center"}
          gap="10px"
        >
          <Checkbox
            isChecked={allChecked}
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
        </Stack>
      </CheckboxGroup>
    </>
  );
};

export default PublicationFilter;
