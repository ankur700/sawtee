import {
  useColorModeValue,
  Stack,
  CheckboxGroup,
  Checkbox,
  SimpleGrid,
} from "@chakra-ui/react";
// import Link from "@frontity/components/link";
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
    <CheckboxGroup colorScheme="primary" size="md" variant="outline">
      <SimpleGrid
        spacingX="20px"
        spacingY="10px"
        columns={[2, 2, 3]}
        // minChildWidth="120px"
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
            // <Link key={id} link={`/publications#${name}`}>
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
            // </Link>
          );
        })}
      </SimpleGrid>
    </CheckboxGroup>
  );
};

export default PublicationFilter;
