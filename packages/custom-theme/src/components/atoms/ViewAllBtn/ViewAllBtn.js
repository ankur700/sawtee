import React, { useState } from "react";
import { styled } from "frontity";
import { HiArrowRight, HiChevronRight } from "react-icons/hi";
import { Button } from "@chakra-ui/react";

const ViewAllBtn = ({ text, uppercase }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ViewButton
      variant="outline"
      w={["full", "full", "12em"]}
      colorScheme="black"
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      rightIcon={hovered ? <HiArrowRight /> : <HiChevronRight />}
    >
      {uppercase ? text.toUpperCase() : text}
    </ViewButton>
  );
};

export default ViewAllBtn;

const ViewButton = styled(Button)``;
