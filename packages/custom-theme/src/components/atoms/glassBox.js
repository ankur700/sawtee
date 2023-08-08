import { Box, useColorModeValue } from "@chakra-ui/react";

const GlassBox = ({ children, ...rest }) => {
  return (
    <Box
      w="100%"
      h="auto"
      border={useColorModeValue("1px solid", "none")}
      borderColor={"blackAlpha.100"}
      bg={useColorModeValue("blackAlpha.100", "blackAlpha.300")}
      boxShadow={"0 8px 20px 0 rgba(0, 0, 0, 0.17)"}
      borderRadius="xl"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default GlassBox;
