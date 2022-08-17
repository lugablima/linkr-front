/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import styled from "styled-components";
import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import { usePostsContext } from "../../../contexts/PostsContext";

export default function Trending() {
  const [hashtags, setHashtags] = useState([]);
  const API = process.env.REACT_APP_API;
  const {
    user: { token },
  } = useUserContext();
  const { posts } = usePostsContext();

  const navigate = useNavigate();

  const getTrending = async () => {
    try {
      const response = await axios.get(`${API}/trending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHashtags(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
  }, [posts]);

  return (
    <Container>
      <h2>trending</h2>
      <HashtagsContainer>
        <ul>
          {hashtags
            ? hashtags.map((hashtag) => (
                <li
                  key={hashtag.id}
                  onClick={() => {
                    navigate(`/hashtag/${hashtag.name}`);
                  }}
                >
                  #{hashtag.name}
                </li>
              ))
            : "Loading..."}
        </ul>
      </HashtagsContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 32%;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 150px;
  padding: 9px 16px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  h2 {
    font: 700 27px "Oswald", sans-serif;
    color: #fff;
    padding-bottom: 12px;
    border-bottom: 1px solid #484848;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const HashtagsContainer = styled.div`
  ul {
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    font: 700 19px "Lato", sans-serif;
    color: #ffffff;
  }
  ul li {
    margin-bottom: 12px;
    cursor: pointer;
  }
`;
