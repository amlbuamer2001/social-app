import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useParams } from "react-router-dom";

export default function UserPosts() {

   function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=2`,{
        headers:{
            token:localStorage.getItem("userToken")
        }
    });
}

let {data}=useQuery({
    queryKey:['getPosts'],
    queryFn: getUserPosts,
    select: (data)=> data?.data?.posts
})
console.log(data);



  return (
  <div className="posts">


  </div>)
}
