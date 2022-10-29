import React from "react";
import latest3 from "../assets/latest003.jpeg";
import home2 from "../assets/home2.jpeg";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineShareAlt,
} from "react-icons/ai";
import dayjs from "dayjs";
import { usePlayer } from "../store/index";
function PodcastCard({ podcast }) {
  const { podcastId, image, name, description, createdAt } = podcast;
  const isPlaying = usePlayer((state) => state.isPlaying);
  const setIsPlaying = usePlayer((state) => state.setIsPlaying);
  const currentlyPlaying = usePlayer((state) => state.currentlyPlaying);
  const setCurrentlyPlaying = usePlayer((state) => state.setCurrentlyPlaying);
  return (
    <Link href={`/podcast/${podcastId}`}>
      <div
        className="w-full bg-gray-200 rounded-lg cursor-pointer shadow-lg px-2 pt-2 "
        onClick={() => {
          setCurrentlyPlaying(podcast);
          setIsPlaying(true);
        }}
      >
        <div className=" w-full h-56 relative ">
          <Image
            className="  object-cover rounded-lg   "
            src={image}
            layout="fill"
            placeholder="blur"
            blurDataURL={home2}
          />
        </div>

        <div className="flex justify-evenly px-2 pt-2">
          <div className="flex items-center">
            <AiOutlineCalendar className=" font-black" />
            <div className=" text-xs pl-2">
              {dayjs(createdAt).format("D MMMM, YYYY")}
            </div>
          </div>
          <div className="flex items-center">
            <AiOutlineClockCircle className=" font-black" />
            <div className="pl-2 text-xs">15:03</div>
          </div>
        </div>
        <div className="text-xl line-clamp-1 font-semibold  font-Newsreader p-0.5 text-center">
          {name}
        </div>

        <div className="p-1 mb-3 line-clamp-2 text-sm">{description}</div>
      </div>
    </Link>
  );
}

export default PodcastCard;
