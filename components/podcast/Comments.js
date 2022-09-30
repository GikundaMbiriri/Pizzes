import React, { useEffect } from "react";
import { RiUser3Fill } from "react-icons/ri";
import dayjs from "dayjs";
import { podcastStore } from "../../store/index";
function Comments() {
  const comments = podcastStore((state) => state.podcastComments);
  useEffect(() => {
    if (comments) {
      console.log(comments);
    }
    console.log("An article changed");
  }, [comments]);

  return (
    <div className="w-full my-4">
      <div className=" font-bold text-xl mx-5">Comments</div>

      {comments?.map((comment) => (
        <div className=" bg-gray-200 mx-5 p-4 text-black shadow-lg rounded-lg mb-4">
          <div className=" flex items-center">
            <RiUser3Fill className="text-2xl" />
            <div className="px-1  font-semibold">
              {comment.name ? comment.name : "Anonymous"}
            </div>
            <div className="text-sm">
              {dayjs(comment.createdAt).format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="">{comment.body}</div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
