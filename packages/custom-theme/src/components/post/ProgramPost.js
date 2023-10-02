import { useColorModeValue, Grid, GridItem } from "@chakra-ui/react";
import Section from "../styles/section";
import { Content, GlassBox } from "../atoms";
import Sidebar from "../archive/sidebar";
import SubscriptionCard from "../atoms/subscriptionCard";

const ProgramPost = ({ Html2React, content }) => {
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );
  console.log("You are viewing a programme post!");

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5,1fr)" }}
      gap={6}
      placeItems={"center"}
      pt="50px"
      npx
    >
      <GridItem
        colSpan={{ base: 1, lg: 3 }}
        placeSelf={"center"}
        display={"flex"}
      >
        <Content
          as={Section}
          className="content"
          px={{ base: "20px", md: "0" }}
          size="sm"
          // w="full"
          color={contentColor}
        >
          <Html2React html={content} />
        </Content>
      </GridItem>

      <GridItem
        display="flex"
        flexDir="column"
        colSpan={{ base: 1, lg: 2 }}
        gap={16}
        minW="md"
        w="full"
        maxW={"full"}
        alignItems="center"
        p="6"
      >
        <Sidebar>
          <GlassBox
            py="4"
            px="8"
            rounded="2xl"
            height="max-content"
            position={"sticky"}
            top={"8.5rem"}
            boxShadow={"0 8px 20px 0 rgba(0, 0, 0, 0.17)"}
          >
            <SubscriptionCard />
          </GlassBox>
        </Sidebar>
      </GridItem>
    </Grid>
  );
};

export default ProgramPost;
