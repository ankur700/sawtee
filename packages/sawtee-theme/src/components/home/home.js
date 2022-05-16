import { styled, connect } from "frontity";

const Home = ({ state }) => {
  return (
    <>
      <HeroSection>
        <h1>Insert Slider Here</h1>
      </HeroSection>
      <Content>
        <h2>Content goes here</h2>
      </Content>
    </>
  );
};

export default connect(Home);

const HeroSection = styled.section`
  width: 100%;
  padding: 1rem 2rem;
  background: #f5efe0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 6.5rem);
`;

const Content = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
