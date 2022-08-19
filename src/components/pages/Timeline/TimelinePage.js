/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

import PublicationCard from "./PublicationCard";
import Post from "./Post";
import { usePostsContext } from "../../../contexts/PostsContext";
import { useInfiniteScrollContext } from "../../../contexts/InfiniteScrollContext";

import { useUserContext } from "../../../contexts/UserContext";
import Trending from "./TrendingHashtags";
import HeaderComponent from "../../layouts/HeaderComponent";
import InfiniteScroller from "./InfiniteScroller";

export default function TimelinePage() {
  const { posts, setPosts, getPosts } = usePostsContext();
  const { offset, incrementOffset, stopInfiniteScroll, resetInfiniteScroll } = useInfiniteScrollContext();
  const [following, setFollowing] = useState(null);

  const API = process.env.REACT_APP_API;

  const {
    user: { token },
  } = useUserContext();

  const location = useLocation();

  function RenderPosts() {
    if (!posts) {
      return <Message>Loading</Message>;
    }
    if (posts.length && following) {
      return posts.map((post) => <Post key={Math.random() - post.id} post={post} />);
    }
    return <Message>No posts found from your friends</Message>;
  }

  async function checkFollowing() {
    try {
      await axios
        .post(
          `${API}/follow`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
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

  async function getAllPosts() {
    try {
      const res = await getPosts(offset);

      if (!posts) setPosts(res.data);
      else setPosts([...posts, ...res.data]);

      incrementOffset();

      if (!res.data.length) stopInfiniteScroll();
    } catch (error) {
      alert("An error occured while trying to fetch the posts, please refresh the page");
    }
  }

  useEffect(() => {
    checkFollowing();
    getAllPosts();
  }, []);

  useEffect(() => {
    setPosts(null);
    resetInfiniteScroll();
  }, [location.pathname]);

  return (
    <MainContainer>
      <HeaderComponent />
      <MiddleContainer>
        <TrendingContainer>
          <Container>
            <h1>timeline</h1>
            <PublicationCard />
            <PostsContainer>
              <InfiniteScroller loadMore={() => getAllPosts()}>{RenderPosts()}</InfiniteScroller>
            </PostsContainer>
          </Container>
          <Trending />
        </TrendingContainer>
      </MiddleContainer>
    </MainContainer>
  );
}

const Container = styled.aside`
  width: 100vw;
  max-width: 611px;

  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  & > h1 {
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
  flex-direction: column; */
  /* row-gap: 16px; */
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
