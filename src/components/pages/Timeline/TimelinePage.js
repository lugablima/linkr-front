import { useEffect } from "react";
import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import PublicationCard from "./PublicationCard";
import { usePostsContext } from "../../../contexts/PostsContext";

import HeaderComponent from "../../layouts/HeaderComponent";
import Trending from "./TrendingHashtags";

function Post({ post: { user, link } }) {
  const navigate = useNavigate();

  const hashtagStyle = {
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  };

  return (
    <PostContainer>
      <img src={user.photo} alt="Usuário" />
      <RightSide>
        <h5>{user.name}</h5>
        <h6>{link.legend}</h6>
        <a href={link.url} target="_blank" rel="noreferrer">
          <LinkContainer>
            <div>
              <h4>{link.title ? link.title : "Clique no snippet para conferir este link!"}</h4>

              <ReactTagify>
                tagStyle={hashtagStyle}
                tagClicked={(hashtag) => navigate(`/hashtag/${hashtag.replace("#", "")}`)}
                <h5>{link.description ? link.description : "Esse link parece ser legal, clique no snippet para conferir!"}</h5>
              </ReactTagify>

              <h6>{link.url}</h6>
            </div>
            <img src={link.image ? link.image : "#"} alt="Link" />
          </LinkContainer>
        </a>
      </RightSide>
    </PostContainer>
  );
}

export default function TimelinePage() {
  const { posts, setPosts, getPosts } = usePostsContext();

  useEffect(() => {
    getPosts()
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {
        // alert("An error occured while trying to fetch the posts, please refresh the page");
      });
  }, []);

  return (
    <MainContainer>
      <HeaderComponent />
      <MiddleContainer>
        <TrendingContainer>
          <Container>
            <h1>timeline</h1>
            <PublicationCard />
            {/* eslint-disable-next-line no-nested-ternary */}
            {!posts ? (
              <Message>Loading</Message>
            ) : posts.length ? (
              posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
              <Message>There are no posts yet</Message>
            )}
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
  margin: 150px 0 10px;

  & > h1 {
    font: 700 43px/64px "Oswald", sans-serif;
    color: #fff;
    margin-bottom: 43px;
    align-self: flex-start;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  max-width: 611px;
  height: 276px;
  background: #171717;
  border-radius: 16px;
  padding: 17px 21px 20px 18px;
  margin-bottom: 16px;
  display: flex;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    object-position: 50% 50%;
    margin-right: 18px;
    cursor: pointer;
  }
`;

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2px;

  & > h5 {
    font: 400 19px/23px "Lato", sans-serif;
    color: #fff;
    margin-bottom: 7px;
    cursor: pointer;
  }

  & > h6 {
    width: 502px;
    font: 400 17px/20px "Lato", sans-serif;
    color: #b7b7b7;
    margin-bottom: 10px;
    word-break: normal;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  max-width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  background: transparent;
  word-break: normal;
  text-align: left;
  cursor: pointer;
  display: flex;

  & > div {
    width: calc(100% - 153.44px);
    padding: 24px 27.44px 23px 19.31px;
  }

  div > h4 {
    width: 249.98px;
    font: 400 16px/19px "Lato", sans-serif;
    color: #cecece;
    margin-bottom: 5px;
  }

  div > h5 {
    width: 302.82px;
    font: 400 11px/13px "Lato", sans-serif;
    color: #9b9595;
    margin-bottom: 13px;
  }

  div > h6 {
    width: 263.19px;
    font: 400 11px/13px "Lato", sans-serif;
    color: #cecece;
  }

  & > img {
    width: 153.44px;
    /* height: 155px; */
    border-radius: 0px 12px 13px 0px;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const Message = styled.p`
  font: 400 19px/23px "Lato", sans-serif;
  color: #fff;
  justify-content: center;
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
