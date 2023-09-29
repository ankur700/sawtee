import { useState, useEffect } from "react";
import {
  Box,
  useColorModeValue,
  Heading,
  SlideFade,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Content } from "../atoms";
import Section from "../styles/section";
import Link from "../atoms/link";

const KnowUs = ({ post, Html2React, linkColor }) => {
  const sections = post?.acf.sections || null;
  const memberInstitutions = post?.acf.memberInstitutions || null;

  return (
    <Content
      className="page_content"
      as={Section}
      px={{ base: "32px", md: "0" }}
      py={32}
      size="md"
      fontSize={{ base: "md", lg: "lg" }}
    >
      {sections !== null &&
        sections.map((section) => (
          <PageSection
            key={section.title}
            Html2React={Html2React}
            section={section}
          />
        ))}
      {memberInstitutions !== null && (
        <Members
          memberInstitutions={memberInstitutions}
          linkColor={linkColor}
        />
      )}
    </Content>
  );
};

export default KnowUs;

export const Members = ({ memberInstitutions, linkColor }) => {
  const [hovered, setHovered] = useState([]);
  const headingColor = useColorModeValue("gray.900, whiteAlpha.900");
  const contentColor = useColorModeValue("gray.800", "whiteAlpha.800");
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
        color={headingColor}
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
              color={headingColor}
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
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  color={contentColor}
                >
                  <Link
                    link={member_website_link}
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
                      textUnderlineOffset: "6px",
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
                      <HiOutlineExternalLink color={linkColor} />
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

export const PageSection = ({ section, Html2React }) => {
  const { content_repeater, title, content, tab_or_accordian } = section;
  const headingColor = useColorModeValue("gray.900, whiteAlpha.900");
  const contentColor = useColorModeValue("gray.800", "whiteAlpha.800");
  const tabColor = useColorModeValue("blackAlpha", "whiteAlpha");
  const accordianExpandedBackground = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(0,0,0,0.3)"
  );
  // Get the html2react component.

  return (
    <Box>
      <Heading
        as="h3"
        fontSize={["lg", "xl", "2xl"]}
        py={"4"}
        mb="4"
        fontFamily="heading"
        color={headingColor}
      >
        {title}
      </Heading>

      {tab_or_accordian && title !== "Strategies" && (
        <Box px="6" py="4">
          <Tabs
            orientation={["vertical", "vertical", "horizontal"]}
            variant="enclosed"
            isFitted
            colorScheme={"blue"}
          >
            <TabList>
              {content_repeater.map(({ tab_title }) => (
                <Tab
                  key={tab_title}
                  fontSize={["md", "lg"]}
                  fontWeight={"semibold"}
                  fontFamily={"heading"}
                  _selected={{
                    borderColor: "blue.500",
                    borderBottomColor: "transparent",
                  }}
                >
                  {tab_title}
                </Tab>
              ))}
            </TabList>
            <TabPanels border="1px solid" borderColor="blue.500">
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
                  color={contentColor}
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
                  _expanded={{ bg: accordianExpandedBackground }}
                >
                  <Heading
                    as="h4"
                    flex="1"
                    fontSize={["md", "lg"]}
                    fontFamily={"heading"}
                    textAlign="left"
                    color={headingColor}
                  >
                    {tab_title}
                  </Heading>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={["5", "10"]} color={contentColor}>
                  <Html2React html={tab_content} />
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}

      {!tab_or_accordian && (
        <Box color={contentColor}>
          <Html2React html={content} />
        </Box>
      )}
      <Divider my="60px" />
    </Box>
  );
};
