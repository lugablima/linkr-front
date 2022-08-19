/* eslint-disable react/no-unstable-nested-components */
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import HeaderComponent from "../../layouts/HeaderComponent";
import { useUserContext } from "../../../contexts/UserContext";
import Trending from "./TrendingHashtags";
import Post from "./Post";
import InfiniteScroller from "./InfiniteScroller";
import { useInfiniteScrollContext } from "../../../contexts/InfiniteScrollContext";

export default function HashtagPage() {
  const API = process.env.REACT_APP_API;
  const {
    user: { token },
  } = useUserContext();
  const { offset, incrementOffset, stopInfiniteScroll, resetInfiniteScroll } = useInfiniteScrollContext();
  const [hashtagPosts, setHashtagPosts] = useState(null);

  const { hashtag } = useParams();
  const location = useLocation();

  function RenderPosts() {
    if (!hashtagPosts) return <Message>Loading</Message>;
    if (hashtagPosts.length) {
      return hashtagPosts.map((post) => <Post key={post.id} post={post} />);
    }
    return <Message>There are no posts with this hashtag yet</Message>;
  }

  async function getHashtagPosts() {
    try {
      const res = await axios.get(`${API}/hashtag/${hashtag}/${offset}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!hashtagPosts) setHashtagPosts(res.data);
      else setHashtagPosts([...hashtagPosts, ...res.data]);

      incrementOffset();

      if (!res.data.length) stopInfiniteScroll();
    } catch (error) {
      alert("An error occured while trying to fetch the posts, please refresh the page");
    }
  }

  useEffect(() => {
    getHashtagPosts();
  }, []);

  useEffect(() => {
    setHashtagPosts(null);
    resetInfiniteScroll();
  }, [location.pathname]);

  function BuildHashtagPage() {
    return (
      <>
        <HeaderComponent />
        <MiddleContainer>
          <TrendingContainer>
            <Container>
              <h1>#{hashtag}</h1>
              <PostsContainer>
                <InfiniteScroller loadMore={() => getHashtagPosts()}>{RenderPosts()}</InfiniteScroller>
              </PostsContainer>
            </Container>
            <Trending />
          </TrendingContainer>
        </MiddleContainer>
      </>
    );
  }

  const renderHashtagPage = BuildHashtagPage();

  return <MainContainer>{renderHashtagPage}</MainContainer>;
}

const Container = styled.aside`
  width: 100vw;
  max-width: 611px;

  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;

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
