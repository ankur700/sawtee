import { Text, useColorModeValue } from "@chakra-ui/react";

const Title = ({ text, color, ...rest }) => {
  return (
    <Text
      {...rest}
      as="h3"
      m="0"
      fontSize={{ base: "xl", md: "2xl" }}
      fontFamily="heading"
      color={color ? color : useColorModeValue("gray.800", "whiteAlpha.800")}
    >
      {text}
    </Text>
  );
};

export default Title;
