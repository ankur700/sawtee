import { HStack, Divider, Box, Heading } from "@chakra-ui/react";

export const FancyTitle = ({ title }) => {
  return (
    <HStack position="relative" justify={"center"} padding="10" mb="6" gap="4">
      <Divider h="2px" w="40%" bg="gray.800" _dark={{ bg: "whiteAlpha.800" }} />
      <Box
        bg="blackAlpha.800"
        color="whiteAlpha.900"
        _dark={{ bg: "whiteAlpha.800", color: "gray.800" }}
        px="4"
        py="2"
        shadow="xl"
      >
        <Heading
          as="h3"
          fontSize={{ base: "md", md: "lg", lg: "2xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          {title}
        </Heading>
      </Box>

      <Divider h="2px" w="40%" bg="gray.800" _dark={{ bg: "whiteAlpha.800" }} />
    </HStack>
  );
};
