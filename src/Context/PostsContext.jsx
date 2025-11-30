import axios from "axios";
import { createContext, useEffect } from "react";

export const PostContext = createContext();

export function PostContextProvider(props) {
  function getPosts() {
    //  ?limit=50 called params
    axios
      .get(`https://linked-posts.routemisr.com/posts?limit=50`, {
        //configuration object
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })

      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <PostContext.Provider value={{ getPosts }}>
      {props.children}
    </PostContext.Provider>
  );
}
