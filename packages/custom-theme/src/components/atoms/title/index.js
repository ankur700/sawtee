import { Text, useColorModeValue } from "@chakra-ui/react";

const Title = ({ text, color, ...rest }) => {
  return (
    <Text
      {...rest}
      as="h3"
      m="0"
      fontSize={{ base: "lg", sm: "3xl", md: "3xl", lg: "4xl" }}
      fontFamily="heading"
      color={color ? color : useColorModeValue("gray.800", "whiteAlpha.800")}
    >
      {text}
    </Text>
  );
};

export default Title;
