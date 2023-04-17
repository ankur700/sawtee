import {
  Box,
  SimpleGrid,
  Stack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SocialMenu } from "../header/social-menu";
import { connect } from "frontity";
import Subscription from "./subscription";


const FooterSection = (props) => (
  <Box
    as="footer"
    pos="relative"
    bg={useColorModeValue("primary.50", "primary.900")}
    color={useColorModeValue("gray.800", "whiteAlpha.800")}
    py={{ base: "32px", lg: "40px" }}
    {...props}
  />
);

const FooterSectionGroup = (props) => (
  <SimpleGrid
    // columns={{ base: 1, sm: 2, md: 4 }}
    templateColumns={{ sm: "1fr", md: "1fr 2fr 1fr" }}
    maxWidth="1150px"
    mx="auto"
    width="90%"
    spacing={8}
    {...props}
  />
);

const FooterSectionItem = (props) => (
  <Box
    padding="24px"
    color={useColorModeValue("gray.800", "whiteAlpha.800")}
    textAlign="center"
    {...props}
  />
);

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"semibold"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Widget = ({ item, libraries }) => {
  return (
    <Stack align="flex-start" id={item.title}>
      <ListHeader>{item.title}</ListHeader>
      {item.child_items &&
        item.child_items.map((item, i) => {
          const { url, title } = item;
          const link = libraries.source.normalize(url);
          return (
            <Link key={i} href={link}>
              {title}
            </Link>
          );
        })}
    </Stack>
  );
};

const Footer = ({ state, libraries }) => {
  const { items } = state.source.get("/menus/footer/");
  return (
    <FooterSection alignSelf="flex-end">
      <FooterSectionGroup
        templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 2fr" }}
        spacing={8}
      >
        <Stack id={"Contact"}>
          <ListHeader color={useColorModeValue("gray.800", "whiteAlpha.800")}>
            {"Contact Us"}
          </ListHeader>
          <Stack as="ul" alignItems={"start"} listStyleType="none">
            <Link href="tel:+977-1-4444438">Phone: +977-1-4444438</Link>
            <Link href="tel:+977 1 4444570">Fax: +977-1-4444570</Link>
            <Link href="mailto:sawtee@sawtee.org">
              Email: sawtee@sawtee.org
            </Link>

            <Link href="#">Address: Tukucha Marg, Baluwatar, Kathmandu</Link>
          </Stack>
        </Stack>
        {items &&
          Object.entries(items).map(([key, item]) => {
            return <Widget key={key} item={item} libraries={libraries} />;
          })}

        <Subscription />
      </FooterSectionGroup>

      <FooterSectionGroup columns={{ base: 1, md: 3 }} mt="12">
        <FooterSectionItem
          fontWeight="bold"
          fontFamily="heading"
          textTransform="uppercase"
        >
          © {new Date().getFullYear()} {state.frontity.title}
        </FooterSectionItem>

        <FooterSectionItem borderColor="accent.400">
          <SocialMenu
            ml="0"
            justifyContent="center"
            menu={state.theme.socialLinks}
          />
        </FooterSectionItem>

        <FooterSectionItem
          fontWeight="bold"
          fontFamily="heading"
          textTransform="uppercase"
        >
          Made with ❤ by <Link href="https://ankursingh.com.np/">Ankur</Link>
        </FooterSectionItem>
      </FooterSectionGroup>
    </FooterSection>
  );
};

export default connect(Footer);
