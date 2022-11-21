import React, { useState } from "react";
import { styled } from "frontity";
import { HiArrowRight, HiChevronRight } from "react-icons/hi";

const ViewAllBtn = ({ text }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ViewButton
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
    >
      {text}

      {hovered ? (
        <HiArrowRight className="icon" size={"2rem"} />
      ) : (
        <HiChevronRight className="icon" size={"2rem"} />
      )}
    </ViewButton>
  );
};

export default ViewAllBtn;

const ViewButton = styled.button`
  width: 16rem;
  font-size: 1.75rem;
  font-weight: 600;
  display: flex;
  background-color: transparent;
  height: 4rem;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  gap: 1rem;
  backdrop-filter: blur(5px);
  border: 2px solid #000;

  &:hover {
    cursor: pointer;
    background-color: #333;
    color: #fff;
    border: none;
    transition: all 0.2s ease-in-out;
    .icon {
      color: #fff;
    }
  }

  .icon-chevron {
    visibility: visible;
  }
`;
