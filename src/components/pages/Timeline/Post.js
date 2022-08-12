import { useState } from "react";
import styled from "styled-components";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import axios from "axios";

export default function Post({ post: { id, user, link } }) {
  const [liked, setLiked] = useState(false);

  function likePost(e) {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2MDE4NjY0NCwiZXhwIjoxNjYxNDgyNjQ0fQ.kUTv9_jZnUE8svemlsjWibFcm2_HafwX_ugbXcNIo3c`,
      },
    };

    if (liked && e.detail === 1) {
      setLiked(false);
      axios.delete(`${process.env.REACT_APP_API}/likes/${id}`, config).catch(() => {
        alert("Could not unlike this post, please try again later!");
        setLiked(true);
      });
    } else if (!liked && e.detail === 1) {
      setLiked(true);
      axios.post(`${process.env.REACT_APP_API}/likes`, { postId: id }, config).catch(() => {
        alert("Could not like this post, please try again later!");
        setLiked(false);
      });
    }
  }

  return (
    <Container>
      <LeftSide>
        <img src={user.photo} alt="Usuário" />

        {liked ? (
          <IoHeart
            style={{ width: "20px", height: "20px", color: "#AC0000", cursor: "pointer", margin: "0 0 4.01px 15px" }}
            onClick={(e) => likePost(e)}
          />
        ) : (
          <IoHeartOutline
            style={{ width: "20px", height: "20px", color: "#fff", cursor: "pointer", margin: "0 0 4.01px 15px" }}
            onClick={(e) => likePost(e)}
          />
        )}

        <Likes>14 likes</Likes>
      </LeftSide>
      <RightSide>
        <Username>{user.name}</Username>
        <LegendLink>{link.legend}</LegendLink>
        <a href={link.url} target="_blank" rel="noreferrer">
          <LinkContainer>
            <LinkInfos>
              <h4>{link.title ? link.title : "Clique no snippet para conferir este link!"}</h4>
              <h5>{link.description ? link.description : "Esse link parece ser legal, clique no snippet para conferir!"}</h5>
              <h6>{link.url}</h6>
            </LinkInfos>
            <img src={link.image ? link.image : "#"} alt="Link" />
          </LinkContainer>
        </a>
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 611px;
  height: 276px;
  background: #171717;
  border-radius: 16px;
  padding: 17px 21px 20px 18px;
  margin-bottom: 16px;
  display: flex;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    object-position: 50% 50%;
    margin: 0 18px 19px 0;
    cursor: pointer;
  }
`;

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2px;
`;

const Username = styled.h5`
  font: 400 19px/23px "Lato", sans-serif;
  color: #fff;
  margin-bottom: 7px;
  cursor: pointer;
`;

const LegendLink = styled.h6`
  width: 502px;
  font: 400 17px/20px "Lato", sans-serif;
  color: #b7b7b7;
  margin-bottom: 10px;
  word-break: normal;
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

  & > img {
    width: 153.44px;
    /* height: 155px; */
    border-radius: 0px 12px 13px 0px;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const LinkInfos = styled.div`
  width: calc(100% - 153.44px);
  padding: 24px 27.44px 23px 19.31px;

  h4 {
    width: 249.98px;
    font: 400 16px/19px "Lato", sans-serif;
    color: #cecece;
    margin-bottom: 5px;
  }

  h5 {
    width: 302.82px;
    font: 400 11px/13px "Lato", sans-serif;
    color: #9b9595;
    margin-bottom: 13px;
  }

  h6 {
    width: 263.19px;
    font: 400 11px/13px "Lato", sans-serif;
    color: #cecece;
  }
`;

const Likes = styled.p`
  width: 50px;
  word-break: break-all;
  word-wrap: normal;
  font: 400 11px/13px "Lato", sans-serif;
  text-align: center;
  color: #fff;
`;
