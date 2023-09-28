import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Link from "../atoms/link";
import MobileMenu from "../menu";
import { isUrl, omitConnectProps } from "../helpers";
import { connect } from "frontity";

const SiteHeader = (props) => (
  <Box
    as="header"
    transition="transform ease .25s"
    width="100%"
    pos="fixed"
    top="0"
    left="0"
    bg={useColorModeValue("#fff", "primary.900")}
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
    height={"5rem"}
    maxW="1550px"
    justifyContent="space-between"
    alignItems="center"
    {...props}
  />
);

const Logo = ({ isImage = true, src }) => {
  const TextLogoColor = useColorModeValue("white", "primary.700");

  if (isImage) {
    return <Box as="img" src={src} alt="Logo Image" width="120px" />;
  } else {
    return (
      <Box
        fontSize="2xl"
        color={TextLogoColor}
        fontFamily="heading"
        textTransform="uppercase"
        fontWeight="bold"
      >
        {src}
      </Box>
    );
  }
};

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
      <Text as="b" color={useColorModeValue("primary.700", "whiteAlpha.800")}>
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
