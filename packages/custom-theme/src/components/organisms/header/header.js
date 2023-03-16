import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Link from "../../atoms/link";
import MobileMenu from "../../molecules/menu";
import { isUrl, omitConnectProps } from "../../helpers";
import { connect } from "frontity";

const SiteHeader = (props) => (
  <Box
    as="header"
    transition="transform ease .25s"
    width="100%"
    pos="fixed"
    top="0"
    left="0"
    bg={useColorModeValue("white", "primary.700")}
    zIndex="90"
    boxShadow="md"
    justifyContent="space-between"
    {...props}
  />
);

const SiteHeaderInner = (props) => (
  <Flex
    // align="center"
    width={{ base: "auto", sm: "92%" }}
    mx="auto"
    height={{ base: "5.5rem", sm: "6.5rem" }}
    maxW="1550px"
    {...props}
    justifyContent="space-between"
    alignItems="center"
  />
);

const Logo = ({ isImage = true, src }) =>
  isImage ? (
    <Box as="img" src={src} alt="Logo Image" width="120px" />
  ) : (
    <Box
      fontSize="2xl"
      color={useColorModeValue("white", "primary.700")}
      fontFamily="heading"
      textTransform="uppercase"
      fontWeight="bold"
    >
      {src}
    </Box>
  );

const SiteLogo = connect(({ state, ...props }) => {
  // check if the logo is a url,
  // we assume, if it's a url, it points to an image, else it's a text
  const isImage = isUrl(state.theme.logo);
  return (
    <Box
      display="block"
      flexShrink="0"
      textAlign="center"
      {...omitConnectProps(props)}
    >
      <Link link="/">
        <Logo isImage={isImage} src={state.theme.logo} />
      </Link>
      <Text as="b" color={useColorModeValue("primary.700", "white")}>
        Estd: {state.frontity.year}
      </Text>
    </Box>
  );
});

const Header = ({ children, ...props }) => (
  <SiteHeader {...props}>
    <SiteHeaderInner>
      <MobileMenu />
      <SiteLogo />
      {children}
    </SiteHeaderInner>
  </SiteHeader>
);

export default Header;
