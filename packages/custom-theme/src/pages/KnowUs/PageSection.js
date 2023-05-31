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
} from "@chakra-ui/react";

const PageSection = ({ section, libraries }) => {
  const { content_repeater, title, content, tab_or_accordian } = section;
  const tabBorderColor = useColorModeValue("gray.200", "whiteAlpha.300");

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  return (
    <Box>
      <Text
        as="h3"
        fontSize={["lg", "xl", "2xl"]}
        fontFamily="heading"
        py={"4"}
        mb="4"
      >
        {title}
      </Text>

      {tab_or_accordian && title !== "Strategies" && (
        <Tabs variant="enclosed" size="md" isFitted colorScheme="ghost">
          <TabList borderBottom={"none"}>
            {content_repeater.map(({ tab_title }) => (
              <Tab key={tab_title}>
                <Text
                  fontSize={["md", "lg", "xl"]}
                  fontWeight="semibold"
                  fontFamily={"heading"}
                >
                  {tab_title}
                </Text>
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {content_repeater.map(({ tab_content }, index) => (
              <TabPanel
                px={["5", "10"]}
                key={index}
                border={"1px solid"}
                borderColor={tabBorderColor}
                display="flex"
                py={["2", "4"]}
                minH="250px"
                justifyContent="center"
                alignItems="center"
              >
                <Html2React html={tab_content} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
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
                  <Text as="h4" flex="1" textAlign="left">
                    {tab_title}
                  </Text>
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
