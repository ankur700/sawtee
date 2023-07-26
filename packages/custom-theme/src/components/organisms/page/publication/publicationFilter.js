import {
  useColorModeValue,
  Stack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import Link from "@frontity/components/link";
import React from "react";

const PublicationFilter = ({
  categories,
  allChecked,
  isIndeterminate,
  checkedItems,
  setCheckedItems,
}) => {
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );
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
            color={contentColor}
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
                color={contentColor}
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
