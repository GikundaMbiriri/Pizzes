import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import home2 from "../assets/home2.jpeg";
import latest1 from "../assets/latest001.jpeg";
import latest2 from "../assets/latest002.jpeg";
import latest3 from "../assets/latest003.jpeg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineShare } from "react-icons/md";
import SharingModal from "./modals/SharingModal";
import { likeArticle } from "../apis/articles";
import { userStore } from "../store/index";
import { signInWithGoogle } from "../utils/config";
import { useRouter } from "next/router";

export const LatestArticleCard = ({
  article: { body, topic, likeCount, commentCount, image, blogId, likes },
}) => {
  const [showShare, setShowShare] = useState(false);
  const [likedCount, setLikedCount] = useState(likeCount);
  const [liked, setLiked] = useState();
  const authUser = userStore((state) => state.user);
  const router = useRouter();
  const url = "https://pizzesv2.netlify.app" + `/article/${blogId}`;

  const likingArticle = async () => {
    if (authUser.authenticated) {
      const userId = localStorage.getItem("user");
      setLiked(likes.indexOf(userId));

      const res = await likeArticle(blogId, { userId: userId });
      setLikedCount(res.data.likeCount);
      console.log(res);
    } else {
      signInWithGoogle();
    }
  };
  return (
    <>
      <div className="md:w-72 w-full h-min  px-4 py-2 my-4 shadow-xl">
        <Link href={`/article/${blogId}`}>
          <div className=" md:w-64 w-full md:h-40 h-48 relative">
            <div className="absolute top-0 w-full h-full ">
              <Image
                className="  object-cover rounded-lg  animate-[fade_ease-in-out_8s_infinite_-6s] "
                src={image[0]}
                layout="fill"
              />
            </div>
            <div className="absolute top-0 w-full h-full ">
              <Image
                className=" object-cover rounded-lg animate-[fade_ease-in-out_8s_infinite_-4s]"
                src={image[1]}
                layout="fill"
              />
            </div>
            <div className="absolute top-0 w-full h-full ">
              <Image
                className=" object-cover rounded-lg animate-[fade_ease-in-out_8s_infinite_-2s]"
                src={image[2]}
                layout="fill"
              />
            </div>
            <div className="absolute top-0 w-full h-full ">
              <Image
                className=" object-cover rounded-lg animate-[fade_ease-in-out_8s_infinite_0s]"
                src={image[3]}
                layout="fill"
              />
            </div>
          </div>
        </Link>
        <div className=" md:w-64 w-full">
          <div className=" font-bold text-2xl py-1  line-clamp-1 ">{topic}</div>
          <div
            className=" line-clamp-2 "
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div className="flex justify-between pt-2 items-center">
            <div className="flex space-x-2 items-center">
              <AiFillHeart className=" text-[#A841A3] text-2xl" />
              <div className="">{likeCount}</div>
            </div>
            <div className="flex space-x-2 items-center">
              <BiCommentDetail className=" text-[#A841A3] text-2xl" />
              <div className="">{commentCount}</div>
            </div>
            <div className="flex space-x-2 items-center">
              <MdOutlineShare
                className=" text-[#A841A3] text-2xl"
                onClick={() => setShowShare(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {showShare && (
        <SharingModal
          url={"https:jtjr.com"}
          title={topic}
          setShowShare={setShowShare}
        />
      )}
    </>
  );
};
export const ArticleCard = ({
  article: { body, topic, likeCount, commentCount, image, blogId, likes },
}) => {
  const [showShare, setShowShare] = useState(false);
  const [likedCount, setLikedCount] = useState(likeCount);
  const [liked, setLiked] = useState();
  const authUser = userStore((state) => state.user);
  const router = useRouter();
  const url = "https://pizzesv2.netlify.app" + `/article/${blogId}`;
  useEffect(() => {
    console.log(likes.indexOf(authUser.id));
    if (likes.indexOf(authUser.id) == -1) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  }, []);
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
      const res = await likeArticle(blogId, { userId: userId });
    } else {
      signInWithGoogle();
    }
  };
  return (
    <>
      <div className="md:w-72 w-full p-2 h-min  md:px-4 md:mx-0 mx-auto py-2 my-4 shadow-xl">
        {console.log(liked)}
        <Link href={`/article/${blogId}`}>
          <div className=" md:w-64 w-full md:h-40 h-48 relative">
            <Image
              className="  object-cover rounded-lg   "
              src={image[0]}
              layout="fill"
              placeholder="blur"
              blurDataURL={home2}
            />
          </div>
        </Link>
        <div className=" md:w-64 w-full">
          <div className=" font-bold text-2xl py-1  line-clamp-1 ">{topic}</div>

          <div
            className=" line-clamp-2 "
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div className="flex justify-between pt-2 items-center">
            <div className="flex space-x-2 items-center">
              <div className="" onClick={likingArticle}>
                {(liked && (
                  <AiFillHeart className=" text-[#A841A3] text-2xl" />
                )) || <AiOutlineHeart className=" text-[#A841A3] text-2xl" />}
              </div>
              <div className="">{likedCount}</div>
            </div>
            <div className="flex space-x-2 items-center">
              <BiCommentDetail className=" text-[#A841A3] text-2xl" />
              <div className="">{commentCount}</div>
            </div>
            <div className="flex space-x-2 items-center">
              <MdOutlineShare
                className=" text-[#A841A3] text-2xl"
                onClick={() => setShowShare(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {showShare && (
        <SharingModal url={url} title={topic} setShowShare={setShowShare} />
      )}
    </>
  );
};
