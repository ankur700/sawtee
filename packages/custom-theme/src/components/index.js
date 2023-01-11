import React, { useEffect } from "react";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { connect, Global, Head } from "frontity";
import Switch from "@frontity/components/switch";
import SkipLink from "./styles/skip-link";
import Archive from "./organisms/archive";
import Footer from "./organisms/footer";
import Header from "./organisms/header";
import Loading from "./atoms/loading";
import Page404 from "./atoms/page404";
import SearchResults from "./molecules/search";
import PageTitle from "./atoms/pageTitle";
import FontFace from "./styles/font-face";
import HomeArchive from "../components/organisms/archive/home-archive";
import Home from "../pages/home";
import OurWork from "../pages/OurWork";
import KnowUs from "../pages/KnowUs";
import Page from "../components/organisms/page";
import globalStyles from "./styles/global-styles";
// import { Post } from "./organisms/page/post-item";
import Post from '../components/organisms/post/post'
import "focus-visible/dist/focus-visible";

// Theme is the root React component of our theme. The one we will export
// in roots.
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  const overrides = extendTheme({
    fonts: {
      heading: "Inter, system-ui, Helvetica, sans-serif",
      body: "Open Sans, sans-serif",
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
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* <script src="https://unpkg.com/aos@next/dist/aos.js"></script> */}
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
        minH="calc(100vh - 6.5rem)"
      >
        <Switch>
          <Loading when={data.isFetching} />
          <Home when={data.isHome} />
          <OurWork when={data.route === "/our-work/"} />
          <KnowUs when={data.route === "/about/"} />
          {/* <Programme when={data.route === "/programme/"} /> */}
          <Page when={data.isPage} />
          <Post
            when={
              data.isPostType || data.isPublications || data.isFeaturedEvents
            }
          />
          <SearchResults when={data.isSearch} />
          <HomeArchive when={data.route === "/blog"} />
          <Archive when={data.isArchive} />
          <Page404 when={data.is404} />
        </Switch>
      </Box>

      <Footer />
    </ChakraProvider>
  );
};

export default connect(Theme);
