import React, { useState } from "react";
import Iframe from "@frontity/components/iframe";
import {
  Box,
  Text,
  useColorModeValue,
  Heading,
  HStack,
  Divider,
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { HiChevronRight, HiChevronDown, HiArrowRight } from "react-icons/hi";
import { styled } from "frontity";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Script from "@frontity/components/script";

export const Wrapper = styled.ul`
  margin: 0;
  position: relative;

  & li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    padding: 2rem 4rem;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);

    ul {
      & li {
        background-color: transparent;
        cursor: initial;
        padding: 1rem;
        margin: 0;
      }
    }

    & .accordian-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & p {
        margin: 0;
      }
    }

    & .accordian-content {
      margin-top: 2rem;
    }
  }
`;

export const Content = styled(Box)`
  word-break: break-word;

  * {
    max-width: 100%;
  }

  & ul,
  li {
    font-size: inherit;
  }

  ul {
    padding: 1rem;
  }
  p {
    font-size: inherit;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
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

  & .wpcf7 form {
    padding: 24px;

    & p {
      padding-bottom: 1em;
    }

    & label {
      color: #121212;
    }
  }

  /*Contact form 7 Input fields styles */
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

  a {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;

    &:hover,
    &:focus {
      text-decoration: underline;
      color: var(--linkcolor);
    }
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
`;

export const GlassBox = ({ children, ...rest }) => {
  return (
    <Box
      w="100%"
      border={"1px solid"}
      borderColor={useColorModeValue("#ebebeb", "#333")}
      rounded="xl"
      {...rest}
      bg={"var(--color-bg)"}
    >
      {children}
    </Box>
  );
};

export const Accordian = ({ data }) => {
  const [accordianData, setAccordianData] = useState([...data]);

  const ChangeAccordianOpenState = (id, open) => {
    const newState = accordianData.map((obj) => {
      // 👇️ if id equals 2d, update open property
      if (obj.open === true) {
        return { ...obj, open: false };
      }
      if (obj.id === id) {
        return { ...obj, open: !open };
      }

      // 👇️ otherwise return object as is
      return obj;
    });

    setAccordianData(newState);
  };

  function createMarkup(content) {
    return { __html: `${content}` };
  }

  return (
    <Wrapper>
      {accordianData.map(({ name, content, id, open }) => {
        return (
          <li
            key={id}
            onClick={() => ChangeAccordianOpenState(id, open)}
            // style={open ? { position: "absolute", top: "1rem" } : null}
          >
            <div className="accordian-item">
              <p>{name}</p>
              {open ? (
                <HiChevronDown size={"3rem"} />
              ) : (
                <HiChevronRight size={"3rem"} />
              )}
            </div>
            {open ? (
              <div className="accordian-content">
                <p dangerouslySetInnerHTML={createMarkup(content)} />
              </div>
            ) : null}
          </li>
        );
      })}
    </Wrapper>
  );
};

export const FancyTitle = ({ title }) => {
  return (
    <HStack
      position="relative"
      justify={"space-evenly"}
      padding="10"
      mb="6"
      gap="4"
    >
      <Divider h="2px" bg="gray.800" _dark={{ bg: "whiteAlpha.800" }} />
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
          w="max-content"
        >
          {title}
        </Heading>
      </Box>

      <Divider h="2px" bg="gray.800" _dark={{ bg: "whiteAlpha.800" }} />
    </HStack>
  );
};



export const MapModel = ({ isOpen, onClose, mapLink }) => {
  const modalContentColor = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgba(0, 0, 0, 0.7)"
  );
  const modelHeaderColor = useColorModeValue("gray.700", "whiteAlpha.900");
  return (
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
            src={mapLink}
            title="SAWTEE's Location"
            height="450"
            width="700"
            loading="lazy"
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" colorScheme={"primary"}>
            <Link href="https://goo.gl/maps/fwZuwNSbjN5jwZia7" target="_blank">
              View Map
            </Link>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const Title = ({ text, color, ...rest }) => {
  return (
    <Text
      {...rest}
      as="h3"
      m="0"
      fontSize={{ base: "xl", md: "2xl" }}
      fontFamily="heading"
      color={color ? color : useColorModeValue("gray.800", "whiteAlpha.800")}
    >
      {text}
    </Text>
  );
};

export const TwitterTimeline = ({ height, width, handle }) => {
  const theme = useColorModeValue("light", "dark");

  const TwitterWrapper = styled(Box)`
    display: flex;
    justifycontent: center;
    alignitems: center;
    fontweight: bold;
    width: 100%;

    & div {
      width: 100%;
    }
  `;

  return (
    <TwitterWrapper id="twitter-wrapper" padding={6}>
      <Script async src="https://platform.twitter.com/widgets.js" />
      <TwitterTimelineEmbed
        sourceType="timeline"
        screenName={handle || "sawteenp"}
        theme={theme}
        tweetLimit={10}
        noBorders={true}
        noScrollbar={true}
        transparent={true}
        ariaPolite="assertive"
        placeholder="Track SAWTEE"
        options={{ height: height, width: `${width + "%"}` }}
      />
    </TwitterWrapper>
  );
};

export const ViewAllBtn = ({ text, ...rest }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      variant="solid"
      colorScheme={"primary"}
      aria-label="view all"
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      fontSize={{ base: "sm", md: "md" }}
      rightIcon={hovered ? <HiArrowRight /> : <HiChevronRight />}
      {...rest}
    >
      {text}
    </Button>
  );
};
