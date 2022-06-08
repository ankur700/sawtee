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
    <Link
      href="#site-header"
      onClick={scrollToTop}
      style={{ cursor: "pointer" }}
    >
      <span style={{ marginRight: 8 }}>To the top</span>
      <span className="arrow" aria-hidden="true">
        ↑
      </span>
    </Link>
  );
};

const SubscriptionCall = () => {
  return (
    <>
      <Wrapper>
        <Title>
          <h4> {"Latest news about Trade, Economics & Environment"}</h4>
          <span>We won't spam you..</span>
        </Title>
        <ActionSection>
          <Input type="text" placeholder="example@example.com" />
          <SubscribeButton>Subscribe</SubscribeButton>
        </ActionSection>
      </Wrapper>
    </>
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
              <AwesomeLink>
                Phone: <a href="tel:+977-1-4444438">+977-1-4444438</a>
              </AwesomeLink>
              <AwesomeLink>
                Fax: <a href="tel:+977 1 4444570">+977-1-4444570</a>
              </AwesomeLink>
              <AwesomeLink>
                Email: <a href="mailto:sawtee@sawtee.org">sawtee@sawtee.org</a>
              </AwesomeLink>
              {/* <AwesomeLink>
                P.O.Box: <a href="#">19366</a>
              </AwesomeLink> */}
              <AwesomeLink>
                Address: <a>Tukucha Marg, Baluwatar, Kathmandu</a>
              </AwesomeLink>
            </WidgetList>
          </FooterWidget>
          <FooterWidget item="2">
            <WidgetTitle size="20px" color="#fff">
              Publications
            </WidgetTitle>
            <WidgetList>
              <AwesomeLink>
                <a href="">Trade Insight</a>
              </AwesomeLink>
              <AwesomeLink>
                <a href="">Issue Paper</a>
              </AwesomeLink>
              <AwesomeLink>
                <a href="">Newsletter</a>
              </AwesomeLink>
              <AwesomeLink>
                <a href="">Workinig Paper</a>
              </AwesomeLink>
              <AwesomeLink>
                <a href="">Research Paper</a>
              </AwesomeLink>
            </WidgetList>
          </FooterWidget>
          <FooterWidget item="3">
            <WidgetTitle size="20px" color="#fff">
              Useful Links
            </WidgetTitle>
            <WidgetList>
              <AwesomeLink>
                <a href="">Map</a>
              </AwesomeLink>
              <AwesomeLink>
                <a href="">Work With Us</a>
              </AwesomeLink>
              <AwesomeLink>
                <a href="">Organization Policy</a>
              </AwesomeLink>
              <AwesomeLink>
                <a href="">Press Releases</a>
              </AwesomeLink>
              <AwesomeLink>
                <a href="">News</a>
              </AwesomeLink>
            </WidgetList>
          </FooterWidget>
          <FooterWidget item="4">
            <WidgetTitle size="20px" color="#fff">
              Subscribe to our Newsletter
            </WidgetTitle>
            <SubscriptionCall />
          </FooterWidget>
        </TopFooter>
        <FooterBottom>
          <Credits>
            <Copyright>
              &copy; {currentYear}{" "}
              <Link link={state.frontity.url}>{state.frontity.title}</Link>
            </Copyright>
            <PoweredBy>
              Made with 💙 by{" "}
              <Link link="https://ankursingh.com.np">Ankur</Link>
            </PoweredBy>
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
  grid-template-columns: repeat(4, minmax(min-content, auto));
  grid-auto-rows: minmax(max-content, auto);
  background: #006181;
  padding: 4rem 8rem;
  gap: 2rem;
`;

const FooterWidget = styled.div`
  grid-column: ${(props) =>
    props.item + "/" + (Number(props.item) + Number(1))};
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
  padding: 0 0 2rem;
  background-color: ${(props) => props.bg};
  color: #000000;

  @media (min-width: 700px) {
    // margin-top: 8rem;
    font-size: 1.8rem;
    // padding: 4.3rem 0;
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
  margin: 0;
`;

const AwesomeLink = styled.li`
  margin: 0;

  a {
    font-size: 1.5rem;
    color: #fff;
    position: relative;

    ::after {
      content: "";
      width: 0%;
      opacity: 0;
      height: 2px;
      background: #fff;
      position: absolute;
      top: 20px;
      left: 0;
      transition: all 0.3s ease-in;
    }
  }

  &:hover > a::after {
    width: 100%;
    opacity: 1;
  }
`;

const Title = styled.div`
  color: #7fc4fd;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h4,
  span {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  height: 4rem;
  border-radius: 0.75rem;
  width: 65%;
  border: none;
  padding: 0 2rem;
  :focus,
  :active,
  :focus-within {
    border: none;
    outline: none;
  }
`;

const SubscribeButton = styled.button`
  width: 35%;
  border-radius: 0.75rem;
  background: #fff;
  padding: 0 2rem;
  color: #006181;
  text-align: center;
  cursor: pointer;
  font-weight: 600;

  :hover {
    background: #7fc4fd;
    color: #fff;
  }
`;
