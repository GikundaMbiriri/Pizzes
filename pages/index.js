import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useQuery } from "react-query";
import MainBanner from "../components/MainBanner";
import SubscribeSection from "../components/SubscribeSection";
import { LatestArticleCard, ArticleCard } from "../components/ArticleCards";
import Login from "../components/Login";
import Heading from "../components/Heading";
import { getArticles } from "../apis/articles";
import SharingModal from "../components/modals/SharingModal";

import { MusicPlayer } from "../components/player/PodcastPlayer";

import { articlesStore } from "../store/index";
function Home(props) {
  const { data } = useQuery(["articles"], getArticles, {
    initialData: props.res,
  });
  const [articles, setArticles] = useState(data.data);
  const [windowWidth, setWindowWidth] = useState(800);
  const storeArticles = articlesStore((state) => state.setArticles);

  // useEffect(() => {
  //   console.log(user?.currentUser);
  // }, [user]);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
      console.log(windowWidth);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  useEffect(() => {
    storeArticles(articles);
  }, [articles]);
  return (
    <>
      <Head>
        <title>Pizzes Blog and Podcast page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex flex-wrap  w-full h-full flex-grow overflow-y-scroll scrollbar-hide">
        <div className="md:h-full h-3/5 md:w-1/2 w-full">
          <div className="md:h-5/6 h-full w-full">
            <MainBanner />
          </div>
          {windowWidth > 600 && <SubscribeSection />}
        </div>
        <div className=" md:h-full md:w-1/2 w-full">
          <Heading />
          <div className=" w-full  px-4 flex md:justify-between justify-center flex-wrap">
            <LatestArticleCard article={articles[0]} />
            {articles.slice(1).map((article) => (
              <ArticleCard article={article} />
            ))}
          </div>
          {windowWidth <= 600 && <SubscribeSection />}
        </div>
      </div>
      <div className=" absolute bottom-0 right-0">
        <button className=" font-Abel bg-gradient-to-l from-[#ff92cabf] to-[#9195fbdb] text-white hover:translate-y-0.5 px-5 py-2 rounded-xl transition ease-in-out delay-150">
          Subscribe
        </button>
      </div>
      <MusicPlayer />
    </>
  );
}

export default Home;
export async function getStaticProps() {
  const res = await getArticles();
  delete res["config"];
  delete res["request"];
  console.log(res);
  return { props: { res } };
}
