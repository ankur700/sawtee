import { Box, ChakraProvider, ScaleFade, extendTheme } from "@chakra-ui/react";
import Switch from "@frontity/components/switch";
import "focus-visible/dist/focus-visible";
import { Global, Head, connect } from "frontity";
import { useEffect } from "react";
import Post from "../components/organisms/post/post";
import KnowUs from "../pages/KnowUs";
import OurWork from "../pages/OurWork";
import Home from "../pages/home";
import Loading from "./atoms/loading";
import Page404 from "./atoms/page404";
import PageTitle from "./atoms/pageTitle";
import SearchResults from "./molecules/search";
import Archive from "./organisms/archive";
import Footer from "./organisms/footer";
import Header from "./organisms/header";
import FontFace from "./styles/font-face";
import globalStyles from "./styles/global-styles";
import SkipLink from "./styles/skip-link";
import Contact from "../pages/contact";
import Career from "../pages/career";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Theme is the root React component of our theme. The one we will export
// in roots.
const Theme = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  const categories = state.source.data["all-categories/"].items;

  const overrides = extendTheme({
    fonts: {
      heading: "'Nunito', system-ui, 'Helvetica', sans-serif",
      body: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue','Helvetica', sans-serif",
    },
    colors: { ...state.theme.colors },
  });

  useEffect(() => {
    actions.source.fetch("all-categories");
  }, []);

  return (
    <ChakraProvider resetCSS theme={{ config, ...overrides }}>
      <Global styles={globalStyles(state.theme.colors)} />
      <FontFace />
      {/* Add some metatags to the <head> of the HTML. */}
      <PageTitle />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
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
            <Home when={data.isHome} categories={categories} />
            <KnowUs when={data.route === "/about/"} />
            <OurWork when={data.route === "/our-work/"} />
            <Contact when={data.route === "/contact/"} />
            <Career when={data.route === "/career/"} />

            <Post when={data.isPostType} />
            <SearchResults when={data.isSearch} />
            <Archive when={data.isArchive} categories={categories} />
            <Page404 when={data.is404} />
          </Switch>
        </Box>
      </ScaleFade>
      <Footer />
    </ChakraProvider>
  );
};

export default connect(Theme);
