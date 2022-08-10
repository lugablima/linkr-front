import styled from "styled-components";
// import { useState } from "react";
// import urlMetadata from "url-metadata";
import stitch from "../../../assets/images/stitch.jpg";
import PublicationCard from "./PublicationCard";

function Post() {
  return (
    <PostContainer>
      <img src={stitch} alt="Usuário" />
      <div>
        <h5>Juvenal Juvêncio</h5>
        <h6>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</h6>
        <LinkContainer>
          <div>
            <h4>Como aplicar o Material UI em um projeto React</h4>
            <h5>
              Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to
              another page.
            </h5>
            <h6>https://medium.com/@pshrmn/a-simple-react-router</h6>
          </div>
          <img src={stitch} alt="Link" />
        </LinkContainer>
      </div>
    </PostContainer>
  );
}

export default function TimelinePage() {
  return (
    <Container>
      <h1>timeline</h1>
      <PublicationCard />
      <Post />
      <Post />
      <Post />
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

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 2px;
  }

  div > h5 {
    font: 400 19px/23px "Lato", sans-serif;
    color: #fff;
    margin-bottom: 7px;
    cursor: pointer;
  }

  div > h6 {
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
    height: 155px;
    border-radius: 0px 12px 13px 0px;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;
