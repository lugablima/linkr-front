import { createContext, useContext, useState } from "react";
import axios from "axios";

const PostsContext = createContext();

export const usePostsContext = () => useContext(PostsContext);

export default function PostsProvider({ children }) {
  const [posts, setPosts] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2MDE4NjY0NCwiZXhwIjoxNjYxNDgyNjQ0fQ.kUTv9_jZnUE8svemlsjWibFcm2_HafwX_ugbXcNIo3c`,
    },
  };

  async function getPosts() {
    return axios.get(`${process.env.REACT_APP_API}/posts`, config);
  }

  async function createPost(inputs) {
    return axios.post(`${process.env.REACT_APP_API}/posts`, inputs, config);
  }
  return <PostsContext.Provider value={{ posts, setPosts, getPosts, createPost }}>{children}</PostsContext.Provider>;
}
