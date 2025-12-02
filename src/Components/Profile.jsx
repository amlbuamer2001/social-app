import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function Profile() {

// function getLoggedUser() {
//   return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
//     headers:{
//       token: localStorage.getItem("userToken")
//     }
//   })
// }


let {data, isLoading, isError, error} = useQuery({
  queryKey:['userData'],
  queryFn: ()=> axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
    headers:{
      token: localStorage.getItem("userToken")
    }
  }),
  select: (data)=> data?.data?.user
})

console.log(data);


  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}
