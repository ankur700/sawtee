import {
  Box,
  ChakraProvider,
  ScaleFade,
  extendTheme,
  Link,
} from "@chakra-ui/react";
import Switch from "@frontity/components/switch";
import "focus-visible/dist/focus-visible";
import { Global, Head, connect } from "frontity";
import { useEffect } from "react";
import Post from "../components/organisms/post/post";
import Page from "../components/organisms/page/page";
import Loading from "./atoms/loading";
import Page404 from "./atoms/page404";
import PageTitle from "./atoms/pageTitle";
import SearchResults from "./molecules/search";
import Archive from "./organisms/archive";
import Footer from "./organisms/footer";
import Header from "./organisms/header";
import globalStyles from "./styles/global-styles";
import SkipLink from "./styles/skip-link";
import Home from "./organisms/page/home/home";
import HomeArchive from "./organisms/archive/home-archive";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Theme is the root React component of our theme. The one we will export
// in roots.
const Theme = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const categories = state.source.data["get-all-categories/"].items;
  const overrides = extendTheme({
    fonts: {
      heading: "'Roboto Slab', system-ui, 'Helvetica', serif",
      body: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    },
    colors: { ...state.theme.colors },
  });

  useEffect(() => {
    actions.source.fetch("get-all-categories");
  }, []);

  return (
    <ChakraProvider resetCSS theme={{ config, ...overrides }}>
      <Global styles={globalStyles(state.theme.colors)} />
      <PageTitle />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700&family=Roboto+Slab:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Accessibility: Provides ability to skip to main content */}
      <SkipLink as="a" href="#main">
        Skip to main content
      </SkipLink>
      {/* Add the header of the site. */}
      <Header />
      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <ScaleFade key={state.router.link} initialScale={0.9} in="true">
        <Box as="main" mt="5rem" minH="calc(100vh - 5rem)">
          <Switch>
            <Loading when={data.isFetching} />
            <Home when={data.route === "/"} categories={categories} />
            <Page when={data.isPage} categories={categories} />
            <Post when={data.isPostType} />
            <HomeArchive when={data.route === "/blog/"} />
            <Archive when={data.isArchive} categories={categories} />
            <SearchResults when={data.isSearch} />
            <Page404 when={data.is404} />
          </Switch>
        </Box>
      </ScaleFade>
      <Footer />
    </ChakraProvider>
  );
};

export default connect(Theme);
