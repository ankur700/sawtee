import { connect } from "frontity";
import React from "react";
import MainHeader from "./header";
import Navigation from "./navigation";
import SocialNav from "./social-menu";
import { SearchButton, SearchModal, SearchForm } from "../../molecules/search";
import ThemeToggle from "./themeToggle";
import { Box } from "@chakra-ui/react";

const Header = ({ state, actions }) => (
  <MainHeader>
    <Navigation menu={state.theme.menu} />
    {/* {state.theme.showSocialLinks && (
      <SocialNav menu={state.theme.socialLinks} />
    )} */}

    <Box as="div" display={"flex"}>
      <ThemeToggle />
      <SearchButton onClick={actions.theme.openSearchModal} />
    </Box>
    <SearchModal
      isOpen={state.theme.isSearchModalOpen}
      onClose={actions.theme.closeSearchModal}
    >
      <SearchForm />
    </SearchModal>
  </MainHeader>
);

export default connect(Header);
