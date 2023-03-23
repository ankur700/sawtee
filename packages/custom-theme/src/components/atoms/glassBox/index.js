import { Box, useColorModeValue } from "@chakra-ui/react";
import { styled } from "frontity";

const GlassBox = ({ children, ...rest }) => {
  return (
    <GlassMorphismBox
      w="100%"
      h="auto"
      border={useColorModeValue("1px solid", "none")}
      borderColor={"rgba(255, 255, 255, 0.18)"}
      bg={useColorModeValue("rgba(255, 255, 255, 0.1)", "rgba(0, 0, 0, 0.4)")}
      {...rest}
    >
      {children}
    </GlassMorphismBox>
  );
};

const GlassMorphismBox = styled(Box)`
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
`;

export default GlassBox;
