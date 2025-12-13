import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ImageWithLoader } from "./ImageWithLoader";
import Comments from "./Comments";
import CreateCommentModal from "./CreateCommentModal";

export default function UserPosts({ id }) {
  function getUserPosts() {
    return axios.get(
      `https://linked-posts.routemisr.com/users/${id}/posts?limit=2`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }

  let { data } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getUserPosts,
    select: (data) => data?.data?.posts,
  });
  console.log(data);

  return (
    <div className="posts">
      {data?.map((post) => (
        <div key={post.id} className="w-full md:w-[80%] lg:w-[60%] mx-auto my-8 p-4 rounded-md bg-slate-100">
          <div className="flex align-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={post?.user?.photo || ""}
                alt={post?.user?.name}
                className="size-[40px] rounded-full"
              />
              <p className="font-bold">{post?.user?.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">{post?.createdAt}</p>
            </div>
          </div>
          {post?.body && <p className="mb-4">{post.body}</p>}
          {post?.image && <ImageWithLoader src={post?.image} alt={post?.body} />}

          {post?.comments?.length > 0 && <Comments comment={post?.comments[0]} />}
           {/* <Comments comment={post?.comments[0]} /> */}
          <CreateCommentModal postid={post.id} />
        </div>
      ))}
    </div>
  );
}
