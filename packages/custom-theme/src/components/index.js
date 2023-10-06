import {
  Box,
  ChakraProvider,
  ScaleFade,
  extendTheme,
} from "@chakra-ui/react";
import Switch from "@frontity/components/switch";
import "focus-visible/dist/focus-visible";
import { Global, Head, connect } from "frontity";
import Post from "./post/post";
import Loading from "./atoms/loading";
import Page404 from "./atoms/page404";
import PageTitle from "./atoms/pageTitle";
import SearchResults from "./search";
import Archive from "./archive";
import Footer from "./footer";
import Header from "./header";
import globalStyles from "./styles/global-styles";
import SkipLink from "./styles/skip-link";
import Home from "../components/page/home";
import Page from "./page/page";
import Script from "@frontity/components/script";

// Theme is the root React component of our theme. The one we will export
// in roots.
const Theme = ({ state }) => {
  const data = state.source.get(state.router.link);
  const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };
  const overrides = extendTheme({
    fonts: {
      heading: "'Roboto Slab', system-ui, 'Helvetica', serif",
      body: "'Roboto', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    },
    colors: { ...state.theme.colors },
  });

  return (
    <ChakraProvider theme={{ config, ...overrides }}>
      <Global styles={globalStyles(state.theme.colors)} />
      <PageTitle />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,opsz,wght@0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700&family=Roboto+Slab:wght@600;700;800;900&display=swap"
          rel="prefetch"
          as="style"
        />
      </Head>
      <SkipLink as="a" href="#main">
        Skip to main content
      </SkipLink>

      <Box as="main">
        <Header />
        <ScaleFade key={state.router.link} initialScale={0.9} in="true">
          <Switch>
            <Loading when={data.isFetching} />
            <SearchResults when={data.isSearch} />
            <Home when={data.route === "/"} />
            <Archive when={data.isArchive} />
            <Page when={data.isPage} />
            <Post when={data.isPostType} />
            <Page404 when={data.is404} />
          </Switch>
        </ScaleFade>
      </Box>
      <Footer />
    </ChakraProvider>
  );
};

export default connect(Theme);
