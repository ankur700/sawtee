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
  const { contentRepeater, title, content, hasTabOrHasAccordian } = section;
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
      {hasTabOrHasAccordian ? (
        title !== "Strategies" ? (
          <Tabs variant="enclosed" size="md" isFitted colorScheme="ghost">
            <TabList borderBottom={"none"}>
              {contentRepeater.map(({ tabTitle }) => (
                <Tab key={tabTitle}>
                  <Text
                    fontSize={["md", "lg", "xl"]}
                    fontWeight="semibold"
                    fontFamily={"heading"}
                  >
                    {tabTitle}
                  </Text>
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {contentRepeater.map(({ tabContent }, index) => (
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
                  <Html2React html={tabContent} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        ) : (
          <Accordion allowToggle>
            {contentRepeater.map(({ tabTitle, tabContent }) => {
              return (
                <AccordionItem key={tabTitle} border="none">
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
                    <Text
                      as="h4"
                      fontSize={["md", "lg", "xl"]}
                      flex="1"
                      textAlign="left"
                    >
                      {tabTitle}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel fontSize="inherit" px={["5", "10"]}>
                    <Html2React html={tabContent} />
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        )
      ) : (
        <Box>
          <Html2React html={content} />
        </Box>
      )}
      <Divider my="60px" />
    </Box>
  );
};

export default PageSection;
