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
    <Flex p={5} w="full" alignItems="center" justifyContent="center">
      <Flex
        shadow="lg"
        rounded="lg"
        bg={"accent.100"}
        _dark={{
          bg: "accent.600",
        }}
        direction="column"
        minH="180px"
        minW="130px"
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
            boxSize="75px"
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
            fontSize="md"
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
            fontWeight="bold"
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

const MegaMenu = ({ item, ...styles }) => {
  const li = useColorModeValue("rgb(8, 126, 164,1)", "whiteAlpha.800");

  return (
    <React.Fragment>
      <Grid
        templateColumns="repeat(6, 1fr)"
        bg={"rgb(8, 126, 164,0.9)"}
        pos="relative"
        gap={{
          base: 6,
          sm: 8,
        }}
        p={10}
        {...styles}
      >
        <GridItem colSpan={1}>
          <SiteMenu direction="column" alignItems={"start"}>
            {item.child_items.map((child) => {
              return (
                <Box
                  key={child.title}
                  as="li"
                  m="0"
                  color={"white"}
                  fontSize={"md" }
                  fontWeight="medium"
                  position="relative"
                  cursor="pointer"
                >
                  <MenuLink link={child.url}>{child.title}</MenuLink>
                </Box>
              );
            })}
          </SiteMenu>
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
            backgroundColor="rgba(0,0,0,0.6)"
            backgroundBlendMode="multiply"
            backgroundSize="cover"
            h={"100%"}
          >
            <Text
              fontSize={"lg"}
              color={"whiteAlpha.800"}
              m="0"
              alignSelf={"center"}
              zIndex={10}
              px={{ base: 4, md: 6 }}
              margin={"1rem auto"}
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
        <GridItem colSpan={2}>
          <Box w="full">
            <Text>Our Experts</Text>
            <Grid
              templateColumns={"repeat(3, 1fr)"}
              templateRows={"repeat(2, 200px)"}
            >
              {Experts.map((expert) => {
                return (
                  <GridItem key={expert.name}>
                    <ExpertCard expert={expert} />
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};

const SiteMenuItem = ({ item, ...props }) => {
  const bg = useColorModeValue("gray.100", "gray.700");
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
