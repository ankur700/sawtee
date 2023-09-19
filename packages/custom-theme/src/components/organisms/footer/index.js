import {
  Box,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Grid,
  GridItem,
  ListItem,
  List,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { SocialMenu } from "../header/social-menu";
import { connect, styled } from "frontity";
import FooterSubscription from "./footer-subscription";
import { MapModel } from "../../atoms/mapModel";

const FancyLink = styled(Link)`
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
    bg="primary.100"
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

  if (item.title === "Contact Us") {
    return (
      <Stack align="flex-start" id={item.title}>
        <ListHeader>{item.title}</ListHeader>
        <List spacing={2}>
          {item.child_items &&
            item.child_items.map((child_item) => {
              const { url, title } = child_item;

              return (
                <ListItem key={title}>
                  {title === "Address: Tukucha Marg, Baluwatar, Kathmandu" ? (
                    <>
                      <FancyLink onClick={onOpen} color={linkcolor}>
                        {title}
                      </FancyLink>
                      <MapModel
                        isOpen={isOpen}
                        onClose={onClose}
                        mapLink={url}
                      />
                    </>
                  ) : (
                    <FancyLink color={linkcolor}>{title}</FancyLink>
                  )}
                </ListItem>
              );
            })}
        </List>
      </Stack>
    );
  } else {
    return (
      <Stack align="flex-start" id={item.title}>
        <ListHeader>{item.title}</ListHeader>
        <List spacing={2}>
          {item.child_items &&
            item.child_items.map((child_item) => {
              const { url, title } = child_item;
              const link = libraries.source.normalize(url);

              return (
                <ListItem key={title}>
                  <FancyLink href={link} color={linkcolor}>
                    {title}
                  </FancyLink>
                </ListItem>
              );
            })}
        </List>
      </Stack>
    );
  }
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
