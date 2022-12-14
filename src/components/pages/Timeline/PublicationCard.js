/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsContext } from "../../../contexts/PostsContext";
import { useUserContext } from "../../../contexts/UserContext";

export default function PublicationCard() {
  const [inputs, setInputs] = useState({ link: "", description: "" });
  const [isDisabled, setIsDisabled] = useState(false);
  const { createPost } = usePostsContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!inputs.link) return;

    setIsDisabled(true);

    try {
      await createPost(inputs);

      setIsDisabled(false);
      setInputs({ link: "", description: "" });

      // const res = await getPosts();
      // setPosts(res.data);
    } catch (error) {
      alert("Houve um erro ao publicar seu link");
      setIsDisabled(false);
    }
  }

  return (
    <PublicationCardContainer>
      <img
        src={user.photo}
        alt={user.name}
        onClick={() => navigate(`/user/${user.id}`, { state: { username: user.name, photo: user.photo } })}
      />
      <form onSubmit={(e) => handleSubmit(e)}>
        <h6>What are you going to share today?</h6>
        <input
          type="url"
          placeholder="http://..."
          value={inputs.link}
          onChange={(e) => setInputs({ ...inputs, link: e.target.value })}
          disabled={isDisabled}
          required
        />
        <textarea
          name="description"
          placeholder="Awesome article about #javascript"
          value={inputs.description}
          onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
          disabled={isDisabled}
        />
        <button type="submit" disabled={isDisabled}>
          {isDisabled ? "Publishing..." : "Publish"}
        </button>
      </form>
    </PublicationCardContainer>
  );
}

const PublicationCardContainer = styled.div`
  width: 100%;
  min-height: 209px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 16px 22px 16px 18px;
  margin-bottom: 29px;
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

  & > form {
    width: 100%;
    position: relative;
  }

  h6 {
    font: 300 20px/24px "Lato", sans-serif;
    text-align: left;
    color: #707070;
    margin: 5px 0 9px;
  }

  input,
  textarea {
    width: 100%;
    max-width: 503px;
    background: #efefef;
    border-radius: 5px;
    margin-bottom: 5px;
    outline: none;
    border: none;
    font: 300 15px/18px "Lato", sans-serif;
    color: #000;
  }

  input:focus,
  textarea:focus {
    border: 1px solid #000;
  }

  input::placeholder,
  textarea::placeholder {
    color: #949494;
  }

  input[type="url"] {
    height: 30px;
    padding: 5px 13px 7px;
  }

  textarea {
    height: 66px;
    padding: 8px 12px;
    resize: none;
  }

  button {
    width: 112px;
    height: 31px;
    border: none;
    padding: 0;
    border-radius: 5px;
    background: #1877f2;
    font: 700 14px/17px "Lato", sans-serif;
    color: #fff;
    cursor: pointer;
    position: absolute;
    bottom: 0px;
    right: 0px;
  }

  button:disabled {
    cursor: auto;
  }

  @media (max-width: 767px) {
    min-height: 164px;
    border-radius: 0px;
    padding: 10px 15px 12px;
    margin-bottom: 16px;

    & > img {
      display: none;
    }

    h6 {
      width: 100%;
      font: 300 17px/20px "Lato", sans-serif;
      text-align: center;
      margin: 0 auto 9px;
      word-break: break-all;
      word-wrap: normal;
    }

    input,
    textarea {
      max-width: none;
      font: 300 13px/16px "Lato", sans-serif;
    }

    input[type="url"] {
      padding: 6px 11px 8px;
    }

    textarea {
      height: 47px;
      padding: 10px;
    }

    button {
      height: 22px;
    }
  }
`;
