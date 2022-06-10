import { styled, css } from "frontity";

const Section = ({ title, children, styles, border }) => {
  return (
    <Wrapper
      title={title}
      border={border}
      css={css`
        ${styles}
      `}
    >
      {title ? <SectionTitle>{title}</SectionTitle> : ""}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.title ? "column" : "row")};
  gap: ${(props) => (props.title ? "2rem" : "")};
`;

const SectionTitle = styled.h3`
  margin: 0;
  padding: 2rem 3rem;
`;

export default Section;
