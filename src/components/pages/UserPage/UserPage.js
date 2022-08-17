/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unstable-nested-components */
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

import HeaderComponent from "../../layouts/HeaderComponent";
import { useUserContext } from "../../../contexts/UserContext";
import Trending from "../Timeline/TrendingHashtags";
import Post from "../Timeline/Post";

export default function UserPage() {
  const { id } = useParams();

  const location = useLocation();
  const { username, photo } = location.state;

  const [userPosts, setUserPosts] = useState(null);

  const API = process.env.REACT_APP_API;
  const {
    user: { token },
  } = useUserContext();

  function RenderPosts() {
    if (!userPosts) {
      return <Message>Loading</Message>;
    }
    if (userPosts.length) {
      return userPosts.map((post) => <Post key={post.id} post={post} />);
    }
    return <Message>{username} has no posts yet</Message>;
  }

  useEffect(() => {
    async function getUserPosts() {
      try {
        const response = await axios.get(`${API}/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserPosts(response.data);
      } catch (error) {
        console.log(error);
        // alert("An error occured while trying to fetch the posts, please refresh the page");
      }
    }

    getUserPosts();
  }, [id]);

  function BuildUserPage() {
    return (
      <>
        <HeaderComponent />
        <MiddleContainer>
          <TrendingContainer>
            <Container>
              <span>
                <img src={photo} alt={username} /> <h1> {username}'s posts</h1>
              </span>
              <PostsContainer>{RenderPosts()}</PostsContainer>
            </Container>
            <Trending />
          </TrendingContainer>
        </MiddleContainer>
      </>
    );
  }

  const renderUserPage = BuildUserPage();

  return <MainContainer>{renderUserPage}</MainContainer>;
}

const Container = styled.aside`
  width: 100vw;
  max-width: 611px;

  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;

  & > span {
    display: flex;
    flex-direction: row;
  }

  & > span > img {
    border-radius: 26px;
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }

  h1 {
    font: 700 43px/64px "Oswald", sans-serif;
    color: #fff;
    margin-bottom: 43px;
    align-self: flex-start;
  }

  @media (max-width: 767px) {
    width: 100%;
    max-width: none;
    margin-top: 91px;

    & > h1 {
      font: 700 33px/49px "Oswald", sans-serif;
      margin: 0 0 19px 17px;
    }
  }
`;

const PostsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding-bottom: 78px;

  @media (max-width: 767px) {
    padding-bottom: 19px;
  }
`;

const Message = styled.p`
  font: 400 19px/23px "Lato", sans-serif;
  text-align: center;
  color: #fff;

  @media (max-width: 767px) {
    font: 400 17px/20px "Lato", sans-serif;
  }
`;

const MainContainer = styled.div`
  width: 100%;

  margin: auto;
`;

const TrendingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MiddleContainer = styled.div`
  max-width: 940px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
