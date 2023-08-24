import { connect } from "frontity";
import MainHeader from "./header";
import Navigation from "./navigation";
import { SearchButton, SearchModal, SearchForm } from "../../molecules/search";
import ThemeToggle from "./themeToggle";
import { Box } from "@chakra-ui/react";

const Header = ({ state, actions }) => {
  const menu = state.source.get("/menu/primary/");
  return (
    <MainHeader>
      {menu && <Navigation justifyContent="center" menu={menu} />}

      <Box as="div" display={"flex"}>
        <ThemeToggle mr="4" />
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
};

export default connect(Header);
