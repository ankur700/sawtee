import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  IconButton,
  Button,
  HStack,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { connect } from "frontity";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import {
  FaFax,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { formatPostData } from "../../../helpers";
import Section from "../../../styles/section";
import { Content } from "../../../atoms/content";
import { MapModel } from "../../../atoms/mapModel";

const Contact = ({ state, data, libraries }) => {
  const post = formatPostData(state, data);
  const CONTACT_FORM = post.acf.cf7_form;
  const Html2React = libraries.html2react.Component;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const socialMenus = state.theme.socialLinks;

  return (
    <Content
      className="page_content"
      as={Section}
      px={{ base: "16px", lg: "32px" }}
      size={"lg"}
      mx="auto"
      my="50px"
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
        <MapModel
          isOpen={isOpen}
          onOpen={onOpen}
          mapLink={post.acf.map_link}
        />
      </Box>
    </Content>
  );
};

export default connect(Contact);

