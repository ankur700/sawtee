import { Box, useColorModeValue } from "@chakra-ui/react";

const GlassBox = ({ children, ...rest }) => {
  return (
    <Box
      w="100%"
      h="auto"
      border={useColorModeValue("1px solid", "none")}
      borderColor={"rgba(255, 255, 255, 0.18)"}
      bg={useColorModeValue("rgba(255, 255, 255, 0.75)", "rgba(0, 0, 0, 0.2)")}
      boxShadow={"0 8px 32px 0 rgba(0, 0, 0, 0.37)"}
      backdropFilter="blur(4px)"
      saturate={"180%"}
      borderRadius="xl"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default GlassBox;
