import axios from "axios";
import { createContext } from "react";

export const PostsContext = createContext();

export function PostsContextProvider(props) {
  function getAllPosts() {
    // fetch all posts from the server
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
    .then((res)=>{
      return res.data.posts;
    })
    .catch((err)=>{
      return err;
    })
  }

  return (
    <PostsContext.Provider value={{getAllPosts, PostsContext}}>{props.children}</PostsContext.Provider>
  );
}
