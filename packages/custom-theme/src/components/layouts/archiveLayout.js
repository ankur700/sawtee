import { LightPatternBox } from "../styles/pattern-box";
import Section from "../styles/section";
import {
  Box,
  Heading,
  Image,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

export const ArchiveLayout = ({
  children,
  showBackgroundPattern,
  image,
  category,
}) => {
  const size = useBreakpointValue(["sm", "md", "lg", "huge"]);
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );
  return (
    <LightPatternBox showPattern={showBackgroundPattern} pt="0">
      <Box pos="relative">
        <Box
          as="figure"
          height="350px"
          _after={{
            display: "block",
            content: '""',
            width: "100%",
            height: "350px",
            background: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Box as={Image} boxSize="100%" objectFit="cover" src={image} />
        </Box>

        <Box
          textAlign="center"
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"2xl"}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="capitalize"
          >
            {category === "post" ? "Blog" : category}
          </Heading>
        </Box>
      </Box>

      <Box
        as={Section}
        pb="80px"
        size={size || "huge"}
        px={{ base: "32px", md: "0" }}
        pt="50px"
        fontSize={["md", "lg", "xl"]}
        color={contentColor}
      >
        {children}
      </Box>
    </LightPatternBox>
  );
};
