
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Comments from './Comments';
export default function UpdateComment({commentId}) {
    const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  let queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      content: "",
    },
  });

  function showModal() {
    setShow(true);
  }

  function showDropdownMenu() {
    setShowDropdown(!showDropdown);
  }

  async function handleUpdatePost(values) {
    console.log(values);
    try {
      let response = await axios.put(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        values,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      if (response.data.message === "success") {
        toast.success("post updated successfully");
        setShow(false);
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      }
    } catch (error) {
      toast.error(error.message);
    }

  }

  function deletePost(CommentId) {
    axios
      .delete(`https://linked-posts.routemisr.com/comments/${CommentId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        if (response.data.message === "success") {
            setShow(false);
          toast.success("post deleted successfully");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }


  return (
    <>
      <button
        onClick={showDropdownMenu}
        data-dropdown-toggle="dropdown"
        className="relative cursor-pointer inline-flex items-center justify-center border border-transparent hover:bg-slate-100 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        type="button"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>

      {showDropdown && (
        <div
          id="dropdown"
          className="z-10 absolute bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
        >
          <ul
            className="p-2 text-sm text-body font-medium"
            aria-labelledby="dropdownDefaultButton"
          >
            <li></li>
            <li>
              <a
                onClick={showModal}
                className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-neutral-tertiary-medium hover:text-blue-900 rounded"
              >
                edit
              </a>
            </li>
            <li>
              <a
                onClick={() => deletePost(commentId)}
                className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-neutral-tertiary-medium hover:text-red-700 rounded"
              >
                delete
              </a>
            </li>
          </ul>
        </div>
      )}

      {show && (
        <div
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative m-auto p-4 w-full max-w-md max-h-full">
            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <button
                  onClick={() => setShow(false)}
                  type="button"
                  className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="updatePost-modal"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <form
                onSubmit={handleSubmit(handleUpdatePost)}
                className="pt-4 md:pt-6"
              >
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    add text
                  </label>
                  <input
                    {...register("content")}
                    type="text"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="post description"
                  />
                </div>

          

                <button
                  type="submit"
                  className="text-white mx-auto w-[100%] bg-brand border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 mx-auto cursor-pointer focus:outline-none  mb-3"
                >
                  confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
