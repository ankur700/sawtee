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
  GridItem,
  ListItem,
  List,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { SocialMenu } from "../header/social-menu";
import { connect, styled } from "frontity";
import Iframe from "@frontity/components/iframe";
import link from "../../atoms/link";
import FooterSubscription from "./footer-subscription";

const FancyLink = styled(link)`
  position: relative;
  text-decoration: none;
  // font-family: var(--chakra-fonts-heading);
  color: ${(props) => (props.color ? props.color : "inherit")};

  &::after {
    content: "";
    width: 0%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;

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

const FooterSection = ({ children, ...rest }) => (
  <Box
    as="footer"
    pos="relative"
    bg="accent.50"
    _dark={{ bg: "primary.900" }}
    {...rest}
  >
    {children}
  </Box>
);

const FooterSectionGroup = ({ children, ...rest }) => (
  <Grid maxWidth="7xl" mx="auto" width="100%" gap={8} {...rest}>
    {children}
  </Grid>
);

const FooterSectionItem = ({ children, ...rest }) => (
  <GridItem color={useColorModeValue("gray.800", "whiteAlpha.800")} {...rest}>
    {children}
  </GridItem>
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
        <List spacing={2}>
          {item.child_items
            ? item.child_items.map((child_item) => {
                const { url, title } = child_item;
                const link = libraries.source.normalize(url);
                return (
                  <ListItem key={title}>
                    {title === "Address: Tukucha Marg, Baluwatar, Kathmandu" ? (
                      <FancyLink link={link} onClick={onOpen} color={linkcolor}>
                        {title}
                      </FancyLink>
                    ) : (
                      <FancyLink link={link} color={linkcolor}>
                        {title}
                      </FancyLink>
                    )}
                  </ListItem>
                );
              })
            : null}
        </List>
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
            <ModalHeader
              color={useColorModeValue("gray.700", "whiteAlpha.900")}
            >
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
      </Stack>
    </>
  );
};

const Footer = ({ state, libraries }) => {
  const { items, isReady } = state.source.get("/menu/footer/");
  const FancyLinkColor = useColorModeValue("#222", "#FFF");
  const maxWidth = useBreakpointValue(["xs", "sm", "md"]);

  return (
    <FooterSection alignSelf="flex-end" px={{ base: 6, md: 8, lg: 12 }} py={12}>
      <FooterSectionGroup
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        columnGap={[2, 4, 6]}
        rowGap={4}
      >
        {isReady &&
          Object.entries(items).map(([key, item]) => {
            return (
              <FooterSectionItem
                key={key}
                colSpan={item.title === "Contact Us" ? { base: 1, lg: 2 } : 1}
                placeSelf="start"
                maxW={maxWidth}
              >
                <Widget
                  item={item}
                  libraries={libraries}
                  linkcolor={FancyLinkColor}
                />
              </FooterSectionItem>
            );
          })}
        <FooterSectionItem
          colSpan={{ base: 1, md: 1, lg: 2 }}
          placeSelf="center"
        >
          <FooterSubscription />
        </FooterSectionItem>
      </FooterSectionGroup>

      <Stack
        flexDir={{ base: "column", md: "row" }}
        justifyContent={{ md: "space-between" }}
        alignItems="center"
        maxW="3xl"
        mx="auto"
        mt="16"
        gap={6}
      >
        <FooterSectionItem
          colSpan={1}
          fontWeight="bold"
          fontFamily="heading"
          textTransform="uppercase"
        >
          © {new Date().getFullYear()} {state.frontity.title}
        </FooterSectionItem>

        <FooterSectionItem colSpan={1} borderColor="accent.400">
          <SocialMenu ml="0" menu={state.theme.socialLinks} />
        </FooterSectionItem>
      </Stack>
    </FooterSection>
  );
};

export default connect(Footer);
