import { styled, css } from "frontity";

const Grid = ({ overflow, columns, rows, children, styles }) => {
  return (
    <Section
      overflow={overflow}
      columns={columns}
      rows={rows}
      css={css`
        ${styles}
      `}
    >
      {children}
    </Section>
  );
};

const Section = styled.div`
  display: grid;
  overflow: ${(props) => props.overflow || "hidden"};
  grid-template-columns: ${(props) => props.columns || "1fr"};
  grid-auto-rows: ${(props) => props.rows || "auto"};
  width: 100%;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
  }
`;

export default Grid;

export const GridItem = ({
  column,
  row,
  bg,
  children,
  top,
  bottom,
  styles,
}) => {
  return (
    <Item
      column={column}
      row={row}
      bg={bg}
      top={top}
      bottom={bottom}
      css={css`
        ${styles}
      `}
    >
      {children}
    </Item>
  );
};

const Item = styled.div`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  background: ${(props) => props.bg};
  width: 100%;
  margin: 0 auto;
  border-top: ${(props) => (props.top ? "3px solid #707070" : "none")};
  border-bottom: ${(props) => (props.bottom ? "3px solid #707070" : "none")};

  @media (max-width: 992px) {
    grid-column: unset;
  }
`;
