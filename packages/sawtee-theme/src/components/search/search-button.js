import { connect, styled } from "frontity";
import { SearchIcon } from "../icons";
import {
  BaseToggle,
  LabeledIcon,
  ToggleWrapper,
} from "../navigation/nav-toggle";

const SearchButton = ({ state, actions }) => {
  // Get the state of the search modal
  const { isSearchModalOpen } = state.theme;
  const { openSearchModal } = actions.theme;

  return (
    <HeaderToggle>
      <ToggleWrapper>
        <BaseToggle
          aria-expanded={isSearchModalOpen}
          onClick={openSearchModal}
          aria-label="Click to open search bar..."
          style={{ bottom: "0.5rem" }}
        >
          {/* pass label as prop a prop to provide a label <LabelIcon label={some label} */}
          <LabeledIcon icon={SearchIcon} label="search" />
        </BaseToggle>
      </ToggleWrapper>
    </HeaderToggle>
  );
};

export default connect(SearchButton);

const HeaderToggle = styled.div`
  display: none;

  @media (min-width: 1000px) {
    display: flex;
    flex-shrink: 0;
    margin-left: 3rem;
  }

  @media (min-width: 1220px) {
    margin-left: 4rem;
  }
`;
