import React, { useState } from "react";

function ContactForm() {
  const initialize = {
    email: "",
    name: "",
    message: "",
  };

  const [{ email, name, message }, setComment] = useState(initialize);
  const handleChange = (input) => {
    setComment((prevState) => ({
      ...prevState,
      [input.target.name]: input.target.value,
    }));
  };
  const handleSubmit = async () => {
    setComment({ name: "", email: "", message: "" });
  };
  return (
    <div className="">
      <div className="text-pizzes-pink text-2xl font-semibold">
        Leave us a Message
      </div>
      <div class="mb-3">
        <label for="success" className="block mb-2 text-sm font-medium  ">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="bg-gray-200 border   text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-500 "
          placeholder="Your Name"
        />
        {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          <span className="font-medium">Well done!</span> Some success messsage.
        </p> */}
      </div>
      <div className="mb-3">
        <label for="success" className="block mb-2 text-sm font-medium  ">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          className="bg-gray-200 border   text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-500 "
          onChange={handleChange}
          placeholder="Your Email"
        />
        {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          <span className="font-medium">Well done!</span> Some success messsage.
        </p> */}
      </div>
      <div className="mb-3">
        <label for="success" className="block mb-2 text-sm font-medium  ">
          Message
        </label>
        <textarea
          type="text"
          rows="5"
          name="message"
          value={message}
          onChange={handleChange}
          className="bg-gray-200 border   text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-500 "
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
          Send Message
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
