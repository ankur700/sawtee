import { Box } from "@chakra-ui/react";
import { styled } from "frontity";

const GlassBox = ({ children, ...rest }) => {
  return (
    <GlassMorphismBox w="100%" h="auto" {...rest}>
      {children}
    </GlassMorphismBox>
  );
};

const GlassMorphismBox = styled(Box)`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 10px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export default GlassBox;
