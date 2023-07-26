import {
  Box,
  Divider,
  useColorModeValue,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  SlideFade,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { styled } from "frontity";
import Section from "../../../styles/section";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "../../../atoms/link";
import GlassBox from "../../../atoms/glassBox";
const KnowUs = ({ post, postData, linkColor, libraries }) => {
  const sections = post.acf.sections;
  const memberInstitutions = post.acf.memberInstitutions;
  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <Section className="content" paddingBlock={10} size={"lg"}>
      <GlassBox border="none">
        <Content
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="md"
          paddingBlock="50px"
          fontSize={"1.0625rem"}
        >
          {sections.map((section) => (
            <PageSection
              key={section.title}
              libraries={libraries}
              section={section}
            />
          ))}
          <Members
            memberInstitutions={memberInstitutions}
            linkColor={linkColor}
          />
        </Content>
      </GlassBox>
    </Section>
  );
};

export default KnowUs;

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled(Box)`
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

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
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

  input[type="submit"] {
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
`;

const Members = ({ memberInstitutions, linkColor }) => {
  const [hovered, setHovered] = useState([]);

  useEffect(() => {
    memberInstitutions.map(({ country, institutes }) => {
      let array = institutes.map((_) => false);
      setHovered((prev) => [...prev, { [`${country}`]: [...array] }]);
    });
  }, [memberInstitutions]);

  return (
    <Box>
      <Heading
        as="h3"
        fontSize={["lg", "xl", "2xl"]}
        py={"4"}
        mb="4"
        fontFamily="heading"
      >
        {"Member Institutions"}
      </Heading>
      {memberInstitutions?.map(({ country, institutes }, id) => {
        let array = [...hovered];

        return (
          <Box key={country} mb="6">
            <Heading
              as="h4"
              fontSize={["md", "lg", "xl"]}
              fontWeight="bold"
              mb="4"
              fontFamily="heading"
            >
              {country}
            </Heading>
            {institutes.map(({ member_name, member_website_link }, idx) => {
              return (
                <Box
                  key={member_name}
                  display="flex"
                  alignItems={"center"}
                  gap={4}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <Link
                    link={member_website_link}
                    // target={"_blank"}
                    onMouseEnter={() => {
                      array[id][country][idx] = true;
                      setHovered([...array]);
                    }}
                    onMouseLeave={() => {
                      array[id][country][idx] = false;
                      setHovered([...array]);
                    }}
                    _hover={{
                      color: linkColor,
                      textDecoration: "underline",
                      textDecorationColor: linkColor,
                      textUnderlineOffset: "3px",
                    }}
                    textDecoration="underline"
                    textUnderlineOffset="3px"
                    textDecorationColor="gray.500"
                  >
                    {member_name}
                  </Link>
                  {hovered.length > 0 && hovered[id][country][idx] && (
                    <SlideFade
                      direction="bottom"
                      in={hovered[id][country][idx]}
                      offsetY="20px"
                    >
                      <HiOutlineExternalLink />
                    </SlideFade>
                  )}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

const PageSection = ({ section, libraries }) => {
  const { content_repeater, title, content, tab_or_accordian } = section;
  const tabColor = useColorModeValue("blackAlpha", "whiteAlpha");

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  return (
    <Box>
      <Heading
        as="h3"
        fontSize={["lg", "xl", "2xl"]}
        py={"4"}
        mb="4"
        fontFamily="heading"
      >
        {title}
      </Heading>

      {tab_or_accordian && title !== "Strategies" && (
        <Box rounded="xl" p={6} border="1px solid">
          <Tabs
            variant="enclosed"
            size="md"
            isFitted
            colorScheme={"primary"}
            appearance="none"
            outline="none"
            _focus={{ outline: "none", boxShadow: "none" }}
          >
            <TabList>
              {content_repeater.map(({ tab_title }) => (
                <Tab key={tab_title} transition="all 0.4s ease-in">
                  <Heading as="h4" fontSize={"lg"} fontFamily={"heading"}>
                    {tab_title}
                  </Heading>
                </Tab>
              ))}
            </TabList>
            <TabPanels mt={4}>
              {content_repeater.map(({ tab_content, tab_title }) => (
                <TabPanel
                  bg={tabColor}
                  px={["5", "10"]}
                  key={tab_title}
                  display="flex"
                  py={["2", "4"]}
                  justifyContent="center"
                  alignItems="center"
                  transition="all 0.4s ease-in"
                >
                  <Html2React html={tab_content} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      )}

      {tab_or_accordian && title === "Strategies" && (
        <Accordion allowToggle>
          {content_repeater.map(({ tab_title, tab_content }) => {
            return (
              <AccordionItem key={tab_title} border="none">
                <AccordionButton
                  size="md"
                  py="4"
                  _expanded={{
                    bg: useColorModeValue(
                      "rgba(0, 0, 0, 0.1)",
                      "rgba(0,0,0,0.3)"
                    ),
                  }}
                >
                  <Heading
                    as="h4"
                    flex="1"
                    fontSize={"lg"}
                    fontFamily={"heading"}
                    textAlign="left"
                  >
                    {tab_title}
                  </Heading>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={["5", "10"]}>
                  <Html2React html={tab_content} />
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}

      {!tab_or_accordian && (
        <Box>
          <Html2React html={content} />
        </Box>
      )}
      <Divider my="60px" />
    </Box>
  );
};
