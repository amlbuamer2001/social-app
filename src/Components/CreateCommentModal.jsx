import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { tokens } from './../../node_modules/@tanstack/query-devtools/src/theme';
import toast from 'react-hot-toast';

export default function CreateCommentModal({postid}) {
   const [show,setShow] = useState(false);
   

   const {register,handleSubmit} = useForm({
    defaultValues:{
        content:'',
        post:postid
    }
})

   function showModal(){
    setShow(true)
   }

   async function addComment(value){
    try {
        let res= await axios.post(`https://linked-posts.routemisr.com/comments`,value,{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    setShow(false);
    toast.success('comment added successfully');
    } catch (error) {
        console.log(error);
        toast.error('Failed to add comment. Please try again.');
    }

   }

  return (
    <>
      <button 
      onClick={showModal}
        data-modal-target="authentication-modal" 
        data-modal-toggle="authentication-modal" 
        className="text-dark focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer border mt-4" 
        type="button"
      >
        Add Comment
      </button>

     {show&& <div 
        id="authentication-modal" 
        tabIndex={-1} 
        aria-hidden="true" 
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative m-auto p-4 w-full max-w-md max-h-full">
          <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
              <button 
              onClick={()=>setShow(false)}
                type="button" 
                className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" 
                data-modal-hide="authentication-modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit(addComment)} className="pt-4 md:pt-6">
              <div className="mb-4">
                <label htmlFor="comment" className="block mb-2.5 text-sm font-medium text-heading">
                  Your comment
                </label>
                <input 
                {...register('content')}
                  type="text" 
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                  placeholder="Enter your comment" 
                />
              </div>

              <div className='mb-4'>
                <label htmlFor="postid" className="block mb-2.5 text-sm font-medium text-heading">
                  Your password
                </label>
                <input 
                {...register('post')}
                value={postid}
                  type="hidden" 
                  id='postid'
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                />
              </div>

              <button 
                type="submit" 
                className="text-white bg-brand border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 mx-auto cursor-pointer focus:outline-none  mb-3"
              >
                add comment
              </button>

            </form>

          </div>
        </div>
      </div> }
    </>
  )
}
