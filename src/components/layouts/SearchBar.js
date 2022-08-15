/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

export default function SearchBar() {
  const [target, setTarget] = useState("");
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);

  const API = process.env.REACT_APP_API;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    setTarget(e.target.value);
    try {
      const response = await axios.get(`${API}/users/:username`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(response.data);
    } catch (error) {
      setResult([error.response.data.message]);
    }
  };

  return (
    <>
      <OutShow display={show ? "flex" : "none"} onClick={() => setShow(false)} />
      <InputContainer>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          type="text"
          placeholder="Search users..."
          value={target}
          onShow={() => setShow(true)}
          onChange={(e) => handleSearch(e)}
          required
        />
        <List display={show ? "flex" : "none"}>
          {result?.map((user, index) => {
            if (user.post) {
              return (
                <div className="user" key={index}>
                  <p>No results</p>
                </div>
              );
            }
            return (
              <div className="user" onClick={() => navigate(`/users/${user.id}`)} key={index}>
                <img src={user.image} alt={user.username} key={index} />
                <div className="text">
                  <p>{user.username}</p>
                </div>
              </div>
            );
          })}
        </List>
        <SearchIcon>
          <IoIosSearch size={26} fill="#C6C6C6" />
        </SearchIcon>
      </InputContainer>
    </>
  );
}

const OutShow = styled.div`
  display: ${(props) => props.display}!important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
`;

const InputContainer = styled.div`
  position: relative;

  @media (max-width: 750px) {
    position: absolute;
    left: 0;
    top: 72px;
    height: 35px;
    width: 100%;
  }

  input {
    height: 45px;
    width: 100%;
    padding: 0 10px;
    min-width: 563px;

    background: #ffffff;
    border-radius: 8px;
    font: 400 19px "Lato", sans-serif;
    line-height: 23px;
    border: none;

    @media (max-width: 750px) {
      border-radius: 0;
    }
    &:show {
      border: none;
      outline-color: #e7e7e7;
      outline-style: solid;
      outline-width: 1px;
    }
    &::placeholder {
      color: #c6c6c6;
    }
  }
`;
const List = styled.div`
  position: absolute;
  display: ${(props) => props.display} !important;
  flex-direction: column;
  top: 35px;
  left: 5px;
  width: 96%;
  max-height: 300px;
  background-color: #e7e7e7;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 6;
  .user {
    width: 100%;
    height: 55px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    margin: 7px;
    p {
      font: 400 19px "Lato", sans-serif;
      line-height: 23px;
      color: #515151;
    }
    img {
      height: 39px;
      width: 30px;
      border-radius: 85px;
      margin-left: 5px;
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchIcon = styled.div`
  position: absolute;

  right: 0;
  top: 7px;
`;
