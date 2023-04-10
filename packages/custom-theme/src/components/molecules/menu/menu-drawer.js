import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function MenuDrawer({ children, ...props }) {
  return (
    <Drawer preserveScrollBarGap size="sm" placement="left" {...props}>
      <DrawerOverlay />
      <DrawerContent
        bg={useColorModeValue("white", "primary.700")}
        px={8}
        max="auto"
      >
        <DrawerCloseButton color={useColorModeValue("black", "white")} />
        {children}
      </DrawerContent>
    </Drawer>
  );
}

export default MenuDrawer;
