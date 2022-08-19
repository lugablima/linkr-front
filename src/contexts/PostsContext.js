import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";

const PostsContext = createContext();

export const usePostsContext = () => useContext(PostsContext);

export default function PostsProvider({ children }) {
  const [posts, setPosts] = useState(null);
  const { user } = useUserContext();

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  async function getNewsPosts() {
    return axios.get(`${process.env.REACT_APP_API}/posts`, config);
  }

  async function getPosts(offset) {
    return axios.get(`${process.env.REACT_APP_API}/posts/${offset}`, config);
  }

  async function createPost(inputs) {
    return axios.post(`${process.env.REACT_APP_API}/posts`, inputs, config);
  }

  async function deletePost(postId) {
    return axios.delete(`${process.env.REACT_APP_API}/posts/${postId}`, config);
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        getNewsPosts,
        getPosts,
        createPost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
