import { styled, css } from "frontity";

const Section = ({ children, styles, border }) => {
  return (
    <Wrapper
      border={border}
      css={css`
        ${styles}
      `}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  display: flex;
`;

export default Section;
