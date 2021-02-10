import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/starter-image.jpg";
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="user login / signup" />
        <h4>Login below to search Github user's</h4>
        <button className="btn" onClick={loginWithRedirect}>
         login / signup
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 50%;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h4 {
    margin-bottom: 1rem;
    font-weight:normal;
  }
`;
export default Login;
