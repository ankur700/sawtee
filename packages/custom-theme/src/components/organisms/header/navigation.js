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
import link from "../../atoms/link";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import MapImage from "../../../assets/Airports_Network_Map.png";
import { motion } from "framer-motion";

const MenuLink = styled(link)`
  position: relative;
  text-decoration: none;
  font-family: var(--chakra-fonts-heading);
`;

const FancyLink = styled(link)`
  position: relative;
  text-decoration: none;
  font-family: var(--chakra-fonts-heading);

  &::after {
    content: "";
    width: 0%;
    height: 2px;
    position: absolute;
    bottom: -5px;
    left: 0;
    background: #fff;
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

const MegaMenuWrapperVariants = {
  open: {
    opacity: 1,
    // y: 0
  },
  closed: {
    opacity: 0,
    // y: "-100%"
  },
};

const ListVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const ListContainerVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const MenuItem = ({ children, ...rest }) => {
  const li = useColorModeValue("gray.800", "whiteAlpha.800");
  return (
    <Button
      as={motion.button}
      variant="ghost"
      mx={1}
      py={[1, 2, 2]}
      px={4}
      borderRadius={5}
      color={li}
      _hover={{
        color: "white",
      }}
      _focus={{
        boxShadow: "none",
      }}
      alignItems="center"
      fontSize="md"
      _groupHover={{ backgroundColor: "#006181", color: "#fff" }}
      transition="background 0.2s linear"
      {...rest}
    >
      {children}
    </Button>
  );
};

const ExpertCard = ({ expert }) => {
  return (
    <Flex p={3} w="full" alignItems="center" justifyContent="center">
      <Flex
        shadow="lg"
        rounded="lg"
        bg={"whiteAlpha.500"}
        _dark={{
          bg: "blackAlpha.500",
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

const AboutMegaMenu = ({ item, experts, isOpen, ...rest }) => {
  return (
    <Box
      bg={"rgb(8, 126, 164,0.9)"}
      backdropFilter="blur(5px) saturate(180%)"
      px={8}
      py={10}
      h="100vh"
    >
      <Grid
        templateColumns="repeat(6, 1fr)"
        pos="relative"
        gap={6}
        px={6}
        m="0 auto"
        placeItems="center"
        {...rest}
      >
        <GridItem colSpan={1} placeSelf="center">
          <Box
            as={motion.ul}
            variants={ListContainerVariants}
            animate={isOpen ? "open" : "closed"}
            display="flex"
            flexDirection="column"
            alignItems={"start"}
            gap={8}
          >
            {item.child_items.map((child) => {
              return (
                <Box
                  key={child.title}
                  as={motion.li}
                  variants={ListVariants}
                  m="0"
                  color={"white"}
                  fontSize={"md"}
                  fontWeight="medium"
                  position="relative"
                  cursor="pointer"
                >
                  <FancyLink link={child.url}>{child.title}</FancyLink>
                </Box>
              );
            })}
          </Box>
        </GridItem>
        <GridItem colSpan={3} width="full" placeSelf="center">
          <Box
            position="relative"
            width="100%"
            minH="450px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            rounded="xl"
            backgroundImage={`url(${MapImage})`}
            backgroundColor="rgba(0,0,0,0.6)"
            backgroundBlendMode="blend"
            backgroundSize="cover"
            px={6}
          >
            <Text
              fontSize={"lg"}
              color={"white"}
              m="0"
              alignSelf={"center"}
              zIndex={10}
              px={6}
              lineHeight="taller"
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
          gap={4}
        >
          <Text fontSize="xl" fontWeight={"semibold"}>
            Our Experts
          </Text>
          <Grid
            templateColumns={"repeat(3, 1fr)"}
            templateRows={"repeat(2, auto)"}
            rowGap={2}
            placeItems="center"
          >
            {experts.map((expert) => {
              return (
                <GridItem key={expert.name} display="flex" w="full">
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

const OurWorkMegaMenu = ({ item, isOpen, ...rest }) => {
  return (
    <Box
      bg={"rgb(8, 126, 164,0.9)"}
      pos="relative"
      gap="16"
      p={10}
      display="flex"
      backdropFilter="blur(5px) saturate(150%)"
      flexDirection={"column"}
      {...rest}
    >
      <VStack spacing={10} maxW="90%" m="0 auto">
        <Text fontSize="2xl" fontWeight="bold">
          {item.child_items[0].title}
        </Text>
        <SimpleGrid
          as={motion.ul}
          columns={3}
          spacing={6}
          placeItems="center"
          variants={ListContainerVariants}
          animate={isOpen ? "open" : "closed"}
        >
          {item.child_items[0].child_items.map((grandChild) => {
            return (
              <Text
                key={grandChild.title}
                noOfLines={1}
                as={motion.li}
                variants={ListVariants}
              >
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
            <SimpleGrid
              columns={2}
              spacing={6}
              as={motion.ul}
              variants={ListContainerVariants}
              animate={isOpen ? "open" : "closed"}
            >
              {item.child_items[1].child_items.map((grandChild) => {
                return (
                  <Text
                    key={grandChild.title}
                    noOfLines={1}
                    as={motion.li}
                    variants={ListVariants}
                  >
                    <MenuLink link={grandChild.url} textAlign="center">
                      {grandChild.title}
                    </MenuLink>
                  </Text>
                );
              })}
            </SimpleGrid>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={3}
          rowSpan={1}
          as={motion.ul}
          variants={ListContainerVariants}
          animate={isOpen ? "open" : "closed"}
        >
          <VStack spacing={10}>
            <Text fontSize="2xl" fontWeight="bold">
              {item.child_items[2].title}
            </Text>
            <SimpleGrid columns={5} spacing={6}>
              {item.child_items[2].child_items.map((grandChild) => {
                return (
                  <Text
                    key={grandChild.title}
                    noOfLines={1}
                    as={motion.li}
                    variants={ListVariants}
                  >
                    <MenuLink link={grandChild.url} textAlign="center">
                      {grandChild.title}
                    </MenuLink>
                  </Text>
                );
              })}
            </SimpleGrid>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

const MegaMenu = ({ item, experts, isOpen }) => {
  // const li = useColorModeValue("rgb(8, 126, 164,1)", "whiteAlpha.800");

  if (item.title === "Know Us") {
    return <AboutMegaMenu item={item} experts={experts} isOpen={isOpen} />;
  } else if (item.title === "Our Work") {
    return <OurWorkMegaMenu item={item} isOpen={isOpen} />;
  }
};

const SiteMenuItem = ({ item, experts, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (item.child_items !== undefined) {
    return (
      <Box as="li" role="group" {...props}>
        <MenuItem
          aria-label={item.title}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}

          rightIcon={isOpen ? <HiChevronUp /> : <HiChevronDown />}
        >
          <MenuLink textDecoration={"none"} link={item.url}>
            {item.title}
          </MenuLink>
        </MenuItem>

        <Box
          as={motion.div}
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
          animate={isOpen ? "open" : "closed"}
          variants={MegaMenuWrapperVariants}
          transition={{
            durations: 0.6,
          }}
        >
          <MegaMenu item={item} experts={experts} isOpen={isOpen} />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box as="li" role="group" {...props}>
        <MenuItem
          aria-label={item.title}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          display="inline-flex"
        >
          <MenuLink link={item.url}>{item.title}</MenuLink>
        </MenuItem>
      </Box>
    );
  }
};

const Navigation = ({ state, menu, ...props }) => {
  const data = state.source.get("/menu/primary/");

  return (
    <Box
      as="nav"
      width="100%"
      display={{ base: "none", lg: "flex" }}
      zIndex={"999"}
      {...props}
    >
      <SiteMenu ml="20px">
        {data.isReady &&
          Object.entries(data.items).map(([key, item]) => {
            return (
              <SiteMenuItem key={key} item={item} experts={data.experts} />
            );
          })}
      </SiteMenu>
    </Box>
  );
};

export default connect(Navigation);
