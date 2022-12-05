import { css, styled, connect } from "frontity";
import Link from "../../link";
import SectionContainer from "../../styles/section-container";
import React, { useState } from "react";
import { HiOutlineXCircle } from "react-icons/hi";

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
      link="#site-header"
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
          New research, insightful graphics, and event invites in your inbox
          every month.
        </Title>
        <Form>
          <Input type="text" placeholder="example@example.com" />
          <SubscribeButton>Subscribe</SubscribeButton>
        </Form>
      </Wrapper>
    </>
  );
};

const Footer = ({ state }) => {
  const [showMap, setShowMap] = useState(false);

  const showMapPreview = () => {
    setShowMap(!showMap);
  };

  const currentYear = new Date().getFullYear();
  const { footerBg } = state.theme.colors;

  return (
    <SiteFooter bg={footerBg} role="contentinfo">
      <Container>
        <TopFooter>
          <FooterWidget item="1">
            <WidgetTitle>Contact Us</WidgetTitle>
            <address>
              <WidgetList>
                <ListItem>
                  Phone :{" "}
                  <AwesomeLink href="tel:+977-1-4444438">
                    <span>+977-1-4444438</span>
                  </AwesomeLink>
                </ListItem>
                <ListItem>
                  Fax :{" "}
                  <AwesomeLink href="tel:+977 1 4444570">
                    <span>+977-1-4444570</span>
                  </AwesomeLink>
                </ListItem>
                <ListItem>
                  Email :{" "}
                  <AwesomeLink href="mailto:sawtee@sawtee.org">
                    <span>sawtee@sawtee.org</span>
                  </AwesomeLink>
                </ListItem>
                <ListItem>
                  Address :{" "}
                  <a
                    css={css`
                      &:hover {
                        text-decoration: underline dotted !important;
                        text-underline-offset: 3px;
                        text-underline-position: under;
                        cursor: pointer;
                      }
                    `}
                    title={"Click to toggle map view"}
                    onClick={(e) => {
                      e.preventDefault();
                      showMapPreview();
                    }}
                  >
                    <span>z</span>
                  </a>
                </ListItem>
              </WidgetList>
            </address>
          </FooterWidget>
          <FooterWidget item="2" maxWidth={"max-content"}>
            <WidgetTitle>Publications</WidgetTitle>
            <WidgetList>
              <ListItem>
                <AwesomeLink href="">
                  <span>Trade Insight</span>
                </AwesomeLink>
              </ListItem>
              <ListItem>
                <AwesomeLink href="">
                  <span>Issue Paper</span>
                </AwesomeLink>
              </ListItem>
              <ListItem>
                <AwesomeLink href="">
                  <span>Newsletter</span>
                </AwesomeLink>
              </ListItem>
              <ListItem>
                <AwesomeLink href="">
                  <span>Workinig Paper</span>
                </AwesomeLink>
              </ListItem>
              <ListItem>
                <AwesomeLink href="">
                  <span>Research Paper</span>
                </AwesomeLink>
              </ListItem>
            </WidgetList>
          </FooterWidget>
          <FooterWidget item="3" maxWidth={"max-content"}>
            <WidgetTitle>Useful Links</WidgetTitle>
            <WidgetList>
              <ListItem>
                <AwesomeLink href="">
                  <span>Map</span>
                </AwesomeLink>
              </ListItem>
              <ListItem>
                <AwesomeLink href="">
                  <span>Work With Us</span>
                </AwesomeLink>
              </ListItem>
              <ListItem>
                <AwesomeLink href="">
                  <span>Organization Policy</span>
                </AwesomeLink>
              </ListItem>
              <ListItem>
                <AwesomeLink href="">
                  <span>Press Releases</span>
                </AwesomeLink>
              </ListItem>
              <ListItem>
                <AwesomeLink href="">
                  <span>News</span>
                </AwesomeLink>
              </ListItem>
            </WidgetList>
          </FooterWidget>
          <FooterWidget item="4">
            <WidgetTitle>Sign up to stay informed</WidgetTitle>
            <SubscriptionCall />
          </FooterWidget>

          {showMap ? (
            <MapPreview>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.857532011193!2d85.32714031452029!3d27.721684731469765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1913dfb0b0b3%3A0x4d5d3519d24d3c38!2sSouth%20Asia%20Watch%20on%20Trade%2C%20Economics%20and%20Environment%20(SAWTEE)!5e0!3m2!1sen!2snp!4v1655187906617!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div
                className="close"
                onClick={() => (showMap === true ? showMapPreview() : null)}
              >
                <HiOutlineXCircle size={"3rem"} />
              </div>
            </MapPreview>
          ) : null}
        </TopFooter>
        <FooterBottom>
          <Credits>
            <Copyright>
              &copy; {currentYear}{" "}
              <Link link={state.frontity.url}>{state.frontity.title}</Link>
            </Copyright>
            <PoweredBy>
              Made with ❤ by{" "}
              <AwesomeLink href="https://ankursingh.com.np/">
                <span>Ankur</span>
              </AwesomeLink>
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
  grid-template-columns: 30% 17% 17% 1fr;
  grid-auto-rows: minmax(max-content, auto);
  background: #006181;
  padding: 4rem 8rem;
  row-gap: 4rem;
  column-gap: 2rem;
  position: relative;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 762px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const FooterWidget = styled.div`
  grid-column: ${(props) =>
    props.item + "/" + (Number(props.item) + Number(1))};
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 1400px) {
    grid-column: auto;
  }
`;

const WidgetTitle = styled.h3`
  margin: 0;
  font-size: ${(props) => props.size || "20px"};
  color: ${(props) => props.color || "#fff"};
  text-transform: uppercase;
`;

const SiteFooter = styled.footer`
  border-color: #dcd7ca;
  border-style: solid;
  font-family: "Source Sans Pro", monospace;
  font-size: 1.5rem;
  border-width: 0;
  padding: 0 0 2rem;
  background-color: ${(props) => props.bg};
  color: #000000;

  @media (min-width: 700px) {
    font-size: 1.8rem;
    padding: 4.3rem 0;
  }

  li {
    letter-spacing: 0.1rem;
    max-width: max-content;
  }

  a {
    color: inherit;
    text-decoration: none;
    letter-spacing: 0.1rem;
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
  color: #fff;
  display: none;
  margin: 0 0 0 2.4rem;

  @media (min-width: 700px) {
    display: block;
  }
`;

const WidgetList = styled.ul`
  list-style: none;
  color: #eee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
`;

const ListItem = styled.li`
  margin: 0;
  width: 29.5rem;
`;

const AwesomeLink = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  color: #eee;
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

const Title = styled.p`
  color: hsla(195, 100%, 75%, 1);
  font-size: 1.5rem;
  font-family: monospace;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Form = styled.div`
  display: flex;
  padding: 1.5rem 0;
  width: 100%;
  flex-direction: column;
  gap: 0.75rem;
  & input {
    width: 100%;
  }

  @media (min-width: 992px) {
    flex-direction: row;
    gap: 0;
    & input {
      width: calc(100% - 150px);
    }
  }
`;

const Input = styled.input`
  height: 4rem;
  border-radius: 0;
  width: calc(100% - 150px);
  border: none;
  font-family: monospace;
  font-size: inherit;
  padding: 0 2rem;
  color: #f5f1f1;
  background-color: transparent;
  border-bottom: 0.125rem solid #f5f1f1;
  ::placeholder {
    color: #f5f1f1;
    font-size: inherit;
  }

  :focus,
  :active,
  :focus-within {
    border: none;
    color: #f5f1f1;
    border-bottom: 0.125rem solid #f5f1f1;
    outline: none;
  }
  @media (min-width: 768px) {
    width: calc(100% - 100px);
  }
`;

const SubscribeButton = styled.button`
  background-color: transparent;
  color: #f5f1f1;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  font-size: inherit;
  height: 4rem;
  width: 130px;
  border: 2px solid #f5f1f1;

  :hover {
    background-color: hsla(0, 0%, 0%, 0.9);
    color: #eee;
    transition: background-color 0.4s ease;
  }
  @media (min-width: 768px) {
    align-self: center;
    width: 150px;
  }
`;

const MapPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  padding: 5rem;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);

  & div {
    width: 700px;
    height: 450px;
  }
  & .close {
    right: -45px;
    height: 80px;
    width: 80px;
    top: 15px;
    position: absolute;
    cursor: pointer;
  }

  @media (min-width: 992px) {
    left: 30%;
    top: -75%;
    width: 700px;
    height: auto;
  }
`;
