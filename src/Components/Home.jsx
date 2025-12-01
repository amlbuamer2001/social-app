import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../Context/postsContext";

export default function Home() {
  const { getAllPosts } = useContext(PostsContext);
  const [posts, setPosts] = useState([]);
  async function getPosts() {
    try {
      let res = await getAllPosts();
      console.log(res);
      setPosts(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);
  return <>
{posts.map((post)=>{
  return(
    <div key={post.id} className="w-full md:w-[80%] lg:w-[60%] mx-auto my-8 p-4 rounded-md bg-slate-100">
      <div className="flex align-center justify-between">
        <div className="flex items-center gap-3 mb-4">
          <img src={post.user.photo} alt={post.user.name} className="size-[40px] rounded-full" />
          <p className="font-bold">{post.user.name}</p>
        </div>
        <div>
          <p>{post.createdAt}</p>
        </div>
      </div>
      <h2 className="mb-4">
        {post.body}
      </h2>
      <img src={post.image} alt={post.body} className="w-full rounded-md" />
    </div>
  )
})}
  </>;
}
