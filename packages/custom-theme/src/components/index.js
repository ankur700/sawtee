import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { connect, Global, Head } from "frontity";
import Switch from "@frontity/components/switch";
import React from "react";
import Archive from "./archive";
import Footer from "./footer";
import Header from "./header";
import Loading from "./loading";
import Page404 from "./page404";
import Post from "./post/post";
import SearchResults from "./search";
import Title from "./title";
import FontFace from "./styles/font-face";
import Home from "../pages/home/home";
import Publication from "../pages/publication/publication";
import OurWork from "../pages//OurWork/OurWork";
import KnowUs from "../pages/KnowUs/KnowUs";
import Events from "../pages/events/events";
import Page from "../components/page";

// Theme is the root React component of our theme. The one we will export
// in roots.
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  const overrides = extendTheme({
    fonts: {
      heading: "Kelson, system-ui, Helvetica, sans-serif",
    },
    colors: { ...state.theme.colors },
  });

  const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
  };

  return (
    <ChakraProvider theme={{ config, ...overrides }}>
      <FontFace />
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700;1,900&family=Poppins:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </Head>

      {/* Add the header of the site. */}
      <Header />

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Box
        as="main"
        mt={{ base: "40px", md: "70px" }}
        minH="calc(100vh - 320px)"
      >
        <Switch>
          <Loading when={data.isFetching} />
          <SearchResults when={data.isSearch} />
          <Archive when={data.isArchive} />
          {/* <Post when={data.isPostType} /> */}
          <Page404 when={data.is404} />

          <Home when={data.isHome} />
          <Publication when={data.route === "/publications/"} />
          <OurWork when={data.route === "/our-work/"} />
          <KnowUs when={data.route === "/about/"} />
          <Events when={data.route === "/events/"} />
          <Page when={data.isPage} />
        </Switch>
      </Box>

      <Footer />
    </ChakraProvider>
  );
};

export default connect(Theme);
