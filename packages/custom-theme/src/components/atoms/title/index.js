import { Text, useColorModeValue } from "@chakra-ui/react";

const Title = ({ text, color, ...rest }) => {
  return (
    <Text
      {...rest}
      fontSize={{ base: "lg", sm: "3xl", md: "3xl", lg: "4xl" }}
      color={color ? color : useColorModeValue("primary.700", "whiteAlpha.900")}
    >
      {text}
    </Text>
  );
};

export default Title;
