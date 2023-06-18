import { Box } from "@chakra-ui/react";

const sizes = {
  xs: "640px",
  sm: "700px",
  md: "750px",
  lg: "1150px",
  huge: "1550px",
  max: "2560px",
  full: "100%",
};

/**
 * @param {React.ComponentProps<typeof Box>} props
 */
const Section = ({ size = "lg", ...props }) => (
  <Box as="section" width="92%" mx="auto" maxW={sizes[size]} {...props} />
);
export default Section;
