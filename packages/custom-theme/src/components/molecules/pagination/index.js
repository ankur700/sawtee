import React, { ReactNode } from "react";
import { Flex, chakra } from "@chakra-ui/react";

const Pagination = () => {
  const PagButton = (props) => {
    const activeStyle = {
      bg: "primary.600",
      _dark: {
        bg: "primary.500",
      },
      color: "white",
    };
    return (
      <chakra.button
        mx={1}
        px={4}
        py={2}
        rounded="md"
        bg="white"
        color="gray.700"
        _dark={{
          color: "white",
          bg: "gray.800",
        }}
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
      >
        {props.children}
      </chakra.button>
    );
  };

  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Flex>
        <PagButton disabled>previous</PagButton>
        <PagButton active>1</PagButton>
        <PagButton>2</PagButton>
        <PagButton>3</PagButton>
        <PagButton>4</PagButton>
        <PagButton>5</PagButton>
        <PagButton>Next</PagButton>
      </Flex>
    </Flex>
  );
};

export default Pagination;
