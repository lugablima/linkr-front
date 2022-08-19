import styled from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Comment from "./Comment";
import { useUserContext } from "../../contexts/UserContext";

function CommentBar({ inputComment, setInputComment, commentPost }) {
  const {
    user: { name, photo },
  } = useUserContext();

  return (
    <CommentBarContainer>
      <img src={photo} alt={name} />
      <InputContainer onSubmit={(e) => commentPost(e)}>
        <input
          type="text"
          placeholder="write a comment..."
          onChange={(e) => setInputComment(e.target.value)}
          value={inputComment}
          required
        />
        <Button type="submit">
          <SendIonIcon />
        </Button>
      </InputContainer>
    </CommentBarContainer>
  );
}

export default function ListOfComments({ comments: { comments }, inputComment, setInputComment, commentPost }) {
  return (
    <Container>
      {comments && comments.map((comment) => <Comment key={Math.random() - comment.id} comment={comment} />)}
      <CommentBar inputComment={inputComment} setInputComment={setInputComment} commentPost={commentPost} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: #1e1e1e;
  border-radius: 16px;
  margin-bottom: 44px;
  display: flex;
  flex-direction: column;
`;

const CommentBarContainer = styled.div`
  width: 100%;
  height: 83px;
  padding: 19px 23px 25px 25px;
  display: flex;

  & > img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    margin-right: 14px;
  }
`;

const InputContainer = styled.form`
  width: 100%;
  max-width: 510px;
  height: 39px;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    background: #252525;
    border-radius: 8px;
    border: none;
    outline: none;
    padding: 11px 32px 11px 15px;
    font: 400 14px/17px "Lato", sans-serif;
    color: #575757;
  }

  input::placeholder {
    font-style: italic;
  }
`;

const Button = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  position: absolute;
  top: 11.47px;
  right: 14px;
`;

const SendIonIcon = styled(IoPaperPlaneOutline)`
  width: 16px;
  height: 16px;
  color: #f3f3f3;
`;
