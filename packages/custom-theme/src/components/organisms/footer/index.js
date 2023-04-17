import {
  Box,
  SimpleGrid,
  Stack,
  Link,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SocialMenu } from "../header/social-menu";
import { connect } from "frontity";
import Subscription from "./subscription";
import Iframe from "@frontity/components/iframe";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack align="flex-start" id={item.title}>
        <ListHeader>{item.title}</ListHeader>
        {item.child_items &&
          item.child_items.map((item, i) => {
            const { url, title } = item;
            const link = libraries.source.normalize(url);
            return (
              <Link
                key={i}
                href={title === "Map" ? null : link}
                onClick={title === "Map" ? onOpen : null}
              >
                {title}
              </Link>
            );
          })}
      </Stack>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        closeOnOverlayClick={true}
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue(
            "rgba(255, 255, 255, 0.7)",
            "rgba(0, 0, 0, 0.7)"
          )}
          maxW={"2xl"}
        >
          <ModalHeader color={useColorModeValue("gray.700", "whiteAlpha.800")}>
            Our Location
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={"0 auto"}>
            <Iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.8576860518533!2d85.32674871047516!3d27.721679976074906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1913dfb0b0b3%3A0x4d5d3519d24d3c38!2sSouth%20Asia%20Watch%20on%20Trade%2C%20Economics%20and%20Environment%20(SAWTEE)!5e0!3m2!1sne!2snp!4v1681725594330!5m2!1sne!2snp"
              title="SAWTEE's Location"
              height="450"
              width="600"
              loading="lazy"
              // rootMargin="0 auto"
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">
              <Link
                href="https://goo.gl/maps/fwZuwNSbjN5jwZia7"
                target="_blank"
              >
                View Map
              </Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
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
