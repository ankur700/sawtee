import React from "react";
import {
  Box,
  chakra,
  Container,
  Text,
  HStack,
  VStack,
  Flex,
  useColorModeValue,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";

import { FaRegNewspaper } from "react-icons/fa";
import { formatDateWithMoment } from "../../components/helpers";
import Link from "../../components/atoms/link";

const NewsletterList = ({ newsletters, linkColor }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Container maxW="7xl" w="full">
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
        Newsletters
      </chakra.h3>
      {newsletters.map((newsletter, idx) => (
        <Flex key={newsletter.id} mb="10px">
          {/* Desktop view(left card) */}
          {isDesktop && idx % 2 === 0 && (
            <>
              <EmptyCard />
              <LineWithDot />
              <Card {...newsletter} idx={idx} linkColor={linkColor} />
            </>
          )}

          {/* Mobile view */}
          {isMobile && (
            <>
              <LineWithDot />
              <Card {...newsletter} idx={idx} linkColor={linkColor} />
            </>
          )}

          {/* Desktop view(right card) */}
          {isDesktop && idx % 2 !== 0 && (
            <>
              <Card {...newsletter} idx={idx} linkColor={linkColor} />
              <LineWithDot />
              <EmptyCard />
            </>
          )}
        </Flex>
      ))}
    </Container>
  );
};

const Card = ({ title, categories, publishDate, link, idx, linkColor }) => {
  // For even id show card on left side
  // For odd id show card on right side
  const isEvenId = idx % 2 == 0;
  let borderWidthValue = isEvenId ? "15px 15px 15px 0" : "15px 0 15px 15px";
  let leftValue = isEvenId ? "-15px" : "unset";
  let rightValue = isEvenId ? "unset" : "-15px";

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    leftValue = "-15px";
    rightValue = "unset";
    borderWidthValue = "15px 15px 15px 0";
  }

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: "0",
        h: "0",
        borderColor: `transparent ${useColorModeValue(
          "#EDF2F7",
          "#1A202C"
        )} transparent`,
        borderStyle: "solid",
        borderWidth: borderWidthValue,
        position: "absolute",
        left: leftValue,
        right: rightValue,
        display: "block",
      }}
    >
      <Icon as={FaRegNewspaper} w={12} h={12} color={linkColor} />
      <Box>
        <HStack spacing={2} mb={1}>
          {categories.map((cat) => (
            <Text fontSize="sm" key={cat.id}>
              {cat.name}
            </Text>
          ))}
        </HStack>
        <VStack spacing={2} mb={3} textAlign="left">
          <chakra.h1
            color={useColorModeValue("gray.700", "whiteAlpha.700")}
            _hover={{ color: linkColor }}
            fontSize="2xl"
            lineHeight={1.2}
            fontWeight="bold"
            w="100%"
          >
            <Link link={link}>{title}</Link>
          </chakra.h1>
        </VStack>
        <Text fontSize="sm">{formatDateWithMoment(publishDate)}</Text>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: "40px", md: "40px" }}
      ml={{ base: "0", md: "40px" }}
    >
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.600", "gray.200")}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bg={useColorModeValue("gray.600", "gray.200")}
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

const EmptyCard = () => {
  return (
    <Box
      flex={{ base: 0, md: 1 }}
      p={{ base: 0, md: 6 }}
      bg="transparent"
    ></Box>
  );
};

export default NewsletterList;
