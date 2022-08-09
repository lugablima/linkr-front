import styled from "styled-components";
import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ThreeDots } from "react-loader-spinner";

export default function SignUp() {
  const API = "http://localhost:5000/sign-up";

  const navigate = useNavigate();

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    username: "",
    pictureURL: "",
  });

  const [isLoading, setIsLoading] = useState(false); //loader spinner state

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(API, signUp);

      setIsLoading(false);

      alert("Success! Your account has been created");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      alert("Oops! something went wrong", error);
    }
  }

  function BuildingSignUpForms() {
    return (
      <>
        <Container>
          <div className="logo-container">
            <h1>Linkr</h1>
            <h2>save, share and discover the best links on the web</h2>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit}></form>
          </div>
        </Container>
      </>
    );
  }

  return <h1>Pagina de Cadastro</h1>;
}
