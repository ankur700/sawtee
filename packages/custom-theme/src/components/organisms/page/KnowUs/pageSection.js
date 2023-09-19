
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
} from "@chakra-ui/react";


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
