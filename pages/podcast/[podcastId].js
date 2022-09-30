import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  AiOutlineShareAlt,
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { MusicPlayer } from "../../components/player/PodcastPlayer";
import Comments from "../../components/podcast/Comments";
import CommentsForm from "../../components/podcast/CommentsForm";
import { getPodcasts, getPodcast } from "../../apis/podcasts";
import { podcastStore } from "../../store/index";
import { useQuery } from "react-query";
function Podcast({ res }) {
  const router = useRouter();
  const { podcastId } = router.query;
  const storePodcast = podcastStore((state) => state.setPodcast);
  const storeComments = podcastStore((state) => state.setPodcastComments);
  const { data, isLoading } = useQuery(
    ["podcast", podcastId],
    () => getPodcast(podcastId),
    {
      initialData: res,
    }
  );
  const [podcast, setPodcast] = useState(data.data);
  const [comments, setComments] = useState(data.data.comments);
  useEffect(() => {
    storePodcast(podcast);
    storeComments(comments);
  }, [podcast, comments]);
  return (
    <>
      <div className="w-full bg-gradient-to-tr from-[#301934] to-[#2E4052]  text-white">
        <div className="flex flex-wrap w-full md:pt-10 pt-4 md:px-24 px-4   pb-10 items-end  shadow-sm ">
          <div className="md:w-1/5 w-full  ">
            <div className="  w-full h-64 relative   ">
              <Image
                className=" object-top object-cover rounded-lg shadow-lg"
                layout="fill"
                src={podcast?.image}
              />
            </div>
            <div className="flex pt-4 items-center">
              <div className=" pr-2">
                <AiFillPlayCircle className=" text-2xl" />
              </div>
              <div className="pr-2">
                <AiOutlineHeart className=" text-2xl" />
              </div>
              <div className="">
                <AiOutlineShareAlt className=" text-2xl" />
              </div>
            </div>
          </div>
          <div className="md:w-3/5 w-full md:pl-20 ">
            <div className=" text-lg font-semibold">Podcast</div>
            <div className=" text-2xl font-black pb-2">{podcast?.name}</div>
            <div className="">Featuring</div>
            <div className=""></div>
            <div className=" flex"></div>
            <div className="flex pb-2">
              <div className=" text-sm pr-4">17 September, 2022</div>
              <div className="text-sm pl-4">15:10</div>
            </div>
          </div>
        </div>
        <div className=" mb-20   md:px-20 pt-1 ">
          <div className=" flex flex-wrap ">
            <div className=" w-full md:w-1/2 ">
              <Comments />
            </div>
            <div className="w-full md:w-1/2 ">
              <CommentsForm id={podcastId} />
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white text-black">
          <MusicPlayer />
        </div>
      </div>
    </>
  );
}
export async function getStaticPaths() {
  const res = await getPodcasts();
  const paths = res?.data?.map((podcast) => ({
    params: { podcastId: podcast.podcastId },
  }));
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}
export async function getStaticProps({ params: { podcastId } }) {
  const res = await getPodcast(podcastId);
  delete res["config"];
  delete res["request"];
  return { props: { res } };
}
export default Podcast;
