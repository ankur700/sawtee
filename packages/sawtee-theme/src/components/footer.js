import { styled, connect } from "frontity";
import Link from "./link";
import SectionContainer from "./styles/section-container";

// Component that provides scroll to top functionality
const BackToTop = () => {
  // scroll to top function
  const scrollToTop = (event) => {
    // prevent the default behaviors
    event.preventDefault();
    // scroll to the top smoothly
    scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <a href="#site-header" onClick={scrollToTop} style={{ cursor: "pointer" }}>
      <span style={{ marginRight: 8 }}>To the top</span>
      <span className="arrow" aria-hidden="true">
        ↑
      </span>
    </a>
  );
};

const Footer = ({ state }) => {
  const currentYear = new Date().getFullYear();
  const { footerBg } = state.theme.colors;

  return (
    <SiteFooter bg={footerBg} role="contentinfo">
      <Container>
        <TopFooter>
          <FooterWidget item="1">
            <WidgetTitle size="20px" color="#fff">
              Contact Us
            </WidgetTitle>
            <WidgetList>
              <li>
                Phone: <a href="phoneto:+977-1-4444438">+977-1-4444438</a>
              </li>
              <li>
                Email: <a href="mailto:sawtee@sawtee.org">sawtee@sawtee.org</a>
              </li>
              <li>
                Address: <a>Tukucha Marga, Baluwatar</a>
              </li>
              <li></li>
              <li></li>
            </WidgetList>
          </FooterWidget>
          <FooterWidget item="2" />
          <FooterWidget item="3" />
          <FooterWidget item="4" />
        </TopFooter>
        <FooterBottom>
          <Credits>
            <Copyright>
              &copy; {currentYear}{" "}
              <Link link={state.frontity.url}>{state.frontity.title}</Link>
            </Copyright>
            <PoweredBy>Powered by Frontity</PoweredBy>
          </Credits>
          <BackToTop />
        </FooterBottom>
      </Container>
    </SiteFooter>
  );
};

export default connect(Footer);

const FooterBottom = styled(SectionContainer)`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
`;

const TopFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(fit-content, auto);
  background: #006181;
  padding: 4rem;
`;

const FooterWidget = styled.div`
  grid-column: ${(props) => props.item + "/" + (props.item + Number(1))};
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const WidgetTitle = styled.h3`
  margin: 0;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  text-transform: uppercase;
`;

const SiteFooter = styled.footer`
  border-color: #dcd7ca;
  border-style: solid;
  border-width: 0;
  padding: 3rem 0;
  background-color: ${(props) => props.bg};
  color: #000000;

  @media (min-width: 700px) {
    margin-top: 8rem;
    font-size: 1.8rem;
    padding: 4.3rem 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Credits = styled.div`
  @media (min-width: 700px) {
    display: flex;
  }
`;

const Copyright = styled.p`
  font-weight: 600;
  margin: 0;

  @media (min-width: 700px) {
    font-weight: 700;
  }
`;

const PoweredBy = styled.p`
  color: #6d6d6d;
  display: none;
  margin: 0 0 0 2.4rem;

  @media (min-width: 700px) {
    display: block;
  }
`;

const WidgetList = styled.ul`
  list-style: none;
  text-align: left;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
