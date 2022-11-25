import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { connect, Global, Head } from "frontity";
import Switch from "@frontity/components/switch";
import React from "react";
import SkipLink from "./styles/skip-link";
import Archive from "./organisms/archive";
import Footer from "./organisms/footer";
import Header from "./organisms/header";
import Loading from "./atoms/loading";
import Page404 from "./atoms/page404";
import SearchResults from "./molecules/search";
import PageTitle from "./atoms/pageTitle";
import FontFace from "./styles/font-face";
import Home from "../pages/home";
import Publication from "../pages/publication";
import OurWork from "../pages/OurWork";
import KnowUs from "../pages/KnowUs";
import Events from "../pages/events";
import Page from "../components/organisms/page";
import globalStyles from "./styles/global-styles";
import { Post } from "./organisms/page/post-item";
import "focus-visible/dist/focus-visible";

// Theme is the root React component of our theme. The one we will export
// in roots.
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  const { bodyBg } = state.theme.colors;
  const overrides = extendTheme({
    fonts: {
      heading: "Kelson, system-ui, Helvetica, sans-serif",
      body: "Inter, serif",
      roboto: "Roboto, sans-serif",
      poppins: "Poppins, sans-serif",
      openSans: "Open Sans, sans-serif",
    },
    colors: { ...state.theme.colors },
  });

  const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
  };

  return (
    <ChakraProvider resetCSS theme={{ config, ...overrides }}>
      <Global styles={globalStyles(state.theme.colors)} />
      <FontFace />
      {/* Add some metatags to the <head> of the HTML. */}
      <PageTitle />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;600;700;800&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </Head>
      {/* Accessibility: Provides ability to skip to main content */}
      <SkipLink as="a" href="#main">
        Skip to main content
      </SkipLink>
      {/* Add the header of the site. */}
      <Header />
      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Box
        as="main"
        mt={{ base: "5.5rem", md: "6.5rem" }}
        minH="calc(100vh - 320px)"
      >
        <Switch>
          <Loading when={data.isFetching} />
          <SearchResults when={data.isSearch} />
          <Archive when={data.isArchive} />
          <Page404 when={data.is404} />

          <Home when={data.isHome} />
          <Publication when={data.route === "/publications/"} />
          <OurWork when={data.route === "/our-work/"} />
          <KnowUs when={data.route === "/about/"} />
          <Events when={data.route === "/events/"} />
          <Page when={data.isPage} />
          <Post when={data.isPostType} />
        </Switch>
      </Box>
      <Footer />
    </ChakraProvider>
  );
};

export default connect(Theme);
