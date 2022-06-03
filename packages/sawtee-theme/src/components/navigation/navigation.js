import { connect, styled } from "frontity";
import Link from "../link";

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
              <MenuLink
                link={link}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {name}
              </MenuLink>
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

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  padding: 0.5rem 1rem;
  --c: #006181; /* the color  */
  --h: 1.8em; /* the height */
  line-height: var(--h);
  color: #0000;
  overflow: hidden;
  text-shadow: 0 calc(-1 * var(--h) * var(--_i, 0)) var(--c),
    0 calc(var(--h) * (1 - var(--_i, 0))) #fff;
  background: linear-gradient(var(--c) 0 0) no-repeat
    calc(200% - var(--_i, 0) * 100%) 100% / 200%
    calc(100% * var(--_i, 0) + 0.05em);
  transition: 0.3s calc(var(--_i, 0) * 0.3s),
    background-position 0.3s calc(0.3s - calc(var(--_i, 0) * 0.3s));

  &:hover {
    --_i: 1;
  }
`;
