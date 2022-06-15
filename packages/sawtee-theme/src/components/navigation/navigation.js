import { css, connect, styled } from "frontity";
import PrimaryMenuLink from "../reusable/menuLink/menuLink";
import Link from "../link";
import Image from "../reusable/image/image";
import Grid, { GridItem } from "../reusable/grid/grid";
import GlobeImage from "../../assets/undraw_connected_world_wuay.png";
import PKImage from "../../assets/paras foto.jpg";
import PRPImage from "../../assets/PRP.jpg";
import PSImage from "../../assets/puspa_sharma.jpg";

const Experts = [
  {
    name: "Posh Raj Pandey",
    image: PRPImage,
    designation: "Director",
  },
  {
    name: "Pushpa Sharma",
    image: PSImage,
    designation: "Executive Director",
  },
  {
    name: "Paras Kharel",
    image: PKImage,
    designation: "Programe Director",
  },
];

const MegaGridStyles = `
column-gap: 4rem;
`;

const AboutSectionGridSyles = `
  position: relative;
  display: flex;
  align-items: center;

  & .overlay {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    content: "";
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    // backdrop-filter: blur(2px);

  }

    &:hover .overlay {
      background: hsl(0, 0%, 0%, 0.32);
      transition: all 0.3s;
      backdrop-filter: blur(5px);
    }
`;

const AboutMegaMenu = ({ data }) => {
  return (
    <Wrapper className="mega-menu">
      <Grid
        columns={"300px 1fr 450px"}
        rows={"minmax(500px, auto)"}
        overflow={"hidden"}
        styles={MegaGridStyles}
      >
        <GridItem column={"1/2"}>
          <StyledMenu submenu={data}>
            {data.map(({ name, href }) => {
              // Check if the link matched the current page url
              return (
                <MenuItem key={name}>
                  {/* If link url is the current page, add `aria-current` for a11y */}
                  <MenuLink link={href}>
                    <span>{name}</span>
                  </MenuLink>
                </MenuItem>
              );
            })}
          </StyledMenu>
        </GridItem>
        <GridItem column={"2/3"} styles={AboutSectionGridSyles}>
          <div className="overlay"></div>
          <Image src={GlobeImage} />
          <AboutText>
            South Asia Watch on Trade, Economics and Environment (SAWTEE) was
            launched in 1994 as a loose regional network of non-governmental
            organizations (NGOs) from five South Asian countries: Bangladesh,
            India, Nepal, Pakistan and Sri Lanka. Taking into consideration the
            emerging need for fair, effective and meaningful integration of
            South Asian countries into the regional as well as global economies,
            the major motto of this regional initiative has been “GLOBALIZATION
            YES, BUT WITH SAFETY NETS”
          </AboutText>
        </GridItem>
        <GridItem column={"3/4"}>
          <div
            css={css`
              display: flex;
            `}
          >
            {Experts.map((item) => {
              return (
                <ExpertCard key={item.name}>
                  <img src={item.image} />
                  <p>{item.name}</p>
                  <p>{item.designation}</p>
                </ExpertCard>
              );
            })}
          </div>
        </GridItem>
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

            (name === "Know Us" ? (
              <AboutMegaMenu data={submenu} isCurrentPage={isCurrentPage} />
            ) : null)}
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
  font-size: 1.8rem;
  line-height: 1.2;
  width: max-content;
  overflow: hidden;
  padding: 0.75rem;
  @media (min-width: 1220px) {
    margin: 0.8rem 0 0 2.5rem !important;
  }
`;

const Wrapper = styled.div`
  visibility: hidden;
  position: absolute;
  top: 10rem;
  left: 0;
  width: 100%;
  padding: 3rem 6rem;
  background-color: hsla(195, 100%, 25%, 0.7);
  backdrop-filter: blur(5px);
  height: calc(100vh - 8rem);

  & * {
    color: #fff;
  }
`;

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: ${({ submenu }) => submenu && "column"};
  gap: ${({ submenu }) => submenu && "4rem"};
  // position: ${({ submenu }) => submenu && "absolute"};
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.0277em;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  // width: ${({ submenu }) => submenu && "100%"};

  ${MenuItem}:hover .mega-menu {
    visibility: visible;
    transition: visibility 0.3s ease-in-out;
  }

  @media (min-width: 1220px) {
    margin-top: ${({ submenu }) => (submenu ? "10px" : "-0.8rem")};
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: -2.5rem;
  }
`;

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 1.85rem;
  color: #fff;
  & span {
    position: relative;
  }
  & span::after {
    content: "";
    width: 0%;
    opacity: 0;
    height: 2px;
    background: ${(props) => props.bg || "#fff"};
    position: absolute;
    top: 20px;
    left: 0;
    transition: all 0.3s ease-in;
  }

  &:hover span::after {
    width: 100%;
    opacity: 1;
  }
`;

const AboutText = styled.p`
  color: #fff;
  font-size: 2.25rem;
  text-align: left;
  word-break: break-word;
  position: absolute;
  padding: 0 3rem;
  z-index: 99;
  line-height: 1.8;

  @media (max-width: 762px) {
    font-size: 1rem;
  }
`;

const ExpertCard = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 250px;
  background-color: hsla(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);

  & img {
    display: block;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
  }
  & p {
    margin: 0;
  }
`;
