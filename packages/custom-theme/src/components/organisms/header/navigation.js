import {
  Box,
  Stack,
  useColorModeValue,
  Grid,
  Button,
  useDisclosure,
  GridItem,
  Text,
  Flex,
  Avatar,
  SimpleGrid,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { connect, styled } from "frontity";
import React from "react";
import FrontityLink from "../../atoms/link";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import MapImage from "../../../assets/Airports_Network_Map.png";

const Experts = [
  {
    name: "Posh R. Pandey",
    designation: "Director",
    email: "posh.pandey@sawtee.org",
    image: "../../../assets/webp/PRP.webp",
  },
  {
    name: "Paras Kharel",
    designation: "Executive Director",
    email: "paras.kharel@sawtee.org",
    image: "../../../assets/webp/paras foto.webp",
  },
  {
    name: "Dhrubesh C. Regmi",
    designation: "Founder",
    email: "dhrubesh.regmi@sawtee.org",
    image: "../../../assets/dhrubesh.JPG",
  },
  {
    name: "Neelu Thapa",
    designation: "Treasurer",
    email: "neelu.thapa@sawtee.org",
    image: "",
  },
  {
    name: "Dikshya Singh",
    designation: "Program Director",
    email: "dikshya.singh@sawtee.org",
    image: "../../../assets/dikshya.jpg",
  },
  {
    name: "Kshitiz Dahal",
    designation: "Senior Research Officer",
    email: "kshitiz.dahal@sawtee.org",
    image: "",
  },
];

const MenuLink = styled(FrontityLink)`
  position: relative;
  text-decoration: none;
  font-weight: bold;
  font-family: var(--chakra-fonts-heading)

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

const ExpertCard = ({ expert }) => {
  return (
    <Flex p={3} w="full" alignItems="center" justifyContent="center">
      <Flex
        shadow="lg"
        rounded="lg"
        bg={"accent.100"}
        _dark={{
          bg: "accent.600",
        }}
        direction="column"
        justifyContent="center"
        minH="180px"
        w="full"
      >
        <Box
          height="100%"
          width="100%"
          borderRadius="lg"
          p={3}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <Avatar
            src={expert.image}
            name={expert.name}
            borderRadius="full"
            boxSize="65px"
          />
        </Box>
        <Box
          gridColumn="span 8"
          p={2}
          width="full"
          height="full"
          borderRadius="lg"
          textAlign="center"
          mt={3}
        >
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="gray.800"
            _dark={{
              color: "white",
            }}
          >
            {expert.name}
          </Text>

          <Text
            fontSize="xs"
            fontWeight="normal"
            color="gray.800"
            _dark={{
              color: "gray.200",
            }}
          >
            {expert.designation}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export const SiteMenu = (props) => (
  <Stack
    m="0"
    spacing="20px"
    as="ul"
    listStyleType="none"
    alignItems="center"
    direction="row"
    color="white"
    {...props}
  />
);

const AboutMegaMenu = ({ item, ...rest }) => {
  return (
    <Box bg={"rgb(8, 126, 164,0.9)"}>
      <Grid
        templateColumns="repeat(6, 1fr)"
        pos="relative"
        gap={8}
        px={5}
        py={16}
        maxW={"92%"}
        m="0 auto"
        {...rest}
      >
        <GridItem colSpan={1}>
          <Box
            as="ul"
            display="flex"
            flexDirection="column"
            alignItems={"start"}
            gap={12}
          >
            {item.child_items.map((child) => {
              return (
                <Box
                  key={child.title}
                  as="li"
                  m="0"
                  color={"white"}
                  fontSize={"md"}
                  fontWeight="medium"
                  position="relative"
                  cursor="pointer"
                >
                  <MenuLink link={child.url}>{child.title}</MenuLink>
                </Box>
              );
            })}
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <Box
            w="full"
            position="relative"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            backgroundImage={`url(${MapImage})`}
            // backgroundColor="rgba(0,0,0,0.6)"
            // backgroundBlendMode="multiply"
            backgroundSize="cover"
            h={"100%"}
            px={"2rem"}
          >
            <Text
              fontSize={"lg"}
              color={"whiteAlpha.800"}
              m="0"
              alignSelf={"center"}
              zIndex={10}
              px={6}
              lineHeight={2.8}
            >
              South Asia Watch on Trade, Economics and Environment (SAWTEE) was
              launched in 1994 as a loose regional network of non-governmental
              organizations (NGOs) from five South Asian countries: Bangladesh,
              India, Nepal, Pakistan and Sri Lanka. Taking into consideration
              the emerging need for fair, effective and meaningful integration
              of South Asian countries into the regional as well as global
              economies, the major motto of this regional initiative has been
              “GLOBALIZATION YES, BUT WITH SAFETY NETS”
            </Text>
          </Box>
        </GridItem>
        <GridItem
          colSpan={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={10}
        >
          <Text fontSize="xl" fontWeight={"semibold"}>
            Our Experts
          </Text>
          <Grid
            templateColumns={"repeat(3, 1fr)"}
            templateRows={"repeat(2, auto)"}
            rowGap={8}
          >
            {Experts.map((expert) => {
              return (
                <GridItem key={expert.name}>
                  <ExpertCard expert={expert} />
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

const OurWorkMegaMenu = ({ item, ...rest }) => {
  return (
    <Box
      bg={"rgb(8, 126, 164,0.9)"}
      pos="relative"
      gap="16"
      p={10}
      display="flex"
      flexDirection={"column"}
      {...rest}
    >
      <VStack spacing={10} maxW="90%" m="0 auto">
        <Text fontSize="2xl" fontWeight="bold">
          {item.child_items[0].title}
        </Text>
        <SimpleGrid columns={3} spacing={6} placeItems="center">
          {item.child_items[0].child_items.map((grandChild) => {
            return (
              <Text key={grandChild.title} noOfLines={1}>
                <MenuLink link={grandChild.url} textAlign="center">
                  {grandChild.title}
                </MenuLink>
              </Text>
            );
          })}
        </SimpleGrid>
      </VStack>

      <Divider borderBottomWidth="2px" />

      <Grid
        templateColumns={"repeat(5, 1fr)"}
        columnGap={12}
        templateRows={"auto"}
        maxW="90%"
        m="0 auto"
        placeItems={"center"}
      >
        <GridItem colSpan={2} rowSpan={1}>
          <VStack spacing={10}>
            <Text fontSize="2xl" fontWeight="bold">
              {item.child_items[1].title}
            </Text>
            <SimpleGrid columns={2} spacing={6}>
              {item.child_items[1].child_items.map((grandChild) => {
                return (
                  <MenuLink key={grandChild.title} link={grandChild.url}>
                    {grandChild.title}
                  </MenuLink>
                );
              })}
            </SimpleGrid>
          </VStack>
        </GridItem>
        <GridItem colSpan={3} rowSpan={1}>
          <VStack spacing={10}>
            <Text fontSize="2xl" fontWeight="bold">
              {item.child_items[2].title}
            </Text>
            <SimpleGrid columns={5} spacing={6}>
              {item.child_items[2].child_items.map((grandChild) => {
                return (
                  <MenuLink key={grandChild.title} link={grandChild.url}>
                    {grandChild.title}
                  </MenuLink>
                );
              })}
            </SimpleGrid>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

const MegaMenu = ({ item }) => {
  // const li = useColorModeValue("rgb(8, 126, 164,1)", "whiteAlpha.800");

  if (item.title === "Know Us") {
    return <AboutMegaMenu item={item} />;
  } else if (item.title === "Our Work") {
    return <OurWorkMegaMenu item={item} />;
  }
};

const SiteMenuItem = ({ item, ...props }) => {
  const cl = useColorModeValue("gray.800", "white");
  const li = useColorModeValue("rgb(8, 126, 164,1)", "whiteAlpha.800");

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (item.child_items !== undefined) {
    return (
      <Box as="li" role="group" {...props}>
        <MenuLink textDecoration={"none"} link={item.url}>
          <Button
            variant="ghost"
            mx={1}
            py={[1, 2, 2]}
            px={4}
            borderRadius={5}
            color={li}
            _hover={{
              color: cl,
            }}
            aria-label={item.title}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            alignItems="center"
            fontSize="md"
            rightIcon={isOpen ? <HiChevronUp /> : <HiChevronDown />}
          >
            {item.title}
          </Button>
        </MenuLink>

        <Box
          pos="absolute"
          left={0}
          w="full"
          display="none"
          _groupHover={{
            display: "block",
          }}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          pt={"20px"}
        >
          <MegaMenu item={item} />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box as="li" role="group" {...props}>
        <MenuLink textDecoration={"none"} link={item.url}>
          <Button
            variant="ghost"
            mx={1}
            py={[1, 2, 2]}
            px={4}
            borderRadius={5}
            color={li}
            _hover={{
              color: cl,
            }}
            aria-label={item.title}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            alignItems="center"
            fontSize="md"
            _focus={{
              boxShadow: "none",
            }}
            display="inline-flex"
          >
            {item.title}
          </Button>
        </MenuLink>
      </Box>
    );
  }
};

const Navigation = ({ state, menu, ...props }) => {
  const menuItems = state.source.get("/menus/primary/").items;


  return (
    <Box
      as="nav"
      width="100%"
      display={{ base: "none", lg: "flex" }}
      {...props}
    >
      <SiteMenu ml="20px">
        {menuItems &&
          Object.entries(menuItems).map(([key, item]) => {
            return <SiteMenuItem key={key} item={item} />;
          })}
      </SiteMenu>
    </Box>
  );
};

export default connect(Navigation);
