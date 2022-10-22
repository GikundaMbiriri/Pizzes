import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import home2 from "../../assets/home2.jpeg";
import latest1 from "../../assets/latest001.jpeg";
import latest2 from "../../assets/grace.jpeg";
import latest3 from "../../assets/latest003.jpeg";
import { MusicPlayer } from "../../components/player/PodcastPlayer";
import SubscribeSection from "../../components/SubscribeSection";
import PodcastCard from "../../components/PodcastCard";
import { getPodcasts } from "../../apis/podcasts";
import { useQuery } from "react-query";
function Podcast(props) {
  const { data } = useQuery(["podcasts"], getPodcasts, {
    initialData: props.res,
  });
  const [podcasts, setPodcasts] = useState(data.data);
  console.log(podcasts);
  return (
    <>
      <Head>Pizzes Podcast</Head>
      <div className=" flex flex-col w-full  relative bg-black text-white">
        <div className=" flex flex-wrap flex-grow w-full h-full    py-5">
          <div className="md:w-2/5 w-full  ">
            <div className="  w-full h-96 relative  ">
              <Image
                className=" object-top object-cover"
                layout="fill"
                src={latest2}
              />
            </div>
          </div>

          <div className="md:w-3/5 w-full px-10">
            <div className="text-4xl text-center font-semibold  text-pizzes-pink italic">
              Pizzes Podcast
            </div>
            <div className=" text-xs text-center py-1">Hosted by</div>
            <div className="text-lg text-center">Grace Kanyasya</div>
            <div className=" ">
              Pizzes is an Inspirational and Personal development content page,
              and platform that is geared towards raising a generation with
              re-defined thinking patterns and transformed progressive mindsets.
              More than a website, Pizzes is your place of peace, closure and
              clarity. A place where truth and knowledge is dispensed, to enable
              people rise and become the very best version of themselves.
            </div>
            <SubscribeSection />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-12 gap-x-2 md:gap-y-10 gap-y-5 px-6 pt-20 mb-20 text-black ">
          {podcasts.map((podcast) => (
            <PodcastCard podcast={podcast} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Podcast;
export async function getStaticProps() {
  const res = await getPodcasts();
  delete res["config"];
  delete res["request"];
  console.log(res);
  return { props: { res } };
}
