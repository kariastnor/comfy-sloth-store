import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

// Need this wrapper to give the private route enough time to load the user

const AuthWrapper = ({ children }) => {
  const { error, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }

  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
