import {
  Box,
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
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { SocialMenu } from "../header/social-menu";
import { connect, styled } from "frontity";
import Iframe from "@frontity/components/iframe";
import link from "../../atoms/link";

const FancyLink = styled(link)`
  position: relative;
  text-decoration: none;
  // font-family: var(--chakra-fonts-heading);
  color: ${(props) => (props.color ? props.color : "inherit")};

  &::after {
    content: "";
    width: 0%;
    height: 2px;
    position: absolute;
    bottom: -5px;
    left: 0;

    background: ${(props) => (props.color ? props.color : "#fff")};
    opacity: 0;
    transition: all 0.5s ease;
  }

  &:hover {
    text-decoration: none;
    &::after {
      width: 100%;
      opacity: 1;
    }
  }
`;

const FooterSection = (props) => (
  <Box
    as="footer"
    pos="relative"
    bg={useColorModeValue("#e8f3ff", "primary.900")}
    py={{ base: "32px", lg: "40px" }}
    {...props}
  />
);

const FooterSectionGroup = (props) => (
  <Grid
    templateColumns={{ sm: "1fr", md: "1fr 2fr 1fr" }}
    maxWidth="7xl"
    mx="auto"
    width="100%"
    spacing={8}
    {...props}
  />
);

const FooterSectionItem = (props) => (
  <Box
    padding={props.padding ? props.padding : "24px"}
    color={useColorModeValue("gray.800", "whiteAlpha.800")}
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

const Widget = ({ item, libraries, linkcolor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack align="flex-start" id={item.title}>
        <ListHeader>{item.title}</ListHeader>
        {item.child_items
          ? item.child_items.map((item) => {
              const { url, title } = item;
              const link = libraries.source.normalize(url);
              return (
                <FancyLink
                  key={item.title}
                  link={title === "Map" ? null : link}
                  onClick={title === "Map" ? onOpen : null}
                  color={linkcolor}
                >
                  {title}
                </FancyLink>
              );
            })
          : null}
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
          <ModalHeader color={useColorModeValue("gray.700", "whiteAlpha.900")}>
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
  const { items, isReady } = state.source.get("/menu/footer/");
  const FancyLinkColor = useColorModeValue("#222", "#FFF");

  return (
    <FooterSection alignSelf="flex-end">
      <FooterSectionGroup
        templateColumns={{ sm: "1fr", md: "1fr 1fr 1fr" }}
        spacing={8}
      >
        <FooterSectionItem>
          <Stack colSpan={1} id={"Contact"}>
            <ListHeader color={useColorModeValue("gray.800", "whiteAlpha.900")}>
              {"Contact Us"}
            </ListHeader>
            <Stack as="ul" alignItems={"start"} listStyleType="none">
              <FancyLink color={FancyLinkColor} link="tel:+977-1-4444438">
                Phone: +977-1-4444438
              </FancyLink>
              <FancyLink color={FancyLinkColor} link="tel:+977 1 4444570">
                Fax: +977-1-4444570
              </FancyLink>
              <FancyLink color={FancyLinkColor} link="mailto:sawtee@sawtee.org">
                Email: sawtee@sawtee.org
              </FancyLink>

              <FancyLink color={FancyLinkColor} link="#">
                Address: Tukucha Marg, Baluwatar, Kathmandu
              </FancyLink>
            </Stack>
          </Stack>
        </FooterSectionItem>
        {isReady &&
          Object.entries(items).map(([key, item]) => {
            return (
              <FooterSectionItem key={key}>
                <Widget
                  colSpan={1}
                  item={item}
                  libraries={libraries}
                  linkcolor={FancyLinkColor}
                />
              </FooterSectionItem>
            );
          })}
      </FooterSectionGroup>

      <FooterSectionGroup templateColumns={["1fr", "repeat(3, 1fr)"]} mt="12">
        <FooterSectionItem
          // padding={"24px 0"}
          colSpan={1}
          fontWeight="bold"
          fontFamily="heading"
          textTransform="uppercase"
        >
          © {new Date().getFullYear()} {state.frontity.title}
        </FooterSectionItem>

        <FooterSectionItem
          // padding={"24px 0"}
          colSpan={1}
          borderColor="accent.400"
        >
          <SocialMenu ml="0" menu={state.theme.socialLinks} />
        </FooterSectionItem>

        <FooterSectionItem
          // padding={"24px 0"}
          colSpan={1}
          fontWeight="bold"
          fontFamily="heading"
          textTransform="uppercase"
        >
          Made with ❤ by{" "}
          <FancyLink color={FancyLinkColor} href="https://ankursingh.com.np/">
            Ankur
          </FancyLink>
        </FooterSectionItem>
      </FooterSectionGroup>
    </FooterSection>
  );
};

export default connect(Footer);
