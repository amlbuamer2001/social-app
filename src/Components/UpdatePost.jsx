import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UpdatePost({ postId }) {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      body: "",
      image: "",
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
    let formData = new FormData();
    formData.append("body", values.body);
    formData.append("image", values.image[0]);

    try {
      let response = await axios.patch(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (response.data.message === "success") {
        toast.success("post updated successfully");
        setShow(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button
        onClick={showDropdownMenu}
        data-dropdown-toggle="dropdown"
        className="inline-flex items-center justify-center border border-transparent hover:bg-slate-100 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
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
              <a className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-neutral-tertiary-medium hover:text-red-700 rounded">
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
                    {...register("body")}
                    type="text"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="post description"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block mb-2.5 text-center text-2xl font-medium text-heading block"
                  >
                    <i className="fa-solid fa-image fa-2xl"></i>
                  </label>
                  <input
                    {...register("image")}
                    type="file"
                    hidden
                    id="image"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
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
  );
}
