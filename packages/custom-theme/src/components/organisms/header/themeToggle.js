import { Button, Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const ToggleDiv = motion(Box);

const ThemeToggle = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    /**
     * Ideally, only the button component should be used (without Flex).
     * Props compatible with <Button /> are supported.
     */
    <AnimatePresence exitBeforeEnter initial={false}>
      <ToggleDiv
        display="inline-block"
        key={useColorModeValue("light", "dark")}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          _focus={{ boxShadow: "none" }}
          w="fit-content"
          variant="ghost"
          {...props}
        >
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
      </ToggleDiv>
    </AnimatePresence>
  );
};

export default ThemeToggle;
