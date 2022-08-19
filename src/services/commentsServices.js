import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

const {
  user: { token },
} = useUserContext();

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function getCommentsByPostId(postId) {
  return axios.get(`${process.env.REACT_APP_API}/comments/${postId}`, config);
}

function insertComment(postId, comment) {
  return axios.post(`${process.env.REACT_APP_API}/comments`, { postId, comment }, config);
}

export default {
  getCommentsByPostId,
  insertComment,
};
