import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SocialMenu } from "../header/social-menu";
import { connect } from "frontity";
import Subscription from "./subscription";
import { styled, css } from "frontity";
import { HiOutlineXCircle } from "react-icons/hi";

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
    columns={{ base: 1, sm: 2, md: 4 }}
    maxWidth="1150px"
    mx="auto"
    width="90%"
    {...props}
  />
);

const FooterSectionItem = (props) => (
  <Box padding="24px" color="white" textAlign="center" {...props} />
);

const FancyLink = styled.a`
  text-decoration: none;
  & span {
    position: relative;
  }
  & span::after {
    content: "";
    width: 0%;
    opacity: 0;
    height: 2px;
    background: ${(props) => props.bg || "#fff"};
    position: absolute;
    top: 20px;
    left: 0;
    transition: all 0.3s ease-in;
  }

  &:hover span::after {
    width: 100%;
    opacity: 1;
  }
`;

const Widget = ({ item, libraries }) => {
  return (
    <Box id={item.title}>
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        color={useColorModeValue("gray.800", "whiteAlpha.800")}
      >
        {item.title}
      </Text>
      <VStack as="ul" alignItems={"start"} listStyleType="none">
        {item.child_items &&
          item.child_items.map((item, i) => {
            const { url, title } = item;
            const link = libraries.source.normalize(url);
            return (
              <Text as="li" key={i} fontSize={{ base: "sm", md: "md" }}>
                <FancyLink href={link}>
                  <span>{title}</span>
                </FancyLink>
              </Text>
            );
          })}
      </VStack>
    </Box>
  );
};

const Footer = ({ state, libraries }) => {
  const { items } = state.source.get("/menus/footer_menu/");

  return (
    <FooterSection alignSelf="flex-end">
      <FooterSectionGroup>
        <Box id={"Contact"}>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color={useColorModeValue("gray.800", "whiteAlpha.800")}
          >
            {"Contact Us"}
          </Text>
          <VStack as="ul" alignItems={"start"} listStyleType="none">
            <Text>
              Phone :{" "}
              <FancyLink href="tel:+977-1-4444438">
                <span>+977-1-4444438</span>
              </FancyLink>
            </Text>
            <Text>
              Fax :{" "}
              <FancyLink href="tel:+977 1 4444570">
                <span>+977-1-4444570</span>
              </FancyLink>
            </Text>
            <Text>
              Email :{" "}
              <FancyLink href="mailto:sawtee@sawtee.org">
                <span>sawtee@sawtee.org</span>
              </FancyLink>
            </Text>
            <Text>
              Address :{" "}
              <FancyLink title={"Click to toggle map view"} href="#">
                <span>Tukucha Marg, Baluwatar, Kathmandu</span>
              </FancyLink>
            </Text>
          </VStack>
        </Box>
        {Object.entries(items).map(([key, item]) => {
          return <Widget key={key} item={item} libraries={libraries} />;
        })}

        <Subscription />
      </FooterSectionGroup>

      <FooterSectionGroup columns={{ base: 1, md: 3 }} mt="8">
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
          Made with ❤ by{" "}
          <FancyLink href="https://ankursingh.com.np/">
            <span>Ankur</span>
          </FancyLink>
        </FooterSectionItem>
      </FooterSectionGroup>
    </FooterSection>
  );
};

export default connect(Footer);
