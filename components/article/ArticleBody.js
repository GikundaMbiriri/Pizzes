import React, { useState, useEffect } from "react";
import { articlesStore } from "../../store/index";
import SubscribeSection from "../SubscribeSection";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import SharingModal from "../modals/SharingModal";
import { userStore } from "../../store/index";
import { likeArticle } from "../../apis/articles";
import { signInWithGoogle } from "../../utils/config";
function ArticleBody({ data }) {
  const articles = articlesStore((state) => state.articles);
  console.log("Global articles ", data);
  const [showShare, setShowShare] = useState(false);
  const [likedCount, setLikedCount] = useState(data.likeCount);
  const [liked, setLiked] = useState();
  const authUser = userStore((state) => state.user);

  const url = "https://pizzesv2.netlify.app" + `/article/${data.blogId}`;
  useEffect(() => {
    if (authUser.id && data.likes) {
      if (data.likes.indexOf(authUser.id) == -1) {
        setLiked(false);
      } else {
        setLiked(true);
      }
    }
  }, [authUser]);
  const likingArticle = async () => {
    if (authUser.authenticated) {
      const userId = localStorage.getItem("user");
      if (liked) {
        setLiked(!liked);
        setLikedCount(likedCount - 1);
      } else {
        setLiked(!liked);
        setLikedCount(likedCount + 1);
      }
      const res = await likeArticle(data.blogId, { userId: userId });
    } else {
      signInWithGoogle();
    }
  };
  return (
    <>
      <div className=" w-full md:px-10 px-5 md:grid md:grid-cols-3 md:grid-flow-row">
        <div className="md:col-span-2">
          <h2 className=" text-2xl font-bold">{data.topic}</h2>
          <div className=" flex space-x-12 pt-2 items-center">
            <div className="">
              <div className="" onClick={likingArticle}>
                {(liked && (
                  <AiFillHeart className=" text-[#A841A3] text-2xl" />
                )) || <AiOutlineHeart className=" text-[#A841A3] text-2xl" />}
              </div>
              <div className="text-[#A841A3] ">Like</div>
            </div>
            <div className="">
              <div className="" onClick={() => setShowShare(true)}>
                <FiShare className="text-3xl text-[#A841A3]" />
              </div>
              <div className="text-[#A841A3]  ">share</div>
            </div>
          </div>
          <div
            className=" text-lg"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </div>
        <div className="">
          <SubscribeSection />
        </div>
      </div>
      {showShare && (
        <SharingModal
          url={url}
          title={data.topic}
          setShowShare={setShowShare}
        />
      )}
    </>
  );
}

export default ArticleBody;
