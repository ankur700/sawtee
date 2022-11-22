import { Text, useColorModeValue } from "@chakra-ui/react";

const Title = ({ text, color }) => {
  return (
    <Text
      fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}
      color={color ? color : useColorModeValue("primary.700", "whiteAlpha.900")}
      px='12'
      py='8'
    >
      {text}
    </Text>
  );
};

export default Title;
