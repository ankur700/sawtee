import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Link from "../../atoms/link";

const MenuItem = ({ index, children, mb, link, ...rest }) => (
  <Box as="li" listStyleType="none" mb={mb} {...rest}>
    <Link
      display="block"
      color={useColorModeValue("gray.700", "whiteAlpha.700")}
      role="group"
      pos="relative"
      minH="40px"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.500", "whiteAlpha.500")}
      _hover={{
        bg: `${useColorModeValue(
          "rgba(0, 0, 0, 0.1)",
          "rgba(255, 255, 255, 0.1)"
        )}`,
        borderColor: "accent.400",
        color: `{useColorModeValue("primary.700", "accent.400")}`,
      }}
      _focus={{
        bg: `${useColorModeValue(
          "rgba(0, 0, 0, 0.4)",
          "rgba(255, 255, 255, 0.4)"
        )}`,
        borderColor: "accent.400",
        color: "accent.400",
      }}
      transition="all 0.3s"
      padding="12px"
      link={link}
    >
      <Box
        as="span"
        pos="absolute"
        top="50%"
        transform="translateY(-50%)"
        fontSize="md"
        letterSpacing="-0.024"
        lineHeight="1.23"
      >
        {index}
      </Box>
      <Box
        paddingLeft={10}
        letterSpacing="-0.004em"
        lineHeight="1.39"
        fontWeight="medium"
        fontSize="1.125rem"
        cursor="pointer"
      >
        {children}
      </Box>
    </Link>
  </Box>
);

export default MenuItem;
