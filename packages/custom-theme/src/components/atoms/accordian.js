import React, { useState, useEffect } from "react";
import { styled } from "frontity";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";

const Accordian = ({ data }) => {
  const [accordianData, setAccordianData] = useState([...data]);

  const ChangeAccordianOpenState = (id, open) => {
    const newState = accordianData.map((obj) => {
      // 👇️ if id equals 2d, update open property
      if (obj.open === true) {
        return { ...obj, open: false };
      }
      if (obj.id === id) {
        return { ...obj, open: !open };
      }

      // 👇️ otherwise return object as is
      return obj;
    });

    setAccordianData(newState);
  };

  function createMarkup(content) {
    return { __html: `${content}` };
  }

  return (
    <Wrapper>
      {accordianData.map(({ name, content, id, open }) => {
        return (
          <li
            key={id}
            onClick={() => ChangeAccordianOpenState(id, open)}
            // style={open ? { position: "absolute", top: "1rem" } : null}
          >
            <div className="accordian-item">
              <p>{name}</p>
              {open ? (
                <HiChevronDown size={"3rem"} />
              ) : (
                <HiChevronRight size={"3rem"} />
              )}
            </div>
            {open ? (
              <div className="accordian-content">
                <p dangerouslySetInnerHTML={createMarkup(content)} />
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
  margin: 0;
  position: relative;

  & li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    padding: 2rem 4rem;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);

    ul {
      & li {
        background-color: transparent;
        cursor: initial;
        padding: 1rem;
        margin: 0;
      }
    }

    & .accordian-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & p {
        margin: 0;
      }
    }

    & .accordian-content {
      margin-top: 2rem;
    }
  }
`;
