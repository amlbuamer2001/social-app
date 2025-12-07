import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import UserPosts from './UserPosts'
import ChangePasswordModal from './ChangePasswordModal'

export default function Profile() {

function getLoggedUser() {
  return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
    headers:{
      token: localStorage.getItem("userToken")
    }
  })
}


let {data, isLoading, isError, error} = useQuery({
  queryKey:['getLoggedUser'],
  queryFn: getLoggedUser,
  select: (data)=> data?.data?.user
})

console.log(data);


  return (
    <>
    <div className='w-full md:w-[80%] lg:w-[60%] mx-auto text-center border-2 border-slate-800 rounded-lg p-4'>
      <img src={data?.photo} className='size-[50px] mx-auto' alt="" />
    <h6>Name: {data?.name}</h6>
    <h6>Email: {data?.email}</h6>
    <h6>gender: {data?.gender}</h6>
    <h6>date of birth: {data?.dateOfBirth}</h6>
    </div>

    <div className='w-full md:w-[80%] lg:w-[60%] mx-auto text-center  p-4'>
<ChangePasswordModal/>
</div>



    <UserPosts id={data?._id}/>
    </>
  )
}
