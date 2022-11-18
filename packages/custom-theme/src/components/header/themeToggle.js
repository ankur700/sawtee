import React from "react";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="md"
      onClick={toggleColorMode}
      color={`mode.${colorMode}.text`}
      border="1px solid"
      borderColor={`mode.${colorMode}.text`}
      aria-label="toggle theme"
      icon={colorMode === "light" ? <IoIosMoon /> : <IoIosSunny />}
      zIndex="sticky"
      mr={"1rem"}
      bg={useColorModeValue("white", "whiteAlpha.100")}
      _focus={{ boxShadow: "none" }}
    />
  );
};

export default ThemeToggle;
