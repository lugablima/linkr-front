import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";

export default function Post({ post: { id, user, link } }) {
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();
  const {
    user: { token },
  } = useUserContext();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function getLikes() {
    axios.get(`${process.env.REACT_APP_API}/likes/${id}`, config).then((res) => {
      setLikes(res.data);
      ReactTooltip.rebuild();
    });
  }

  setTimeout(() => ReactTooltip.rebuild(), [1000]);

  useEffect(() => getLikes(), []);

  const { likesCount, likedByUser } = likes;
  const users = likes.users?.filter((el) => el !== user.name);

  function likePost(e) {
    if (likedByUser && e.detail === 1) {
      axios
        .delete(`${process.env.REACT_APP_API}/likes/${id}`, config)
        .then(() => getLikes())
        .catch(() => {
          alert("Could not unlike this post, please try again later!");
        });
    } else if (!likedByUser && e.detail === 1) {
      axios
        .post(`${process.env.REACT_APP_API}/likes`, { postId: id }, config)
        .then(() => getLikes())
        .catch(() => {
          alert("Could not like this post, please try again later!");
        });
    }
  }

  function RenderLikes() {
    if (likedByUser && users) {
      return (
        <Tooltip>
          You, {users[0]} and other {likesCount >= 2 ? likesCount - 2 : "0"} people
        </Tooltip>
      );
    }
    if (!likedByUser && users) {
      return (
        <Tooltip>
          {users[0]}, {users[1]} and other {likesCount >= 2 ? likesCount - 2 : "0"} people
        </Tooltip>
      );
    }
  }

  const hashtagStyle = {
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  };

  return (
    <Container>
      <LeftSide>
        <img src={user.photo} alt="Usuário" />

        {likedByUser ? <HeartIonIcon onClick={(e) => likePost(e)} /> : <HeartOutlineIonIcon onClick={(e) => likePost(e)} />}

        {likesCount && (
          <Likes data-tip data-for={`${id}`}>
            {likesCount} {likesCount > 1 ? "likes" : "like"}
          </Likes>
        )}

        <ReactTooltip
          id={`${id}`}
          place="bottom"
          type="light"
          effect="solid"
          delayShow={500}
          isCapture
          className="tooltip-container"
          getContent={() => RenderLikes()}
        />
      </LeftSide>
      <RightSide>
        <Username>{user.name}</Username>

        <ReactTagify tagStyle={hashtagStyle} tagClicked={(hashtag) => navigate(`/hashtag/${hashtag.replace("#", "").toLocaleLowerCase()}`)}>
          <LegendLink>{link.legend ? link.legend : ""}</LegendLink>
        </ReactTagify>

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
  display: flex;

  @media (max-width: 767px) {
    max-width: none;
    height: 232px;
    border-radius: 0px;
    padding: 9px 18px 15px 15px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 18px;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    object-position: 50% 50%;
    margin: 0 0 19px 0;
    cursor: pointer;
  }

  .tooltip-container {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    padding: 6px 5px 5px 8px;
  }

  @media (max-width: 767px) {
    margin-right: 14px;

    & > img {
      width: 40px;
      height: 40px;
      margin: 0 0 17px 0;
    }
  }
`;

const HeartIonIcon = styled(IoHeart)`
  width: 20px;
  height: 20px;
  color: #ac0000;
  cursor: pointer;
  margin-bottom: 4.01px;

  @media (max-width: 767px) {
    margin-bottom: 12px;
  }
`;

const HeartOutlineIonIcon = styled(IoHeartOutline)`
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 4.01px;

  @media (max-width: 767px) {
    margin-bottom: 12px;
  }
`;

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2px;

  @media (max-width: 767px) {
    margin-top: 1px;
  }
`;

const Username = styled.h5`
  font: 400 19px/23px "Lato", sans-serif;
  color: #fff;
  margin-bottom: 7px;
  cursor: pointer;

  @media (max-width: 767px) {
    font: 400 17px/20px "Lato", sans-serif;
  }
`;

const LegendLink = styled.h6`
  width: 502px;
  font: 400 17px/20px "Lato", sans-serif;
  color: #b7b7b7;
  margin-bottom: 10px;
  word-break: normal;

  @media (max-width: 767px) {
    width: 100%;
    height: 52px;
    font: 400 15px/18px "Lato", sans-serif;
    margin-bottom: 13px;
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

  & > img {
    width: 153.44px;
    aspect-ratio: 1 / 1;
    border-radius: 0px 12px 13px 0px;
    object-fit: cover;
    object-position: 50% 50%;
  }

  @media (max-width: 767px) {
    max-width: none;
    height: 115px;

    & > img {
      width: 32.98%;
    }
  }
`;

const LinkInfos = styled.div`
  width: calc(100% - 153.44px);
  padding: 24px 27.44px 23px 19.31px;
  overflow: hidden;

  h4 {
    width: 100%;
    height: 38px;
    font: 400 16px/19px "Lato", sans-serif;
    color: #cecece;
    margin-bottom: 5px;
    overflow: hidden;
  }

  h5 {
    width: 100%;
    height: 39px;
    font: 400 11px/13px "Lato", sans-serif;
    color: #9b9595;
    margin-bottom: 13px;
    overflow: hidden;
  }

  h6 {
    width: 100%;
    height: 13px;
    font: 400 11px/13px "Lato", sans-serif;
    color: #cecece;
    overflow: hidden;
  }

  @media (max-width: 767px) {
    width: 67.01%;
    padding: 7px 7px 8px 11px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h4 {
      height: 26px;
      font: 400 11px/13px "Lato", sans-serif;
      margin-bottom: 0px;
    }

    h5 {
      height: 44px;
      font: 400 9px/11px "Lato", sans-serif;
      margin-bottom: 0px;
    }

    h6 {
      height: 22px;
      font: 400 9px/11px "Lato", sans-serif;
    }
  }
`;

const Likes = styled.a`
  width: 50px;
  word-break: break-all;
  word-wrap: normal;
  font: 400 11px/13px "Lato", sans-serif;
  text-align: center;
  color: #fff;

  @media (max-width: 767px) {
    width: 100%;
    font: 400 9px/11px "Lato", sans-serif;
  }
`;

const Tooltip = styled.p`
  font: 700 11px/13px "Lato", sans-serif;
  color: #505050;
  text-align: center;
  word-break: break-all;
  word-wrap: normal;
`;
