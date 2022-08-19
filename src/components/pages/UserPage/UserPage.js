/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unstable-nested-components */
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

import HeaderComponent from "../../layouts/HeaderComponent";
import { useUserContext } from "../../../contexts/UserContext";
import { useInfiniteScrollContext } from "../../../contexts/InfiniteScrollContext";
import Trending from "../Timeline/TrendingHashtags";
import Post from "../Timeline/Post";
import InfiniteScroller from "../Timeline/InfiniteScroller";

export default function UserPage() {
  const { offset, incrementOffset, stopInfiniteScroll, resetInfiniteScroll } = useInfiniteScrollContext();

  const { id } = useParams();

  const location = useLocation();
  const { username, photo } = location.state;

  const [userPosts, setUserPosts] = useState(null);
  const [following, setFollowing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  async function checkFollowing() {
    try {
      await axios
        .post(`${API}/following`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data === true) {
            return setFollowing(true);
          }
          return setFollowing(false);
        });
    } catch (error) {
      console.log("Error while trying to check following", error);
    }
  }

  async function getUserPosts() {
    try {
      const res = await axios.get(`${API}/posts/${id}/${offset}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!userPosts) setUserPosts(res.data);
      else setUserPosts([...userPosts, ...res.data]);

      incrementOffset();

      if (!res.data.length) stopInfiniteScroll();
    } catch (error) {
      console.log(error);
      // alert("An error occured while trying to fetch the posts, please refresh the page");
    }
  }

  useEffect(() => {
    checkFollowing();
    getUserPosts();
  }, []);

  useEffect(() => {
    setUserPosts(null);
    resetInfiniteScroll();
  }, [location.pathname]);

  async function Follow() {
    setIsLoading(true);
    try {
      await axios.post(
        `${API}/follows/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsLoading(false);
      setFollowing(true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Error while trying to follow");
    }
  }

  async function Unfollow() {
    setIsLoading(true);
    try {
      await axios.delete(`${API}/follows/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsLoading(false);
      setFollowing(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Error while trying to unfollow");
    }
  }

  function BuildUserPage() {
    return (
      <>
        <HeaderComponent />
        <MiddleContainer>
          <TrendingContainer>
            <Container>
              <div className="timeline">
                <img src={photo} alt={username} /> <h1> {username}'s posts</h1>
                {following ? (
                  <UnFollowButton disabled={isLoading} onClick={Unfollow}>
                    {isLoading ? (
                      <StyledSpinner>
                        <ThreeDots type="ThreeDots" color="#FFFFFF" height={40} width={40} />
                      </StyledSpinner>
                    ) : (
                      "Unfollow"
                    )}
                  </UnFollowButton>
                ) : (
                  <FollowButton disabled={isLoading} onClick={Follow}>
                    {isLoading ? (
                      <StyledSpinner>
                        <ThreeDots type="ThreeDots" color="#FFFFFF" height={40} width={40} />
                      </StyledSpinner>
                    ) : (
                      "Follow"
                    )}
                  </FollowButton>
                )}
              </div>
              <PostsContainer>{RenderPosts()}</PostsContainer>

              <PostsContainer>
                <InfiniteScroller loadMore={() => getUserPosts()}>{RenderPosts()}</InfiniteScroller>
              </PostsContainer>
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
  margin-top: 50px;
  & > .timeline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  & > .timeline > img {
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
  /* display: flex;
  flex-direction: column;
  row-gap: 16px; */
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

const UnFollowButton = styled.button`
  width: 112px;
  height: 31px;
  background-color: #ffffff;
  border-radius: 5px;
  color: #1877f2;
  font: 400 14px "Lato", sans-serif;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;

const FollowButton = styled.button`
  width: 112px;
  height: 31px;
  background-color: #1877f2;
  border-radius: 5px;
  color: #ffffff;
  font: 400 14px "Lato", sans-serif;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
