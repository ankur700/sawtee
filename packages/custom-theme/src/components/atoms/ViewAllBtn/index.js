import React, { useState } from "react";
import { HiArrowRight, HiChevronRight } from "react-icons/hi";
import { Button, useColorModeValue } from "@chakra-ui/react";
import Link from "../link";

const ViewAllBtn = ({ text, link, ...rest }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link link={link ? link : "#"} _hover={{ textDecoration: "none" }}>
    <Button
      variant="outline"
      colorScheme={"primary"}
      aria-label="view all button"
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      fontSize={{ base: "sm", md: "md" }}
      rightIcon={hovered ? <HiArrowRight /> : <HiChevronRight />}
      {...rest}
    >
        {text}
    </Button>
      </Link>
  );
};

export default ViewAllBtn;
