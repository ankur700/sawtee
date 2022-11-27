import { Text, useColorModeValue } from "@chakra-ui/react";

const Title = ({ text, color, ...rest }) => {
  return (
    <Text
      {...rest}
      as="h3"
      m="0"
      fontSize={{ base: "lg", sm: "3xl", md: "3xl", lg: "4xl" }}
      color={color ? color : useColorModeValue("gray.900", "whiteAlpha.900")}
    >
      {text}
    </Text>
  );
};

export default Title;
