import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ArticleHead from "../../components/article/ArticleHead";
import ArticleBody from "../../components/article/ArticleBody";
import Comments from "../../components/Comments";
import CommentsForm from "../../components/CommentsForm";
import { getArticle, getArticles } from "../../apis/articles";
import { useQuery } from "react-query";
import { articleStore } from "../../store/index";
import { MusicPlayer } from "../../components/player/PodcastPlayer";
import { NextSeo } from "next-seo";
function Article({ res }) {
  const router = useRouter();
  const { blogId } = router.query;
  const storeArticle = articleStore((state) => state.setArticle);
  const storeComments = articleStore((state) => state.setComments);

  const { data, isLoading } = useQuery(
    ["article", blogId],
    () => getArticle(blogId),
    {
      initialData: res,
    }
  );
  const [article, setArticle] = useState(data.data);
  const [comments, setComments] = useState(data.data?.comments);
  useEffect(() => {
    storeArticle(article);
    storeComments(comments);
    console.log("Here:", localStorage.getItem("uId"));
  }, [article, comments]);
  return (
    <>
      <NextSeo
        title={article?.topic}
        description="This is a pizzes blog and podcast creation."
        canonical={`https://pizzes.co.ke/article/${article?.blogId}`}
        openGraph={{
          url: `https://pizzes.co.ke/article/${article?.blogId}`,
          title: article?.topic,
          description: "This is a pizzes blog and podcast creation.",
          images: [
            {
              url: article?.image[0],
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
      <div>
        <Head>
          <title>{article?.topic}</title>
        </Head>
        <div className=" w-screen">
          <ArticleHead image={article?.image[0]} topic={article?.topic} />
          <ArticleBody data={article} />
          <div className="w-full md:px-10  flex flex-wrap-reverse md:grid md:grid-cols-3 md:grid-flow-row">
            <div className=" w-full md:col-span-2">
              <Comments comments={comments} />
            </div>

            <div className=" w-full md:col-span-1 ">
              <CommentsForm id={blogId} />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
export async function getStaticPaths() {
  const res = await getArticles();
  const paths = res?.data?.map((blog) => ({ params: { blogId: blog.blogId } }));
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}
export async function getStaticProps({ params: { blogId } }) {
  const res = await getArticle(blogId);
  delete res["config"];
  delete res["request"];
  return { props: { res } };
}
export default Article;
