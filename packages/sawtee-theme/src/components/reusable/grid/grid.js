import { styled, css } from "frontity";

const Grid = ({ columns, rows, rowsauto, children, styles }) => {
  return (
    <Section
      columns={columns}
      rows={rows}
      rowsauto={rowsauto}
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
  grid-template-columns: ${(props) => props.columns};
  grid-auto-rows: ${(props) => props.rowsauto && props.rowsauto};
  grid-template-rows: ${(props) => props.rows && props.rows};
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
  className,
}) => {
  return (
    <Item
      column={column}
      row={row}
      bg={bg}
      top={top}
      bottom={bottom}
      className={className}
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
  background-color: ${(props) => props.bg};
  width: 100%;
  margin: 0 auto;
  border-top: ${(props) => (props.top ? "3px solid #707070" : "none")};
  border-bottom: ${(props) => (props.bottom ? "3px solid #707070" : "none")};

  @media (max-width: 992px) {
    grid-column: unset;
  }
`;
