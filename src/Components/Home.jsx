import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../Context/postsContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ImageWithLoader } from "./ImageWithLoader";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import CreateCommentModal from "./CreateCommentModal";
import CreatePost from "./CreatePost";

export default function Home() {
  // const { getAllPosts } = useContext(PostsContext);
  // const [posts, setPosts] = useState([]);

  // async function getPosts() {
  //   try {
  //     let res = await getAllPosts();
  //     console.log(res);
  //     setPosts(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  function getAllPosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    select: (data) => data.data.posts
  });

  console.log(data);
  

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
     <CreatePost/>
      {data?.map((post) => {
        return (
          <div key={post.id} className="w-full md:w-[80%] lg:w-[60%] mx-auto my-8 p-4 rounded-md bg-slate-100">
            <Link to={`/postDetails/${post.id}`}>
            <div className="flex align-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.user.photo || ""}
                  alt={post.user.name}
                  className="size-[40px] rounded-full"
                />
                <p className="font-bold">{post.user.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">{post.createdAt}</p>
              </div>
            </div>
            {post.body && <p className="mb-4">{post.body}</p>}
            {post.image && <ImageWithLoader src={post.image} alt={post.body} />}
          
          <Comments comment={post.comments[0]}/>
         </Link>

         <CreateCommentModal postid={post.id}/>
          </div>
        );
      })}
    </>
  );
}
