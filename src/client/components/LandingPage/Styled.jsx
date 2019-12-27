import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactSocialLogin from "react-social-login";
import { Link } from "react-router-dom";
import introImage from "../../../assets/images/background1.jpg";

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: black;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 1rem;
  margin: 1rem;
  border-radius: 5px;
`;

export const Quote = styled.div`
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1.5rem;
  margin: 1rem;
  margin-top: 0;
  line-height: 1.8;
  max-width: 500px;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: url(${introImage});
  background-size: cover;
  background-position: center;
`;

export const SubContainerStart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
`;

const StyledButton = styled.div`
  cursor: pointer;
  width: 8rem;
  height: 2.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.4rem;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  background: ${props => {
    if (props.title === "구글") return "rgb(219, 50, 54)";
    else return "#333";
  }};
`;

export const GuestButton = StyledButton.withComponent(Link);

const Button = ({ children, triggerLogin }) => (
  <StyledButton onClick={triggerLogin} title={children}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.any.isRequired,
  triggerLogin: PropTypes.func.isRequired
};

export const SocialButton = ReactSocialLogin(Button);
