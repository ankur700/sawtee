import { Box, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { SocialMenu } from "../header/social-menu";
import { connect } from "frontity";
import Subscription from "./subscription";
import { styled, css } from "frontity";

const FooterSection = (props) => (
  <Box
    as="footer"
    pos="relative"
    bg="primary.900"
    py={{ base: "32px", lg: "40px" }}
    {...props}
  />
);

const FooterSectionGroup = (props) => (
  <SimpleGrid
    columns={{ base: 1, md: 3 }}
    maxWidth="1150px"
    mx="auto"
    width="90%"
    {...props}
  />
);

const FooterSectionItem = (props) => (
  <Box padding="24px" color="white" textAlign="center" {...props} />
);

const AwesomeLink = styled.a`
  text-decoration: none;
  font-size: 1rem;
  color: #eee;
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

const Widget = () => {
  
}

const Footer = ({ state }) => (
  <FooterSection alignSelf="flex-end">
    <FooterSectionGroup>
      <Box id="contact" display={"flex"} flexDir="column">
        <Text>Contact Us</Text>
        <VStack>
          <Text>
            Phone :{" "}
            <AwesomeLink href="tel:+977-1-4444438">
              <span>+977-1-4444438</span>
            </AwesomeLink>
          </Text>
          <Text>
            Fax :{" "}
            <AwesomeLink href="tel:+977 1 4444570">
              <span>+977-1-4444570</span>
            </AwesomeLink>
          </Text>
          <Text>
            Email :{" "}
            <AwesomeLink href="mailto:sawtee@sawtee.org">
              <span>sawtee@sawtee.org</span>
            </AwesomeLink>
          </Text>
          <Text>
            Address :{" "}
            <a
              css={css`
                &:hover {
                  text-decoration: underline dotted !important;
                  text-underline-offset: 3px;
                  text-underline-position: under;
                  cursor: pointer;
                }
              `}
              title={"Click to toggle map view"}
              onClick={(e) => {
                e.preventDefault();
                showMapPreview();
              }}
            >
              <span>Tukucha Marg, Baluwatar, Kathmandu</span>
            </a>
          </Text>
        </VStack>
      </Box>
      <Box id="publications">
        <Text>Publications</Text>
        <VStack>
          <AwesomeLink href="">
            <span>Trade Insight</span>
          </AwesomeLink>

          <AwesomeLink href="">
            <span>Issue Paper</span>
          </AwesomeLink>

          <AwesomeLink href="">
            <span>Newsletter</span>
          </AwesomeLink>

          <AwesomeLink href="">
            <span>Workinig Paper</span>
          </AwesomeLink>

          <AwesomeLink href="">
            <span>Research Paper</span>
          </AwesomeLink>
        </VStack>
      </Box>
      <Box id="useful_links">
        <VStack>
          <AwesomeLink href="">
            <span>Map</span>
          </AwesomeLink>

          <AwesomeLink href="">
            <span>Work With Us</span>
          </AwesomeLink>

          <AwesomeLink href="">
            <span>Organization Policy</span>
          </AwesomeLink>

          <AwesomeLink href="">
            <span>Press Releases</span>
          </AwesomeLink>

          <AwesomeLink href="">
            <span>News</span>
          </AwesomeLink>
        </VStack>
      </Box>
      <Box id="subscription_box">
        <Subscription />
      </Box>
    </FooterSectionGroup>

    <FooterSectionGroup>
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
        <AwesomeLink href="https://ankursingh.com.np/">
          <span>Ankur</span>
        </AwesomeLink>
      </FooterSectionItem>
    </FooterSectionGroup>
  </FooterSection>
);

export default connect(Footer);
