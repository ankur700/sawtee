import { Box } from "@chakra-ui/react";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useColorModeValue } from "@chakra-ui/react";

const SearchButton = (props) => (
  <Box
    aria-label="Search this site"
    as="button"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexShrink="0"
    boxSize="40px"
    // ml={{ base: "auto", lg: "3rem" }}
    {...props}
  >
    <Box
      boxSize={6}
      color={useColorModeValue("primary.700", "white")}
      as={IoIosSearch}
    />
  </Box>
);

export default SearchButton;
