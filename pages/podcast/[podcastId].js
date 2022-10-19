import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { NextSeo } from "next-seo";
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
import { getPodcasts, getPodcast, likePodcast } from "../../apis/podcasts";
import { signInWithGoogle } from "../../utils/config";
import { podcastStore, userStore } from "../../store/index";
import SharingModal from "../../components/modals/SharingModal";
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
  const [showShare, setShowShare] = useState(false);
  const [likedCount, setLikedCount] = useState();
  const [url, setUrl] = useState("");
  const [liked, setLiked] = useState();
  const authUser = userStore((state) => state.user);
  const [podcast, setPodcast] = useState(data.data);
  const [comments, setComments] = useState(data.data.comments);
  const [description, setDescription] = useState(false);
  useEffect(() => {
    storePodcast(podcast);
    storeComments(comments);
    setLikedCount(podcast?.likeCount);
    setUrl("https://pizzes.co.ke" + `/podcast/${podcast?.podcastId}`);
  }, [podcast, comments]);

  useEffect(() => {
    if (authUser.id && podcast.likes) {
      if (podcast.likes.indexOf(authUser.id) == -1) {
        setLiked(false);
      } else {
        setLiked(true);
      }
    }
  }, [authUser]);
  const likingPodcast = async () => {
    if (authUser.authenticated) {
      const userId = localStorage.getItem("user");
      console.log(userId);
      if (liked) {
        setLiked(!liked);
        setLikedCount(likedCount - 1);
      } else {
        setLiked(!liked);
        setLikedCount(likedCount + 1);
      }
      const res = await likePodcast(podcast.podcastId, { userId: userId });
    } else {
      signInWithGoogle();
    }
  };
  return (
    <>
      <NextSeo
        title={podcast?.name}
        description="This is a pizzes blog and podcast creation."
        canonical={`https://pizzes.co.ke/podcast/${podcast?.podcastId}`}
        openGraph={{
          url: `https://pizzes.co.ke/podcast/${podcast?.podcastId}`,
          title: podcast?.name,
          description: "This is a pizzes blog and podcast creation.",
          images: [
            {
              url: podcast?.image,
              width: 800,
              height: 600,
              alt: "Blog image",
              type: "image/jpeg",
            },
          ],
          site_name: "Pizzes Blog and Podcast",
        }}
        twitter={{
          handle: "@MissKanyasya",
          site: "@MissKanyasya",
          cardType: "summary_large_image",
        }}
      />
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
              <div className=" p-2">
                <AiFillPlayCircle className=" text-2xl" />
              </div>
              <div className="p-2" onClick={likingPodcast}>
                {(!liked && <AiOutlineHeart className=" text-2xl" />) || (
                  <AiFillHeart className=" text-2xl" />
                )}
              </div>
              <div className="p-2" onClick={() => setShowShare(true)}>
                <AiOutlineShareAlt className=" text-2xl" />
              </div>
            </div>
          </div>
          <div className="md:w-3/5 w-full md:pl-20 ">
            <div className=" text-lg font-semibold">Podcast</div>
            <div className=" text-xl font-black pb-2">{podcast?.name}</div>

            <div className=""></div>
            <div className=" flex"></div>
            <div className="flex pb-2">
              <div className=" text-xs pr-4">17 September, 2022</div>
              <div className="text-xs pl-4">15:10</div>
            </div>
            {podcast?.featuring?.length > 0 && (
              <div className="">
                <div className=" font-semibold text-pink-400">Featuring:</div>
                {podcast?.featuring?.map((featured) => (
                  <div className=" ">
                    <div className="">{featured.name}</div>
                    <div className=" text-xs line-clamp-1 ">
                      {featured.role}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {podcast?.description && (
              <div className=" mt-3">
                <div className="font-semibold text-pink-400">Description</div>

                <div
                  className={!description ? " line-clamp-4" : ""}
                  onClick={() => setDescription(!description)}
                >
                  {podcast.description}
                </div>
              </div>
            )}
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
      </div>
      {showShare && (
        <SharingModal
          url={url}
          title={podcast?.name}
          pic={podcast?.image}
          setShowShare={setShowShare}
        />
      )}
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
