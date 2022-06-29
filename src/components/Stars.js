import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ stars, reviews }) => {
  // let starArray = [];
  // for (let i = 1; i <= 5; i++) {
  //   let star = (
  //     <span>
  //       {stars >= i ? (
  //         <BsStarFill />
  //       ) : stars >= i - 0.7 ? (
  //         <BsStarHalf />
  //       ) : (
  //         <BsStar />
  //       )}
  //     </span>
  //   );
  //   starArray.push(star);
  // }

  const starIcons = Array.from({ length: 5 }, (x, index) => {
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= index + 0.3 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="stars">
        {/* {starArray} */}
        {starIcons}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
