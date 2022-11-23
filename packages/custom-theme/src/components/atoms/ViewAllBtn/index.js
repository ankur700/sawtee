import React, { useState } from "react";
import { styled } from "frontity";
import { HiArrowRight, HiChevronRight } from "react-icons/hi";
import { Button, useColorModeValue } from "@chakra-ui/react";

const ViewAllBtn = ({ text, uppercase, ...rest }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ViewButton
      px={["8", "12", "16"]}
      py={["4", "6", "6"]}
      variant="outline"
      colorScheme={"gray"}
      aria-label="view all button"
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      fontSize={{ base: "md", md: "lg", lg: "xl" }}
      rightIcon={hovered ? <HiArrowRight /> : <HiChevronRight />}
      {...rest}
    >
      {uppercase ? text.toUpperCase() : text}
    </ViewButton>
  );
};

export default ViewAllBtn;

const ViewButton = styled(Button)``;
