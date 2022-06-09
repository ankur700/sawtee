import { connect, styled } from "frontity";
import PrimaryMenuLink from "../reusable/menuLink/menuLink";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Navigation = ({ state }) => (
  <NavWrapper>
    <MenuNav>
      <Menu>
        {state.theme.menu.map(([name, link]) => {
          // Check if the link matched the current page url
          const isCurrentPage = state.router.link === link;
          return (
            <MenuItem key={name}>
              {/* If link url is the current page, add `aria-current` for a11y */}
              <PrimaryMenuLink
                link={link}
                ariaCurrent={isCurrentPage ? "page" : undefined}
                text={name}
              >
                {name}
              </PrimaryMenuLink>
            </MenuItem>
          );
        })}
      </Menu>
    </MenuNav>
  </NavWrapper>
);

export default connect(Navigation);

const NavWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const MenuNav = styled.nav`
  display: none;
  @media (min-width: 1000px) {
    display: block;
    width: 100%;
  }
`;

const Menu = styled.ul`
  display: flex;
  // font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.0277em;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  margin: 0;

  @media (min-width: 1220px) {
    margin-top: -0.8rem;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: -2.5rem;
  }
`;

const MenuItem = styled.li`
  font-size: 1.5rem;
  line-height: 1.2;
  position: relative;
  background: #d9dae1;
  overflow: hidden;
  padding: 0.75rem;
  @media (min-width: 1220px) {
    margin: 0.8rem 0 0 2.5rem !important;
  }
`;
