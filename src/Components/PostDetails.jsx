import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { ImageWithLoader } from "./ImageWithLoader";
import { da } from "zod/locales";

export default function PostDetails() {
  let { id } = useParams();
  console.log(id);

  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: getSinglePost,
    select: (data) => data.data.post,
  });

    console.log(data);

  return (
    <div className="w-full md:w-[80%] lg:w-[60%] mx-auto my-8 p-4 rounded-md bg-slate-100">
      <div className="flex align-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={data?.user.photo || ""}
            alt={data?.user.name}
            className="size-[40px] rounded-full"
          />
          <p className="font-bold">{data?.user.name}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">{data?.createdAt}</p>
        </div>
      </div>
      {data?.body && <p className="mb-4">{data?.body}</p>}
      {data?.image && <ImageWithLoader src={data?.image} alt={data?.body} />}

      {/* <Comments comment={data?.comments} /> */}
      {/* <Comments comment={data?.comments} /> */}
      {data?.comments.map((comment) => (
        <Comments comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
