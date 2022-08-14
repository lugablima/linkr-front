import { useEffect } from "react";
import styled from "styled-components";
import PublicationCard from "./PublicationCard";
import Post from "./Post";
import { usePostsContext } from "../../../contexts/PostsContext";

export default function TimelinePage() {
  const { posts, setPosts, getPosts } = usePostsContext();

  function RenderPosts() {
    if (!posts) return <Message>Loading</Message>;
    if (posts.length) {
      return posts.map((post) => <Post key={post.id} post={post} />);
    }
    return <Message>There are no posts yet</Message>;
  }

  useEffect(() => {
    getPosts()
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {
        alert("An error occured while trying to fetch the posts, please refresh the page");
      });
  }, []);

  return (
    <Container>
      <h1>timeline</h1>
      <PublicationCard />
      <PostsContainer>{RenderPosts()}</PostsContainer>
    </Container>
  );
}

const Container = styled.div`
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
