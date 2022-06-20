import React, { useState, useRef, useEffect } from "react";
import { css, connect, styled } from "frontity";
import PrimaryMenuLink from "../reusable/menuLink/menuLink";
import Link from "../link";
import Image from "../reusable/image/image";
import Grid, { GridItem } from "../reusable/grid/grid";
import GlobeImage from "../../assets/undraw_connected_world_wuay.png";
import PKImage from "../../assets/paras foto.jpg";
import PRPImage from "../../assets/PRP.jpg";
import PSImage from "../../assets/puspa_sharma.jpg";
import { HiChevronDown } from "react-icons/hi";

const Experts = [
  {
    name: "posh R. pandey",
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

const AboutMegaGridStyles = `
grid-template-columns: minmax(350px, 20%) 1fr;
grid-template-rows: repeat(2, minmax(500px , 40%));
gap: 4rem;

@media (min-width:1500px){
  grid-template-columns: 300px 1fr minmax(500px, 35%);
  grid-template-rows: minmax(500px, 1fr);
}
`;

const AboutSubmenu = `
  grid-column: 1/2;
  grid-row: 1/2;

`;

const ExpertStyles = `
  grid-column: 1/3;
  grid-row: 2/3;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 2rem;
  justify-content: center;

  @media (min-width:1500px){
    grid-column: 3/4;
    grid-row: 1/2;
    flex-direction: column;
  }

  & .expert-wrapper {
    display: flex;
    gap: 1rem;
  }
`;

const AboutSectionGridSyles = `
  position: relative;
  grid-column: 2/4;
  grid-row: 1/2;
  display: flex;
  align-items: center;
  max-height: 500px;
  border: 1px solid hsla(0, 0%, 44%, 1);

  @media (min-width: 1500px) {
    grid-column: 2/3;
  }

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
  display: flex;
  font-size: 1.5rem;
  line-height: 1.2;
  width: max-content;
  overflow: hidden;
  padding: 0.75rem;
  @media (min-width: 1220px) {
    margin: 0.8rem 0 0 2.5rem !important;
    font-size: 1.8rem;
  }
`;

const Wrapper = styled.div`
  visibility: ${(props) => (props.show === true ? "visible" : "hidden")};
  position: absolute;
  top: 10rem;
  left: 0;
  width: 100%;
  padding: 3rem 6rem;
  background-color: hsla(195, 100%, 25%, 0.7);
  backdrop-filter: blur(5px);
  min-height: 55rem;
  display: flex;
  align-items: center;

  & * {
    color: #fff;
  }
`;

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: ${({ submenu }) => submenu && "column"};
  gap: ${({ submenu }) => submenu && "3rem"};
  font-weight: 500;
  margin: 0;
  flex-wrap: nowrap;
  justify-content: flex-start;
  list-style: none;
  margin: 0;

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
  font-size: 1.5rem;
  color: hsla(0, 17%, 95%, 1);
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

const TextContent = styled.p`
  color: hsla(0, 17%, 95%, 1);
  font-size: 2rem;
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
  padding: 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 180px;
  background-color: hsla(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  align-items: center;
  height: 200px;
  border-radius: 10px;
  justify-content: space-between;
  border: 1px solid hsla(0, 0%, 44%, 1);

  & img {
    display: block;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover;
  }

  & div {
    display: flex;
    flex-direction: column;
    background-color: hsla(0, 0%, 0%, 0.4);
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    height: 5rem;
    & p {
      margin: 0;
      font-size: 1.25rem;
      text-align: center;
      letter-spacing: 1px;
      font-family: monospace;
      color: hsla(0, 17%, 95%, 1);
      text-transform: capitalize;
    }
    & .designation {
      font-size: 0.85rem;
    }
  }
`;

const AboutMegaMenu = ({ data, show, ToggleMegaMenu }) => {
  return (
    <Wrapper
      className="mega-menu"
      show={show}
      onClick={() => ToggleMegaMenu("Know Us")}
    >
      <Grid styles={AboutMegaGridStyles}>
        <GridItem styles={AboutSubmenu}>
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
        <GridItem styles={AboutSectionGridSyles}>
          <div className="overlay"></div>
          <Image src={GlobeImage} />
          <TextContent>
            South Asia Watch on Trade, Economics and Environment (SAWTEE) was
            launched in 1994 as a loose regional network of non-governmental
            organizations (NGOs) from five South Asian countries: Bangladesh,
            India, Nepal, Pakistan and Sri Lanka. Taking into consideration the
            emerging need for fair, effective and meaningful integration of
            South Asian countries into the regional as well as global economies,
            the major motto of this regional initiative has been “GLOBALIZATION
            YES, BUT WITH SAFETY NETS”
          </TextContent>
        </GridItem>
        <GridItem styles={ExpertStyles}>
          <div className="expert-wrapper">
            {Experts.map((item) => {
              return (
                <ExpertCard key={item.name}>
                  <img src={item.image} />
                  <div>
                    <p>{item.name}</p>
                    <p className="designation">{item.designation}</p>
                  </div>
                </ExpertCard>
              );
            })}
          </div>
          <div className="expert-wrapper">
            {Experts.map((item) => {
              return (
                <ExpertCard key={item.name}>
                  <img src={item.image} />
                  <div>
                    <p>{item.name}</p>
                    <p className="designation">{item.designation}</p>
                  </div>
                </ExpertCard>
              );
            })}
          </div>
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

const OurWorkMegaMenu = ({ data, show, ToggleMegaMenu }) => {
  return (
    <Wrapper
      className="mega-menu"
      show={show}
      onClick={() => ToggleMegaMenu("Our Work")}
    >
      <Grid
        columns={"1fr 2fr"}
        rows={"repeat(2, 1fr)"}
        styles={WorkMegaGridStyles}
      >
        {data.map((item, i) => {
          return (
            <GridItem
              key={item.name}
              column={i === 0 ? "1/3" : i === 1 ? "1/2" : "2/3"}
              row={i === 0 ? "1/2" : "2/3"}
              styles={WorkGridStyles}
              className={"grid-" + (i + 1)}
            >
              <p className="parent">{item.name}</p>
              <div className={"children-list-" + (i + 1)}>
                {item.submenu?.map((children) => {
                  return (
                    <MenuLink key={children.name} link={children.href}>
                      {children.name}
                    </MenuLink>
                  );
                })}
              </div>
            </GridItem>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

const Menu = ({ options, currentPageLink, submenu }) => {
  const [showAboutMegaMenu, setShowAboutMegaMenu] = useState(false);
  const [showWorkMegaMenu, setShowWorkMegaMenu] = useState(false);

  const ToggleMegaMenu = (name) => {
    if (name === "Know Us") {
      if (showWorkMegaMenu === true) {
        setShowWorkMegaMenu(false);
      }
      setShowAboutMegaMenu(!showAboutMegaMenu);
    } else if (name === "Our Work") {
      if (showAboutMegaMenu === true) {
        setShowAboutMegaMenu(false);
      }
      setShowWorkMegaMenu(!showWorkMegaMenu);
    }
  };

  return (
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
            {submenu && (
              <DropDownIcon
                size={"3rem"}
                // onMouseEnter={() => ToggleMegaMenu(name)}
                onClick={() => ToggleMegaMenu(name)}
              />
            )}
            {submenu &&
              (name === "Know Us" ? (
                <AboutMegaMenu
                  data={submenu}
                  show={showAboutMegaMenu}
                  ToggleMegaMenu={ToggleMegaMenu}
                />
              ) : name === "Our Work" ? (
                <OurWorkMegaMenu
                  data={submenu}
                  show={showWorkMegaMenu}
                  ToggleMegaMenu={ToggleMegaMenu}
                />
              ) : null)}
          </MenuItem>
        );
      })}
    </StyledMenu>
  );
};

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

const WorkMegaGridStyles = `
  row-gap: 2rem;

   & .grid-1 {
    border-bottom: 5px solid hsla(0, 12%, 25%, 1);
    padding-bottom: 4rem;
   }

   & .grid-2 {
    border-right: 5px solid hsla(0, 12%, 25%, 1);
   }
`;

const WorkGridStyles = `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .parent {
    font-size: 2.75rem;
  }
  & div {
    display: grid;
    grid-auto-rows: minmax(max-content, 1fr);
    column-gap: 2rem;
    row-gap: 2rem;
      & a {
      display: inline-block;
      font-size: 1.5rem;
      text-transform: none;
    }

  }

  & .children-list-1 {
    grid-template-columns: repeat(4, 1fr);
    // padding-bottom: 3.5rem;
    // border-bottom: 5px solid hsla(0, 0%, 44%, 1);

  }

  & .children-list-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  & .children-list-3 {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const DropDownIcon = styled(HiChevronDown)`
  cursor: pointer;
  &:hover {
    transform: rotate(180deg);
    transition: all 0.4s ease-out;
    outline: none;
  }
`;
