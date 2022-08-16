import styled from "styled-components";
import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ThreeDots } from "react-loader-spinner";

export default function SignUp() {
  const API = process.env.REACT_APP_API;

  const navigate = useNavigate();

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    username: "",
    pictureURL: "",
  });

  const [isLoading, setIsLoading] = useState(false); // loader spinner state

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${API}/sign-up`, signUp);

      setIsLoading(false);

      navigate("/");
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 409) {
        alert(error.response.data);
      } else alert("Oops! something went wrong");
    }
  }

  function BuildingSignUpForms() {
    return (
      <>
        <LogoContainer>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </LogoContainer>

        <FormContainer>
          <StyledForm onSubmit={(e) => handleSubmit(e)}>
            <StyledInput
              type="email"
              placeholder="e-mail"
              onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
              value={signUp.email}
              required
            />
            <StyledInput
              type="password"
              placeholder="password"
              onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
              value={signUp.password}
              required
            />
            <StyledInput
              type="text"
              placeholder="username"
              onChange={(e) => setSignUp({ ...signUp, username: e.target.value })}
              value={signUp.username}
              required
            />
            <StyledInput
              type="url"
              placeholder="picture url"
              onChange={(e) => setSignUp({ ...signUp, pictureURL: e.target.value })}
              value={signUp.pictureURL}
              required
            />

            <StyledButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <StyledSpinner>
                  <ThreeDots type="ThreeDots" color="#FFFFFF" height={40} width={40} />
                </StyledSpinner>
              ) : (
                "Sign Up"
              )}
            </StyledButton>

            <Link to="/">
              <h3>Switch back to log in</h3>
            </Link>
          </StyledForm>
        </FormContainer>
      </>
    );
  }

  const signUpForms = BuildingSignUpForms();

  return <Container>{signUpForms}</Container>;
}

const Container = styled.div`
  background-color: #151515;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  margin-right: 535px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    width: 442px;
    font: 700 106px "Passion One", cursive;
    color: #fff;
  }
  h2 {
    max-width: 442px;
    font: 700 43px "Oswald", sans-serif;
    color: #fff;
  }

  @media (max-width: 1000px) {
    h1 {
      width: 237px;
      font-size: 76px;
      text-align: center;
    }
    h2 {
      max-width: 237px;
      font-size: 23px;
    }
  }
`;

const FormContainer = styled.div`
  position: absolute;
  right: 0px;
  height: 100%;
  width: 535px;
  background-color: #333333;

  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    margin-top: 14px;

    font: 400 20px "Lato", sans-serif;
    color: #fff;
    text-decoration: underline;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1000px) {
    position: relative;
    width: 100%;
    align-items: baseline;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  @media (max-width: 1000px) {
    margin-top: 40px;
  }
`;

const StyledInput = styled.input`
  width: 429px;
  height: 65px;
  margin-bottom: 12px;

  border: none;
  border-radius: 6px;
  font: 700 27px "Oswald", sans-serif;
  &::placeholder {
    padding-left: 16px;
  }
  @media (max-width: 1000px) {
    width: 330px;
    height: 55px;
    font-size: 22px;
  }
`;

const StyledButton = styled.button`
  background-color: #1877f2;

  width: 429px;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
  border: none;

  cursor: pointer;

  font: 700 27px "Oswald", sans-serif;
  color: #fff;

  @media (max-width: 1000px) {
    width: 330px;
    height: 55px;
    font-size: 22px;
  }
`;

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 10px;
`;
