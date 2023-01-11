import { Box, useColorModeValue } from "@chakra-ui/react";
import { styled } from "frontity";

const GlassBox = ({ children, ...rest }) => {
  return (
    <Box
      w="100%"
      h="auto"
      border={useColorModeValue("1px solid", "none")}
      borderColor={useColorModeValue("gray.100", "none")}
      bg={useColorModeValue("rgba(255, 255, 255, 0.1)", "gray.800")}
      {...rest}
    >
      {children}
    </Box>
  );
};

// const GlassMorphismBox = styled(Box)`
//   background: rgba(255, 255, 255, 0.1);
//   box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
//   backdrop-filter: blur(4px);
//   -webkit-backdrop-filter: blur(4px);
//   border-radius: 10px;
//   border: 1px solid rgba(255, 255, 255, 0.18);
// `;

export default GlassBox;
