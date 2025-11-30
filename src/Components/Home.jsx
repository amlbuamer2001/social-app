import { useContext, useEffect } from "react";
import { PostContext } from "../Context/postsContext";

export default function Home() {
let {getPosts} = useContext(PostContext);


  useEffect(()=>{
    console.log('home');
    
     getPosts()
  }, []);
  

  return (
    <>
      hhhhhhh
    </>
  )
}
