import React, { useState, useEffect } from "react";
import { postComment } from "../../apis/podcasts";
import { podcastStore } from "../../store/index";
function CommentsForm({ id }) {
  const initialize = {
    email: "",
    name: "",
    message: "",
  };
  const storeComments = podcastStore((state) => state.setPodcastComments);
  const comments = podcastStore((state) => state.podcastComments);

  const [{ email, name, message }, setComment] = useState(initialize);
  const handleChange = (input) => {
    setComment((prevState) => ({
      ...prevState,
      [input.target.name]: input.target.value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const res = await postComment(
        { email: email, name: name, message: message },
        id
      );

      storeComments([res.data, ...comments]);
      setComment({ name: "", email: "", message: "" });
      console.log(comments);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-10 mb-10 ">
      <div className="text-pizzes-pink text-lg">Leave a Comment</div>
      <div class="mb-3">
        <label for="success" class="block mb-2 text-sm font-medium  ">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          class="bg-gray-200 border text-black   text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-500 "
          placeholder="Your Name"
        />
        {/* <p class="mt-2 text-sm text-green-600 dark:text-green-500">
          <span class="font-medium">Well done!</span> Some success messsage.
        </p> */}
      </div>
      <div class="mb-3">
        <label for="success" class="block mb-2 text-sm font-medium  ">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          class="bg-gray-200 border text-black  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-500 "
          onChange={handleChange}
          placeholder="Your Email"
        />
        {/* <p class="mt-2 text-sm text-green-600 dark:text-green-500">
          <span class="font-medium">Well done!</span> Some success messsage.
        </p> */}
      </div>
      <div class="mb-3">
        <label for="success" class="block mb-2 text-sm font-medium  ">
          Comment
        </label>
        <textarea
          type="text"
          rows="5"
          name="message"
          value={message}
          onChange={handleChange}
          class="bg-gray-200 border text-black  text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-500 "
          placeholder="Comment"
        />
        {/* <p class="mt-2 text-sm text-green-600 dark:text-green-500">
          <span class="font-medium">Well done!</span> Some success messsage.
        </p> */}
      </div>
      <div className=" flex flex-col items-start">
        <div
          className="px-2 py-2 bg-[#9195fbdb]  text-white rounded-lg shadow-lg cursor-pointer"
          onClick={handleSubmit}
        >
          Post Comment
        </div>
      </div>
    </div>
  );
}

export default CommentsForm;
