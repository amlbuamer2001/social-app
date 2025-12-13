import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

export default function CreatePost() {

const form= useForm({
    defaultValues:{
        body:"",
        image:""
    }
})

let {register, handleSubmit}=form;


function handleAddPost(values){
    console.log(values.body);
    console.log(values.image[0]);
    let formData= new FormData();
    formData.append("body", values.body);
    formData.append("image", values.image[0]);


    axios.post(`https://linked-posts.routemisr.com/posts`, formData, {
        headers:{
            token: localStorage.getItem("userToken")        }
    }).then((res)=>{
        if(res.data.message==='success'){
            toast.success("post added successfully");
        }
    }).catch((err)=>{
        toast.error(err);
    })
}

  return (
    <div className='w-full md:w-[60%] lg:w-[80%] mx-auto my-12 p-4 bg-slate-200 rounded-lg'>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <div>
            <label htmlFor="body">

            </label>
            <input {...register("body")} type="text" placeholder='what do you think?' className='w-full border-4 border-slate-400 rounded-lg'/>
        </div>
        <div>
        <label htmlFor="photo" className='bg-red-400 block my-4 text-center cursor-pointer'>
            <i className='fa-solid fa-image fa-2xl'></i>
        </label>
        <input {...register("image")} id='photo' type="file" className='hidden' />
        </div>
        <div>
            <button className='bg-blue-600 text-white p-2 w-full rounded-lg cursor-pointer'>add post</button>
        </div>
      </form>
    </div>
  )
}
