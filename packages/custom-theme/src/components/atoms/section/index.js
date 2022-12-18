import { Box } from "@chakra-ui/react";

const Section = ({ children, ...rest }) => {
  return <Box {...rest}>{children}</Box>;
};

export default Section;
