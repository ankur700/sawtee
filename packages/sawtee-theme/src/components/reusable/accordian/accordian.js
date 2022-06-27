import React, { useState } from "react";
import { styled } from "frontity";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";

const Accordian = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      {data.map(({ name, content, id }) => {
        return (
          <li key={id}>
            <div className="accordian-item">
              <p>{name}</p>
              {open ? (
                <HiChevronDown size={"3rem"} onClick={() => setOpen(!open)} />
              ) : (
                <HiChevronRight size={"3rem"} onClick={() => setOpen(!open)} />
              )}
            </div>
            {open ? (
              <div children="accordian-content">
                <p>{content}</p>
              </div>
            ) : null}
          </li>
        );
      })}
    </Wrapper>
  );
};

export default Accordian;

const Wrapper = styled.ul`
  list-style: none;
  madgin: 0;

  & li {
    display: flex;
    flex-direction: column;

    & .accordian-item {
      display: flex;
      justify-content: space-between;
    }

    & .accordian-content {
      //   visibility: hidden;
    }
  }
`;
