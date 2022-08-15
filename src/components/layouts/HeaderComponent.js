/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";
import SearchBar from "./SearchBar";

export default function HeaderComponent() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Header>
      <Title onClick={() => navigate("/timeline")}>linkr</Title>
      <SearchBar />
      {show && <div className="overlay" onClick={() => setShow(false)} />}
      <div onClick={() => setShow(!show)}>
        {show ? <IoIosArrowUp size={30} fill="#FFFFFF" /> : <IoIosArrowDown size={30} fill="#FFFFFF" />}
        {user && <img src={user.photo} alt={user.username} />}
      </div>

      {show && (
        <div className="dropdown">
          <ul>
            <li onClick={logout}>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 72px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  background: #151515;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;

  svg {
    margin-right: 16px;
  }

  img {
    width: 53px;
    height: 53px;
    border-radius: 26px;
    margin-right: 17px;
  }
  .overlay {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    cursor: inherit;
  }
  div {
    display: flex;
    align-items: center;
    z-index: 3;

    cursor: pointer;
  }
  .dropdown {
    width: 130px;
    position: absolute;
    top: 72px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 15px;
    border-radius: 0px 0px 0px 20px;
    background-color: #171717;
    font: 700 15px "Lato", sans-serif;
    color: #ffffff;

    z-index: 3;
  }
  @media (max-width: 750px) {
    h1 {
      margin-left: 17px;
      font-size: 45px;
    }
    img {
      margin-right: 16px;
      width: 41px;
      height: 41px;
    }
    svg {
      margin-right: 12px;
    }
  }
`;

const Title = styled.h1`
  font: 700 49px "Passion One";
  line-height: 54px;
  letter-spacing: 0.05em;
  color: #ffffff;
  cursor: pointer;

  margin-left: 28px;
`;
