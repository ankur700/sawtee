import { useColorModeValue, Grid, GridItem } from "@chakra-ui/react";
import { connect, styled } from "frontity";

import Section from "../../styles/section";

import GlassBox from "../../atoms/glassBox";
import Sidebar from "../archive/sidebar";
import SubscriptionCard from "../../atoms/subscriptionCard";

const ProgramPost = ({ libraries, content }) => {
  const Html2React = libraries.html2react.Component;
  const contentColor = useColorModeValue(
    "rgba(12, 17, 43, 0.8)",
    "whiteAlpha.800"
  );

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5,1fr)" }}
      gap={6}
      placeItems={"center"}
      pt="50px"npx
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

export default connect(ProgramPost);

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled.div`
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
