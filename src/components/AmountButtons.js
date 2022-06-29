import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = (props) => {
  const { amount, increase, decrease, stock } = props;

  return (
    <>
      <Wrapper className="amount-btns">
        <button type="button" onClick={decrease}>
          <FaMinus />
        </button>
        <h2>{amount}</h2>
        <button type="button" onClick={increase}>
          <FaPlus />
        </button>
      </Wrapper>
      {amount === stock && (
        <p style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          Currently {stock} available in stock
        </p>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
