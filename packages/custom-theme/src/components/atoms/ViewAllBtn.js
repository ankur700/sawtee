import { useState } from "react";
import { HiArrowRight, HiChevronRight } from "react-icons/hi";
import { Button } from "@chakra-ui/react";

const ViewAllBtn = ({ text, ...rest }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      variant="solid"
      colorScheme={"primary"}
      aria-label="view all"
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      fontSize={{ base: "sm", md: "md" }}
      rightIcon={hovered ? <HiArrowRight /> : <HiChevronRight />}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default ViewAllBtn;
