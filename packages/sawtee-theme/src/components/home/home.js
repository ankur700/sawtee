import { styled, connect } from "frontity";

const Home = ({ state }) => {
  return (
    <>
      <HeroSection>
        <h1>This is home page</h1>
      </HeroSection>
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
`;
