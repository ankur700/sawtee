import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  useColorModeValue,
  IconButton,
  Button,
  HStack,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { connect, styled } from "frontity";
import React from "react";
import GlassBox from "../../../atoms/glassBox";
import Iframe from "@frontity/components/iframe";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import {
  FaFax,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { formatPostData } from "../../../helpers";

const Contact = ({ state, data, libraries }) => {
  const post = formatPostData(state, data);
  const CONTACT_FORM = post.acf.cf7_form;
  const Html2React = libraries.html2react.Component;
  const modalContentColor = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgba(0, 0, 0, 0.7)"
  );
  const modelHeaderColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socialMenus = state.theme.socialLinks;

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <Content
      as={GlassBox}
      px={{ base: "16px", lg: "32px" }}
      maxW={"6xl"}
      mx="auto"
      mt="50px"
      bg="transparent"
      boxShadow="none"
    >
      <Box
        p={{ sm: 5, md: 5, lg: 10 }}
        bg={"hsla(238, 95%, 15%, 100%)"}
        borderRadius="xl"
        color="white"
        boxShadow="lg"
      >
        <Box p={4}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}
          >
            <Box textAlign={{ base: "center", lg: "left" }}>
              <Heading
                as="h4"
                fontSize={{ base: "xl", md: "2xl" }}
                color={"whiteAlpha.900"}
                textTransform={"uppercase"}
                pb="0.75rem"
              >
                Contact
              </Heading>
              <Text
                color="gray.300"
                fontSize={{ base: "md", md: "lg" }}
                pb="0.5em"
              >
                {post.acf.opening_hours}
              </Text>
              <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                <VStack
                  pl={0}
                  spacing={3}
                  alignItems={{ base: "center", lg: "flex-start" }}
                >
                  {post.acf.phone_numbers.map(({ number }) => {
                    return (
                      <Button
                        key={number}
                        size="md"
                        height="48px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                      >
                        <Link as="a" href={`tel:${number}`}>
                          {number}
                        </Link>
                      </Button>
                    );
                  })}
                  <Button
                    size="md"
                    height="48px"
                    variant="ghost"
                    color="#DCE2FF"
                    _hover={{ border: "2px solid #1C6FEB" }}
                    leftIcon={<FaFax color="#1970F1" size="20px" />}
                  >
                    <Link href={`fax:${post.acf.fax}`}>{post.acf.fax}</Link>
                  </Button>
                  <Button
                    size="md"
                    height="48px"
                    variant="ghost"
                    color="#DCE2FF"
                    _hover={{ border: "2px solid #1C6FEB" }}
                    leftIcon={<MdEmail color="#1970F1" size="20px" />}
                  >
                    <Link href={`mailto:${post.acf.email}`}>
                      {post.acf.email}
                    </Link>
                  </Button>
                  <Button
                    size="md"
                    height="48px"
                    variant="ghost"
                    color="#DCE2FF"
                    _hover={{ border: "2px solid #1C6FEB" }}
                    leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                    onClick={onOpen}
                  >
                    {post.acf.address}
                  </Button>
                </VStack>
              </Box>
              <HStack
                mt={{ lg: 10, md: 10 }}
                spacing={5}
                px={5}
                justifyContent={{ base: "center", lg: "flex-start" }}
              >
                {socialMenus.map(([name, link]) => {
                  if (name === "facebook") {
                    return (
                      <Link href={link} key={name} title={name.toUpperCase()}>
                        <IconButton
                          aria-label={name}
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: `${name}.600` }}
                          icon={<FaFacebook size="28px" />}
                        />
                      </Link>
                    );
                  } else if (name === "twitter") {
                    return (
                      <Link href={link} key={name} title={name.toUpperCase()}>
                        <IconButton
                          aria-label={name}
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: `${name}.600` }}
                          icon={<FaTwitter size="28px" />}
                        />
                      </Link>
                    );
                  } else if (name === "linkedin") {
                    return (
                      <Link href={link} key={name} title={name.toUpperCase()}>
                        <IconButton
                          aria-label={name}
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: `${name}.600` }}
                          icon={<FaLinkedin size="28px" />}
                        />
                      </Link>
                    );
                  } else {
                    return (
                      <Link href={link} key={name} title={name.toUpperCase()}>
                        <IconButton
                          aria-label={name}
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: `red.600` }}
                          icon={<FaYoutube size="28px" />}
                        />
                      </Link>
                    );
                  }
                })}
              </HStack>
            </Box>
            <Box
              bg="white"
              borderRadius="lg"
              className="contact_form"
              m={8}
              color="#0B0E3F"
            >
              {CONTACT_FORM && <Html2React html={CONTACT_FORM} />}
            </Box>
          </SimpleGrid>
        </Box>

        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          closeOnOverlayClick={true}
          blockScrollOnMount={false}
        >
          <ModalOverlay />
          <ModalContent bg={modalContentColor} maxW={"3xl"}>
            <ModalHeader color={modelHeaderColor}>Our Location</ModalHeader>
            <ModalCloseButton />
            <ModalBody margin={"0 auto"}>
              <Iframe
                src={post.acf.map_link}
                title="SAWTEE's Location"
                height="450"
                width="700"
                loading="lazy"
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="solid" colorScheme={"primary"}>
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
      </Box>
    </Content>
  );
};

export default connect(Contact);

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled(Box)`
  word-break: break-word;

  * {
    max-width: 100%;
  }

  ul {
    padding: 1rem;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  & .wpcf7 form {
    padding: 24px;

    & p {
      padding-bottom: 1em;
    }

    & label {
      color: #121212;
    }
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;
  }

  iframe {
    display: block;
    margin: auto;
  }

  /* Input fields styles */

  & .wpcf7 input[type="text"],
  & .wpcf7 input[type="email"],
  & .wpcf7 input[type="url"],
  & .wpcf7 input[type="tel"],
  & .wpcf7 input[type="number"],
  & .wpcf7 input[type="date"],
  & .wpcf7 textarea,
  & .wpcf7 select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  & .wpcf7 input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
  a {
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
      text-decoration-style: dotted;

      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
    }
  }
`;
