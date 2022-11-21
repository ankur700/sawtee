import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { styled } from "frontity";
import React from "react";
import FrontityLink from "../link";

const Link = styled(FrontityLink)`
  position: relative;
  // color: #fff;
  text-decoration: none;

  &:after {
    transition: bottom ease 0.25s, background-color ease 0.25s;
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: transparent;
  }

  &:hover {
    &:after {
      bottom: -5px;
      background-color: ${(p) => p.theme.colors.accent[400]};
    }
  }
`;

export const SiteMenu = (props) => (
  <Stack
    ml="50px"
    spacing="50px"
    as="ul"
    listStyleType="none"
    align="center"
    direction="row"
    color="white"
    justifyContent={"center"}
    {...props}
  />
);

const SiteMenuItem = ({ link, ...props }) => (
  <Box
    as="li"
    color={useColorModeValue("primary.700", "whiteAlpha.900")}
    fontSize={{ base: "sm", lg: "md" }}
    fontWeight="medium"
    fontFamily="Kelson"
    textTransform="uppercase"
    position="relative"
    cursor="pointer"
    letterSpacing={"1px"}
    {...props}
  >
    <Link link={link}>{props.children}</Link>
  </Box>
);

const Navigation = ({ menu, ...props }) => (
  <Box as="nav" width="100%" display={{ base: "none", lg: "block" }} {...props}>
    <SiteMenu>
      {menu.map((menu) => (
        <SiteMenuItem key={menu.name} link={menu.href}>
          {menu.name}
        </SiteMenuItem>
      ))}
    </SiteMenu>
  </Box>
);

export default Navigation;
