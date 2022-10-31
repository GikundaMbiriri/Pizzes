import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useQuery } from "react-query";
import MainBanner from "../components/MainBanner";
import SubscribeSection from "../components/SubscribeSection";
import { LatestArticleCard, ArticleCard } from "../components/ArticleCards";
import Login from "../components/Login";
import Heading from "../components/Heading";
import { getArticles } from "../apis/articles";
import SharingModal from "../components/modals/SharingModal";
import home2 from "../assets/home2.jpeg";
import { MusicPlayer } from "../components/player/PodcastPlayer";
import Script from "next/script";
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
    console.log(articles);
  }, [articles]);
  return (
    <>
      <NextSeo
        title={"Pizzes Blog and Podcast"}
        description="This is a pizzes blog and podcast creation."
        canonical="https://pizzes.co.ke/"
        openGraph={{
          url: "https://pizzes.co.ke/",
          title: "Pizzes Blog and Podcast",
          description: "This is a pizzes blog and podcast creation.",
          images: [
            {
              url: "./home2.jpeg",
              width: 800,
              height: 600,
              alt: "Pizzes",
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
      <Head>
        <link rel="shortcut icon" href="/logo.svg" />
        <title>Pizzes Blog and Podcast page</title>
        <Head></Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="google-site-verification"
          content="e90k6ojD2sEVpNmVp3Y4nJZANSW7yrlcAt8X7S_2JnI"
        />
      </Head>

      <div className="flex flex-wrap  w-full h-full flex-grow overflow-y-scroll scrollbar-hide">
        <div className="md:h-full h-3/5 md:w-1/2 w-full">
          <div className="md:h-5/6 h-full w-full">
            <MainBanner />
          </div>
        </div>
        <div className=" md:h-full md:w-1/2 w-full">
          <Heading />
          <div className=" w-full pb-20 px-4 flex md:justify-evenly justify-center flex-wrap">
            <LatestArticleCard article={articles[0]} />
            {articles.slice(1).map((article) => (
              <ArticleCard article={article} />
            ))}
          </div>
        </div>
      </div>
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
