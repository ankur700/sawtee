import {
  Box,
  Container,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { decode, styled } from "frontity";
import Section from "../../../styles/section";

const OurWork = ({ postData, post, libraries }) => {
  const sectors = post.acf.sectors;
  const intro = post.acf.intro;
  const themes = post.acf.thematic_areas;
  const Html2React = libraries.html2react.Component;
  const headingColor = useColorModeValue("gray.900, whiteAlpha.900");
  const contentColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const linkColor = useColorModeValue("blackAlpha.700", "whiteAlpha.600");
  const cardBackground = useColorModeValue("gray.100", "blackAlpha.300");
  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <>
      <Content
        as={Section}
        px={{ base: "32px", md: "16px" }}
        size="huge"
        paddingBlock="50px"
      >
        <Container
          className="intro"
          pos="relative"
          mb="16"
          maxW="7xl"
          p={{ base: 5, md: 10 }}
          centerContent
        >
          <Heading
            as={"h3"}
            fontSize="4xl"
            fontWeight="bold"
            mb={12}
            textAlign="center"
            color={headingColor}
          >
            Thematic Areas
          </Heading>

          <Box textAlign="center" mb={20}>
            <Html2React html={intro} fontSize={["lg", "2xl"]} />
          </Box>
          <SimpleGrid
            columns={{ base: 1, sm: 2 }}
            placeItems="center"
            spacing={10}
            mb={4}
          >
            {themes.map((theme) => (
              <VStack
                key={theme.title}
                bg={cardBackground}
                p={6}
                rounded="lg"
                textAlign="center"
                pos="relative"
                mt={6}
                justify={"center"}
                align={"center"}
                gap={4}
                minH={"250px"}
                transition={"all 0.8s ease-out"}
                role="group"
                cursor="pointer"
              >
                <Heading
                  as="h3"
                  fontWeight="semibold"
                  fontSize="2xl"
                  color={headingColor}
                >
                  {theme.title}
                </Heading>

                <Text
                  fontSize="md"
                  mt={4}
                  transition={"display 1s ease-in"}
                  transitionDelay={"0.4s"}
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                  _groupHover={{
                    display: "block",
                  }}
                  color={contentColor}
                >
                  {theme.content}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
        <Box
          display="flex"
          mx="auto"
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems={"center"}
          gap="10"
          maxW="5xl"
        >
          {sectors.map(({ title, content, bg_image, link }) => {
            return (
              <LinkBox
                href={link}
                pos="relative"
                h={{ base: "450px", lg: "550px" }}
                className="cards"
                width={{ base: "100%", lg: "48%" }}
                backgroundImage={`url(${bg_image})`}
                backgroundRepeat="no-repeat"
                bgColor={"rgba(0,0,0,0.3)"}
                backgroundBlendMode="overlay"
                border="3px solid"
                borderColor={linkColor}
                overflow="hidden"
                key={title}
                rounded="xl"
                display="flex"
                flexDir={"column"}
                style={{ backgroundSize: "cover", aspectRatio: "16/9" }}
                __hover={{
                  backgroundFilter: "blur(5px)",
                }}
              >
                <Heading
                  as="h4"
                  className="title"
                  textAlign={"center"}
                  py={{ base: 4, lg: 8 }}
                >
                  <LinkOverlay color={"whiteAlpha.700"} href={link}>
                    {decode(title)}
                  </LinkOverlay>
                </Heading>
                <Text
                  className="content"
                  flex={1}
                  height={"auto"}
                  display="flex"
                  alignItems={"center"}
                  fontSize={{ base: "lg", md: "lg", lg: "xl" }}
                  fontWeight="bold"
                  px={{ base: 4, lg: 10 }}
                  opacity="0"
                  textAlign={"center"}
                >
                  {decode(content)}
                </Text>
              </LinkBox>
            );
          })}
        </Box>
      </Content>
    </>
  );
};

export default OurWork;

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled(Box)`
  @media (min-width: 420px) {
    & .cards {
      & .title {
        color: white !important;
        z-index: 1;
      }

      & .content {
        z-index: 1;
      }
      &:hover {
        transition: all 0.4s ease-in-out;
        & .title {
          background: hsl(194, 100%, 25%, 0.4);
        }
        & .content {
          color: rgb(0, 0, 0);
          background: hsl(0, 17%, 95%, 0.4);
          opacity: 1;
        }
      }
    }
  }
`;
