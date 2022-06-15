import { css, connect, styled } from "frontity";
import PrimaryMenuLink from "../reusable/menuLink/menuLink";
import Link from "../link";
import Grid, { GridItem } from "../reusable/grid/grid";
import GlobeImage from "../../assets/undraw_connected_world_wuay.png";

const AboutMegaMenu = ({ data }) => {
  return (
    <Wrapper className="mega-menu">
      <Grid
        columns={"repeat(3, 1fr)"}
        rows={"minmax(500px, auto)"}
        overflow={"hidden"}
      >
        <GridItem column={"1/2"}>
          <ul>
            {data.map(({ name, href }) => {
              return (
                <li key={name}>
                  <PrimaryMenuLink link={href} text={name} />
                </li>
              );
            })}
          </ul>
        </GridItem>
        <GridItem column={"2/3"}>
          <div
            css={css` position: relative; display: flex; justify-content: center: align-items: center;`}
          >
            <img src={GlobeImage} alt="" />
            <p>
              South Asia Watch on Trade, Economics and Environment (SAWTEE) was
              launched in 1994 as a loose regional network of non-governmental
              organizations (NGOs) from five South Asian countries: Bangladesh,
              India, Nepal, Pakistan and Sri Lanka. Taking into consideration
              the emerging need for fair, effective and meaningful integration
              of South Asian countries into the regional as well as global
              economies, the major motto of this regional initiative has been
              “GLOBALIZATION YES, BUT WITH SAFETY NETS”
            </p>
          </div>
        </GridItem>
        <GridItem column={"3/4"}></GridItem>
      </Grid>
    </Wrapper>
  );
};

const Menu = ({ options, currentPageLink, submenu }) => (
  <StyledMenu submenu={submenu}>
    {options.map(({ name, href, submenu }) => {
      // Check if the link matched the current page url
      const isCurrentPage = currentPageLink === href;
      return (
        <MenuItem key={name}>
          {/* If link url is the current page, add `aria-current` for a11y */}
          <PrimaryMenuLink
            link={href}
            aria-current={isCurrentPage ? "page" : undefined}
            text={name}
          >
            {name}
          </PrimaryMenuLink>
          {submenu &&
            // <Menu options={submenu} currentPageLink={currentPageLink} submenu />

            (name === "Know Us" ? <AboutMegaMenu data={submenu} /> : null)}
        </MenuItem>
      );
    })}
  </StyledMenu>
);

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Navigation = ({ state }) => {
  const menus = state.theme.menu;
  const currentPageLink = state.router.link;

  return (
    <NavWrapper>
      <MenuNav>
        <Menu options={menus} currentPageLink={currentPageLink} />
      </MenuNav>
    </NavWrapper>
  );
};

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

const MenuItem = styled.li`
  font-size: 1.5rem;
  line-height: 1.2;
  // position: relative;
  background: #d9dae1;
  overflow: hidden;
  padding: 0.75rem;
  @media (min-width: 1220px) {
    margin: 0.8rem 0 0 2.5rem !important;
  }
`;

const Wrapper = styled.div`
  display: none;
  position: absolute;
  top: 8rem;
  left: 0;
  width: 100%;
  padding: 3rem 6rem;
  background-color: hsla(195, 100%, 25%, 0.7);
  backdrop-filter: blur(5px);
  height: 48rem;

  & * {
    color: #fff;
  }
`;

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: ${({ submenu }) => submenu && "column"};
  visibility: ${({ submenu }) => submenu && "hidden"};
  position: ${({ submenu }) => submenu && "absolute"};
  left: 0;
  top: 8rem;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.0277em;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  // margin: ${({ submenu }) => (submenu ? "10px" : 0)};
  width: ${({ submenu }) => submenu && "100%"};

  ${MenuItem}:hover .mega-menu {
    display: block;
  }

  @media (min-width: 1220px) {
    margin-top: ${({ submenu }) => (submenu ? "10px" : "-0.8rem")};
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: -2.5rem;
  }
`;

const MenuImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
