import React from "react";
import { styled } from "frontity";
import { HiMailOpen, HiOutlinePaperAirplane } from "react-icons/hi";
import {
  Text,
  Box,
  Heading,
  Button,
  Input,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const SubscriptionCard = () => {
  return (
    <SubscriptionBox
      display="flex"
      flexDir={"column"}
      w="full"
      gap="4"
      pos={"relative"}
      rounded="xl"
      textAlign="center"
      p={["4", "8"]}
    >
      <Box display={"flex"} justifyContent="center">
        <HiMailOpen size={"90px"} />
      </Box>
      <Heading
        as="h4"
        fontSize={["4xl", "2xl"]}
        textTransform="uppercase"
        color={useColorModeValue("gray.800", "whiteAlpha.800")}
      >
        Don't miss out on our future issues!
      </Heading>
      <Text fontSize={"md"}>
        Would you be interested in receiving our newsletter directly in your
        inbox ?
      </Text>
      <Text
        as="span"
        fontSize={"sm"}
        fontStyle="italic"
        fontWeight={"semibold"}
        // letterSpacing={"0.1em"}
      >
        * By subscribing you agree to receiving emails from SAWTEE.
      </Text>
      <InputGroup size="md">
        <Input type="text" variant={"outline"} placeholder="Email Address" />
        <InputRightElement width="4.5rem">
          <Button type="button" size="md" height={"2rem"} variant="ghost">
            <HiOutlinePaperAirplane className="plane-icon" />
          </Button>
        </InputRightElement>
      </InputGroup>
    </SubscriptionBox>
  );
};

export default SubscriptionCard;

const SubscriptionBox = styled(Box)`
  & .plane-icon {
    transform: rotate(90deg);
  }
`;
