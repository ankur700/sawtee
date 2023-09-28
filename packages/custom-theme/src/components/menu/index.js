import {
  Stack,
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect } from "frontity";
import React, { forwardRef, useRef } from "react";
import { SocialMenu } from "../header/social-menu";
import { IoIosMenu } from "react-icons/io";
import Link from "../atoms/link";

export const MenuButton = forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="button"
    id="hamburger-menu"
    display={{ base: "flex", lg: "none" }}
    alignItems="center"
    justifyContent="center"
    flexShrink="0"
    aria-label="Menu"
    // mr={{ base: "auto", lg: "0" }}
    ml={{ base: "12px", sm: "0" }}
    {...props}
  >
    <Box boxSize={10} color="accent.400" as={IoIosMenu} />
  </Box>
));

export function MenuDrawer({ children, ...props }) {
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

export const MenuItem = ({ index, children, mb, link, ...rest }) => (
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

const Menu = ({ state, actions }) => {
  const menu = state.source.get("/menu/primary/");
  const { isMobileMenuOpen } = state.theme;
  const { openMobileMenu, closeMobileMenu } = actions.theme;
  const buttonRef = useRef();
  return (
    <>
      <MenuButton ref={buttonRef} onClick={openMobileMenu} />

      <MenuDrawer
        finalFocusRef={buttonRef}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      >
        <Stack mt="20%" spacing={6} direction="column" as="ul" ml="0">
          {menu.isReady &&
            menu.items.map((menuItem, index) => (
              <MenuItem
                link={menuItem.href}
                key={menuItem.ID}
                index={`0${index + 1}`}
              >
                {menuItem.title}
              </MenuItem>
            ))}
        </Stack>

        {state.theme.showSocialLinks && (
          <Box marginTop={10} paddingY={5}>
            <SocialMenu ml="0" menu={state.theme.socialLinks} />
          </Box>
        )}
      </MenuDrawer>
    </>
  );
};

export default connect(Menu);
