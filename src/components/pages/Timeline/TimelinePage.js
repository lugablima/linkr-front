import { useEffect } from "react";
import styled from "styled-components";
import PublicationCard from "./PublicationCard";
import Post from "./Post";
import { usePostsContext } from "../../../contexts/PostsContext";

export default function TimelinePage() {
  const { posts, setPosts, getPosts } = usePostsContext();

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
      {/* eslint-disable-next-line no-nested-ternary */}
      {!posts ? (
        <Message>Loading</Message>
      ) : posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <Message>There are no posts yet</Message>
      )}
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
  margin: 150px 0 10px;

  & > h1 {
    font: 700 43px/64px "Oswald", sans-serif;
    color: #fff;
    margin-bottom: 43px;
    align-self: flex-start;
  }
`;

const Message = styled.p`
  font: 400 19px/23px "Lato", sans-serif;
  color: #fff;
  justify-content: center;
`;
