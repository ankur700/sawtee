import {
  Box,
  Divider,
  Text,
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
          <Tabs variant="enclosed" size="md" isFitted colorScheme={tabColor}>
            <TabList>
              {content_repeater.map(({ tab_title }) => (
                <Tab
                  key={tab_title}
                  transition="all 0.4s ease-in"
                >
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

export default PageSection;
